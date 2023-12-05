import type { AxiosInstance } from 'axios';

export enum PlatformName {
  xbox = 'xbox',
  steam = 'steam',
  sonyPlaystation = 'sonyPlaystation',
  gog = 'gog',
  uplay = 'uplay',
  nintendo = 'nintendo',
  epicGames = 'epicGames',
}

export type GetGamesList<T> = (name: string, platform: PlatformName, totalCount?: number) => Promise<T | Error>;

export type ResponseType = 'application/json' | 'text/html' | 'text/plain';

export type CreateAxiosInstance = (baseUrl: URL['origin'], responseType: ResponseType) => AxiosInstance;
