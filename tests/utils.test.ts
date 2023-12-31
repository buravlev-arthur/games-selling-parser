import { describe, it, expect } from 'bun:test';
import userAgents from '@/const/userAgents';
import { binaryResponse, databaseRows, parsedStrFromRows } from './__fixtures__';
import {
  getRandomUserAgent,
  createAxiosInstance,
  parseBuffer,
  getGameIdByName,
  getEditionIdByName,
  getItemIdByName,
  getPricesData,
  isIncludesSubstring,
  getNameById,
  parseRowsToString,
} from '@/utils';
import sendMail from '@/utils/sendmail';
import { createDatabaseConnection, getAllDatabaseData, getEditions } from '@/database';

describe('Test utils', () => {
  it('getRandomUserAgent', () => {
    const value = getRandomUserAgent();
    expect<boolean>(userAgents.includes(value)).toBeTruthy();
  });

  it('createAxiosInstance', () => {
    const baseUrl = 'https://test.test';
    const contentType = 'text/html';
    const axios = createAxiosInstance(baseUrl, contentType);
    expect<string>(axios.defaults.baseURL).toEqual(baseUrl);
    expect<string>(axios.defaults.responseType).toEqual('arraybuffer');
    expect<boolean>(axios.defaults.decompress).toEqual(false);
    expect<boolean>(userAgents.includes(axios.defaults.headers['User-Agent'] as string)).toBeTruthy();
    expect<string>(axios.defaults.headers['Content-Type'] as string).toEqual(contentType);
    expect<string>(axios.defaults.headers['Accept-Encoding'] as string).toEqual('gzip');
  });

  it('parseBuffer', async () => {
    const { withComporessing, withoutCompressing, htmlContent } = binaryResponse;
    const document = await parseBuffer<Document>(htmlContent.response, 'html');
    expect<object>(await parseBuffer(withoutCompressing.response, 'json')).toEqual(withoutCompressing.json);
    expect<string>(await parseBuffer(withoutCompressing.response, 'text')).toEqual(withoutCompressing.text);
    expect<object>(await parseBuffer(withComporessing.response, 'json')).toEqual(withComporessing.json);
    expect<string>(await parseBuffer(withComporessing.response, 'text')).toEqual(withComporessing.text);
    expect<string>(document.querySelector('h1')?.textContent as string).toEqual(htmlContent.headerText);
    expect<string>(document.querySelector('p')?.textContent as string).toEqual(htmlContent.paragraphText);
  });

  it('getGameIdByName', async () => {
    const db = createDatabaseConnection();
    const games = await db('games').orderBy('id');
    await db.destroy();
    const { id } = games.find(({ name }) => name === 'Diablo 4');
    expect<number>(getGameIdByName('DiABlo IV', games)).toEqual(id);
  });

  it('isIncludesSubstring', () => {
    const str = 'Grand Theft Auto V Premium Edit. XBOX ONE GTA V ключ 🔑';
    const substr = 'Grand Theft Auto V';
    const wrongSubstr = 'Grand Theft Auto 5';
    expect(isIncludesSubstring(str, substr)).toBeTrue();
    expect(isIncludesSubstring(str, wrongSubstr)).toBeFalse();
  });

  it('getEditionIdByName', async () => {
    const db = createDatabaseConnection();
    const editions = await db('editions').orderBy('id');
    await db.destroy();
    const { id: idTestOne } = editions.find(({ name }) => name === 'Standard');
    const { id: idTestTwo } = editions.find(({ name }) => name === 'Premium');
    const namesTestOne = ['😈Diablo IV - Standard XBOX ONE SERIES X|S КЛЮЧ 🔑', 'Diablo 4 Standard Edition ключи Xbox'];
    const namesTestTwo = ['Grand Theft Auto 5 ключи Xbox', 'Grand Theft Auto V Premium Edit. XBOX ONE GTA V ключ 🔑'];
    expect<number>(getEditionIdByName(namesTestOne, editions)).toEqual(idTestOne);
    expect<number>(getEditionIdByName(namesTestTwo, editions)).toEqual(idTestTwo);
  });

  it('getPlatformIdByName', async () => {
    const db = createDatabaseConnection();
    const platforms = await db('platforms').orderBy('id');
    await db.destroy();
    const { id } = platforms.find(({ name }) => name === 'Steam');
    expect<number>(getItemIdByName('STEAM', platforms)).toEqual(id);
  });

  it('getShopIdByName', async () => {
    const db = createDatabaseConnection();
    const shops = await db('shops').orderBy('id');
    await db.destroy();
    const { id } = shops.find(({ name }) => name === 'ggsel');
    expect<number>(getItemIdByName('GGSEL.com', shops)).toEqual(id);
  });

  it('getPricesData', () => {
    const arr = [10, -6, 12, 124.54, 0.34, -84, -116.1, 34];
    const { min, avg, max } = getPricesData(arr);
    expect<number>(min).toEqual(-116);
    expect<number>(avg).toEqual(-3);
    expect<number>(max).toEqual(125);
  });

  it('getNameById', async () => {
    const db = createDatabaseConnection();
    const editions = await getEditions(db);
    await db.destroy();
    const searchId = 1;
    const expectedName = editions.find(({ id }) => id === searchId)?.name ?? '';
    expect(getNameById(1, editions)).toEqual(expectedName);
  });

  it('parseRowsToString', async () => {
    const db = createDatabaseConnection();
    const databaseData = await getAllDatabaseData(db);
    await db.destroy();
    const rows = databaseRows.slice(0, 2);
    expect(parseRowsToString(rows, databaseData)).toEqual(parsedStrFromRows);
  });

  it('sendMail', async () => {
    const { ok } = await sendMail('Test function');
    expect(ok).toBeTrue();
  });
});
