import type { AxiosInstance } from 'axios';
import {
  Platform,
  Platforms,
  Publisher,
  Publishers,
  Shop,
  Shops,
  Edition,
  Editions,
  Game,
  Games,
  GameData,
  GameDataInsertInstance,
  GameDataInsertInstances,
} from './database';
export {
  Platform,
  Platforms,
  Publisher,
  Publishers,
  Shop,
  Shops,
  Edition,
  Editions,
  Game,
  Games,
  GameData,
  GameDataInsertInstance,
  GameDataInsertInstances,
};

export type GetGamesList<T> = (name: string, platform: string, totalCount: number, verbose: boolean) => Promise<T>;

export type ResponseType = 'application/json' | 'text/html' | 'text/plain';

export type CreateAxiosInstance = (baseUrl: URL['origin'], responseType: ResponseType) => AxiosInstance;

export interface DatabaseData {
  platforms: Platforms;
  publishers: Publishers;
  shops: Shops;
  editions: Editions;
  games: Games;
}

export interface PricesData {
  min: number;
  avg: number;
  max: number;
}

export interface ParserSettings {
  games: Array<string>;
  platforms: Array<string>;
  count: number;
}

export type ParserFunction = (
  games: ParserSettings['games'],
  platforms: ParserSettings['platforms'],
  count: ParserSettings['count'],
  verbose: boolean,
) => Promise<GameDataInsertInstances>;
