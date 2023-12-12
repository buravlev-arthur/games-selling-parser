import { describe, it, expect } from 'bun:test';
import { createDatabaseConnection, getAllDatabaseData, getEditions, addDataToDatabase } from '@/database';
import { databaseRows } from './__fixtures__';

describe('Test database', () => {
  it('createDatabaseConnection', async () => {
    const db = createDatabaseConnection();
    const rawResultData = await db.raw('SELECT 1+1 as result');
    await db.destroy();
    expect(rawResultData[0][0].result).toEqual(2);
  });

  it('getDatabaseData', async () => {
    const db = createDatabaseConnection();
    const dbData = await getAllDatabaseData(db);
    await db.destroy();
    expect(dbData.games.length).not.toEqual(0);
    expect(dbData.shops.findIndex(({ name }) => name === 'ggsel')).not.toEqual(-1);
    expect(dbData.platforms).toBeArray();
  });

  it('getEditions', async () => {
    const db = createDatabaseConnection();
    const editions = await getEditions(db);
    await db.destroy();
    expect<number>(editions.findIndex(({ name }) => name === 'Standard')).not.toEqual(-1);
  });

  it('addDataToDatabase', async () => {
    const queryData = databaseRows.slice(0, 1);
    const db = createDatabaseConnection();
    const newRowId = await addDataToDatabase(db, queryData);
    await db('games_data').where('id', newRowId[0]).del();
    await db.destroy();
    expect(newRowId).toBeArray();
    expect(newRowId.length).toEqual(1);
    expect(newRowId[0]).toBeDefined();
    expect(newRowId[0]).toBeInteger();
  });
});
