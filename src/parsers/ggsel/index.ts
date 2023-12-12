import { groupBy } from 'lodash';
import { createDatabaseConnection, getAllDatabaseData, getEditions } from '@/database';
import {
  createAxiosInstance,
  parseBuffer,
  getGameIdByName,
  getEditionIdByName,
  getPlatformIdByName,
  getShopIdByName,
  getPricesData,
} from '@/utils';
import type { GetGamesList, GameDataInsertInstances } from '@/types';
import type { ResponseBody, GamesList, GamesListGroupedByEdition } from '@/types/parsers/ggsel';
import { apiUrl, getRequestBody, platforms, categories, shopName } from '@/const/parsers/ggsel';
import { parserSettings } from '@/const';

const axios = createAxiosInstance(apiUrl.origin, 'application/json');

const getRawOffersList: GetGamesList<GamesList> = async (
  name,
  platform,
  totalCount = parserSettings.count,
  verbose,
) => {
  const platformId = platforms[platform] ?? 0;
  const categoryId = categories[platform] ?? 0;
  const path = `${apiUrl.pathname}${apiUrl.search}`;
  const body = getRequestBody(name, categoryId, platformId, totalCount);
  if (verbose) console.log(`✈ Try to get raw data for game: "${name}", platform: ${platform}`);
  const { data } = await axios.post<Buffer>(path, body);
  const responseBody = await parseBuffer<ResponseBody>(data, 'json');
  if (verbose)
    console.log(`✓ Raw data of game: "${name}", platform: "${platform}" was got and processed successfully!`);
  return responseBody.hits.hits;
};

const getOffersListGroupedByEdition = async (rawList: GamesList): Promise<GamesListGroupedByEdition> => {
  const db = createDatabaseConnection();
  const editions = await getEditions(db);
  db.destroy();

  const rawListWithEditionId = rawList.map(({ _source }) => ({
    ..._source,
    editionId: getEditionIdByName([_source.name, _source.name_section], editions),
  }));
  return groupBy(rawListWithEditionId, 'editionId');
};

const getSummaryGameData = async (
  rawList: GamesList,
  gameName: string,
  platformName: string,
  shopName: string,
  verbose: boolean,
): Promise<GameDataInsertInstances> => {
  if (verbose)
    console.log(`➤ Try to prepare raw data of game: "${gameName}", platform: "${platformName}" for a database`);
  const db = createDatabaseConnection();
  const { games, platforms: dbPlatforms, shops } = await getAllDatabaseData(db);
  db.destroy();

  const groupedGamesData = await getOffersListGroupedByEdition(rawList);
  const summaryResult = Object.entries(groupedGamesData)
    .reduce((acc: GameDataInsertInstances, [editionId, editionGames]) => {
      const prices = editionGames.map(({ price_wmr }) => price_wmr);
      const { min, max, avg } = getPricesData(prices);
      const rawGameName = editionGames[0].name;
      const editionData = {
        name: getGameIdByName(rawGameName, games),
        edition: Number(editionId),
        platform: getPlatformIdByName(platformName, dbPlatforms),
        shop: getShopIdByName(shopName, shops),
        price_min: min,
        price_max: max,
        price_avg: avg,
        offers_count: editionGames.length,
        parsed_date: new Date(),
      };

      return [...acc, editionData];
    }, [])
    .filter(({ name }) => name !== -1);
  if (verbose) console.log(`✓ Data of game: "${gameName}", platform: "${platformName}" was prepared successfully!`);
  return summaryResult;
};

export default async (
  games: Array<string>,
  platforms: Array<string>,
  count: number,
  verbose: boolean,
): Promise<GameDataInsertInstances> => {
  if (verbose) console.info(`➤ Starting parse "${shopName}" shop...`);
  const gamesStats = await Promise.all(
    games.map(async (game) => {
      const platformsStats: Array<GameDataInsertInstances> = await Promise.all(
        platforms.map(async (platform) => {
          const rawOffersList = await getRawOffersList(game, platform, count, verbose);
          const summaryGameData = await getSummaryGameData(rawOffersList, game, platform, shopName, verbose);
          return summaryGameData;
        }),
      );
      return platformsStats.flat();
    }),
  );
  if (verbose) console.info(`✔ "${shopName}" was parsed successfully!`);
  return gamesStats.flat();
};
