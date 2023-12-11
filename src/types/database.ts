export interface Platform {
  id: number;
  name: string;
  manufactorer: string;
}

export interface Publisher {
  id: number;
  name: string;
}

export interface Shop {
  id: number;
  name: string;
  url: string;
}

export interface Edition {
  id: number;
  name: string;
  name_rus: string;
}

export interface Game {
  id: number;
  name: string;
  alias: string;
  alias_2: string;
  alias_3: string;
  publisher: number;
  release_date: Date;
}

export interface GameDataInsertInstance {
  name: number;
  edition: number;
  platform: number;
  shop: number;
  price_min: number;
  price_avg: number;
  price_max: number;
  offers_count: number;
  parsed_date: Date;
}

export interface GameData extends GameDataInsertInstance {
  id: number;
}

export type Platforms = Array<Platform>;
export type Publishers = Array<Publisher>;
export type Shops = Array<Shop>;
export type Editions = Array<Edition>;
export type Games = Array<Game>;
export type GamesData = Array<GameData>;
export type GameDataInsertInstances = Array<GameDataInsertInstance>;
