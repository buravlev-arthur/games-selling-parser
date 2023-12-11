import { describe, it, expect } from 'bun:test';
import { createDatabaseConnection, getAllDatabaseData, getEditions } from '@/database';

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
});
