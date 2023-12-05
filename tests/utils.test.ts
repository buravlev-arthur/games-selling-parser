import { describe, it, expect } from 'bun:test';
import userAgents from '@/const/userAgents';
import { binaryResponse } from './__fixtures__';
import { getRandomUserAgent, createAxiosInstance, parseBuffer } from '@/utils';

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
    const { withComporessing, withoutCompressing } = binaryResponse;
    expect<object>(await parseBuffer(withoutCompressing.response, 'json')).toEqual(withoutCompressing.json);
    expect<string>(await parseBuffer(withoutCompressing.response, 'text')).toEqual(withoutCompressing.text);
    expect<object>(await parseBuffer(withComporessing.response, 'json')).toEqual(withComporessing.json);
    expect<string>(await parseBuffer(withComporessing.response, 'text')).toEqual(withComporessing.text);
  });
});
