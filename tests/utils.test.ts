import { describe, it, expect } from 'vitest';
import userAgents from '@/const/userAgents';
import { binaryResponse } from './__fixtures__';
import { getRandomUserAgent, createAxiosInstance, parseBuffer } from '@/utils';

describe('Test utils', () => {
  it('getRandomUserAgent', () => {
    const value = getRandomUserAgent();
    expect(userAgents.includes(value)).toBeTruthy();
  });

  it('createAxiosInstance', () => {
    const baseUrl = 'https://test.test';
    const contentType = 'text/html';
    const axios = createAxiosInstance(baseUrl, contentType);
    expect(axios.defaults.baseURL).toEqual(baseUrl);
    expect(axios.defaults.responseType).toEqual('arraybuffer');
    expect(axios.defaults.decompress).toEqual(false);
    expect(userAgents.includes(axios.defaults.headers['User-Agent'] as string)).toBeTruthy();
    expect(axios.defaults.headers['Content-Type']).toEqual(contentType);
    expect(axios.defaults.headers['Accept-Encoding']).toEqual('gzip');
  });

  it('parseBuffer', async () => {
    const { withComporessing, withoutCompressing } = binaryResponse;
    expect(await parseBuffer(withoutCompressing.response, 'json')).toEqual(withoutCompressing.json);
    expect(await parseBuffer(withoutCompressing.response, 'text')).toEqual(withoutCompressing.text);
    expect(await parseBuffer(withComporessing.response, 'json')).toEqual(withComporessing.json);
    expect(await parseBuffer(withComporessing.response, 'text')).toEqual(withComporessing.text);
  });
});
