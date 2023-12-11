import userAgents from '@/const/userAgents';
import axios from 'axios';
import type { CreateAxiosInstance, Platforms, Games, Editions, Shops, PricesData } from '@/types';
import zlib from 'zlib';
import { JSDOM } from 'jsdom';

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

export const getGameIdByName = (gameName: string, gamesList: Games): number => {
  const game = gamesList.find(
    ({ name, alias, alias_2, alias_3 }) =>
      gameName.toLowerCase().includes(name.toLowerCase()) ||
      (alias.length && gameName.toLowerCase().includes(alias.toLowerCase())) ||
      (alias_2.length && gameName.toLowerCase().includes(alias_2.toLowerCase())) ||
      (alias_3.length && gameName.toLowerCase().includes(alias_3.toLowerCase())),
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

export const getPlatformIdByName = (platformName: string, platformsList: Platforms): number => {
  const platform = platformsList.find(({ name }) => platformName.toLowerCase().includes(name.toLowerCase()));
  return platform?.id ?? -1;
};

export const getShopIdByName = (shopName: string, shopsList: Shops): number => {
  const shop = shopsList.find(({ name }) => shopName.toLowerCase().includes(name.toLowerCase()));
  return shop?.id ?? -1;
};

export const getPricesData = (prices: Array<number>): PricesData => ({
  min: Math.round(Math.min(...prices)),
  avg: Math.round(prices.reduce((acc, price) => (acc += price), 0) / prices.length),
  max: Math.round(Math.max(...prices)),
});
