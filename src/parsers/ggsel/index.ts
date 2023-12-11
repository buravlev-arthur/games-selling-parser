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
import { apiUrl, getRequestBody, platforms } from '@/const/parsers/ggsel';
import { RequestDefaultCount } from '@/const';

const axios = createAxiosInstance(apiUrl.origin, 'application/json');

const getRawOffersList: GetGamesList<GamesList> = async (name, platform, totalCount = RequestDefaultCount) => {
  const categoryId = platforms[platform] ?? 0;
  const path = `${apiUrl.pathname}${apiUrl.search}`;
  const body = getRequestBody(name, categoryId, totalCount);
  const { data } = await axios.post<Buffer>(path, body);
  const responseBody = await parseBuffer<ResponseBody>(data, 'json');
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
  platformName: string,
  shopName: string,
): Promise<GameDataInsertInstances> => {
  const db = createDatabaseConnection();
  const { games, platforms: dbPlatforms, shops } = await getAllDatabaseData(db);
  db.destroy();

  const groupedGamesData = await getOffersListGroupedByEdition(rawList);
  return Object.entries(groupedGamesData)
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
};

export const init = async (games: Array<string>, platformName: string, shopName: string, offersCount: number) => {
  const data = await Promise.all(
    games.map(async (game) => {
      const rawOffersList = await getRawOffersList(game, platformName, offersCount);
      const summaryGameData = await getSummaryGameData(rawOffersList, platformName, shopName);
      return summaryGameData;
    }),
  );
  return data.flat();
};

(async () => {
  const result1 = await init(['Diablo 4', 'GTA 5'], 'xbox', 'ggsel', 10);
  const result2 = await init(['GTA 5', 'Diablo 4'], 'steam', 'ggsel', 10);
  console.log([result1, ...result2]);
})();
