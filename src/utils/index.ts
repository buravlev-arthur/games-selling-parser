import userAgents from '@/const/userAgents';
import axios from 'axios';
import type { CreateAxiosInstance } from '@/types';
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
