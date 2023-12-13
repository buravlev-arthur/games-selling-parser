import userAgents from '@/const/userAgents';
import axios from 'axios';
import type {
  CreateAxiosInstance,
  Platforms,
  Games,
  Editions,
  Shops,
  PricesData,
  GameDataInsertInstances,
  DatabaseData,
} from '@/types';
import zlib from 'zlib';
import { JSDOM } from 'jsdom';
export { default as sendMail } from './sendmail';

export const getRandomUserAgent: () => string = () => {
  const totalCount = userAgents.length;
  return userAgents[Math.round(Math.random() * (totalCount - 1))];
};

export const createAxiosInstance: CreateAxiosInstance = (baseUrl, responseType) =>
  axios.create({
    baseURL: baseUrl,
    decompress: false,
    responseType: 'arraybuffer',
    headers: {
      'User-Agent': getRandomUserAgent(),
      'Content-Type': responseType,
      'Accept-Encoding': 'gzip',
    },
  });

export function parseBuffer<T = unknown>(data: Buffer, format: 'json' | 'text' | 'html'): Promise<T> {
  return new Promise((resolve) => {
    zlib.gunzip(data, (_error, output) => {
      const text = output ? output.toString() : data.toString();
      switch (format) {
        case 'text':
          resolve(text as T);
          break;
        case 'json':
          resolve(JSON.parse(text) as T);
          break;
        case 'html':
          resolve(new JSDOM(text).window.document as T);
          break;
        default:
          throw Error('Incorrect "format" parameter in parseBuffer util function');
      }
    });
  });
}

export const isIncludesSubstring = (str: string, substr: string): boolean => {
  return !!substr.length && str.toLowerCase().includes(substr.toLowerCase());
};

export const getGameIdByName = (gameName: string, gamesList: Games): number => {
  const game = gamesList.find(
    ({ name, alias, alias_2, alias_3 }) =>
      isIncludesSubstring(gameName, name) ||
      isIncludesSubstring(gameName, alias) ||
      isIncludesSubstring(gameName, alias_2) ||
      isIncludesSubstring(gameName, alias_3),
  );
  return game?.id ?? -1;
};

export const getEditionIdByName = (gameNames: Array<string>, editionsList: Editions): number => {
  let editionId = 1;
  gameNames.forEach((gameName) => {
    const edition = editionsList.find(
      ({ name, name_rus }) =>
        gameName.toLowerCase().includes(name.toLowerCase()) || gameName.toLowerCase().includes(name_rus.toLowerCase()),
    );
    if (edition) {
      editionId = edition.id;
    }
  });
  return editionId;
};

export const getItemIdByName = (itemName: string, itemsList: Platforms | Shops): number => {
  const platform = itemsList.find(({ name }) => itemName.toLowerCase().includes(name.toLowerCase()));
  return platform?.id ?? -1;
};

export const getPricesData = (prices: Array<number>): PricesData => ({
  min: Math.round(Math.min(...prices)),
  avg: Math.round(prices.reduce((acc, price) => (acc += price), 0) / prices.length),
  max: Math.round(Math.max(...prices)),
});

export const getNameById = (searchId: number, items: Platforms | Shops | Editions | Games): string => {
  return items.find(({ id }) => id === searchId)?.name ?? '';
};

export const parseRowsToString = (rows: GameDataInsertInstances, databaseData: DatabaseData): string => {
  const statisticLines = rows.reduce((str, { name, edition, shop, platform, offers_count }) => {
    const gameName = getNameById(name, databaseData.games);
    const editionName = getNameById(edition, databaseData.editions);
    const shopName = getNameById(shop, databaseData.shops);
    const platformName = getNameById(platform, databaseData.platforms);
    const newLine = `shop: "${shopName}", game: "${gameName}", edition: "${editionName}", platform: "${platformName}", offers count: ${offers_count}\n`;
    return str + newLine;
  }, '');
  const total = rows.reduce((count, { offers_count }) => count + offers_count, 0);
  return `${statisticLines}total: ${total}`;
};
