import knex from 'knex';
import type { Knex } from 'knex';
import type { Platform, Publisher, Shop, Edition, Game, GameData, DatabaseData, Editions } from '@/types';

export const createDatabaseConnection = (): Knex =>
  knex({
    client: 'mysql2',
    connection: {
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },
  });

export const getAllDatabaseData = async (db: Knex): Promise<DatabaseData> => {
  const platforms = await db<Platform>('platforms').orderBy('id');
  const publishers = await db<Publisher>('publishers').orderBy('id');
  const shops = await db<Shop>('shops').orderBy('id');
  const editions = await db<Edition>('editions').orderBy('id');
  const games = await db<Game>('games').orderBy('id');
  const gamesData = await db<GameData>('games_data').orderBy('id');
  return { platforms, publishers, shops, editions, games, gamesData };
};

export const getEditions = async (db: Knex): Promise<Editions> => {
  const editions = await db<Edition>('editions').orderBy('id');
  return editions;
};
