import userAgents from '@/const/userAgents';
import axios from 'axios';
import type { CreateAxiosInstance } from '@/types';
import zlib from 'zlib';
import type {} from 'zlib';

export const getRandomUserAgent: () => string = () => {
  const totalCount = userAgents.length;
  return userAgents[Math.round(Math.random() * (totalCount - 1))];
};

export const createAxiosInstance: CreateAxiosInstance = (baseUrl, responseType) =>
  axios.create({
    baseURL: baseUrl,
    decompress: false,
    responseType: 'stream',
    transformResponse: async (data): Promise<object | Error> =>
      new Promise((resolve, reject) => {
        const gunzip = zlib.createGunzip();
        const buffer: string[] = [];
        data.pipe(gunzip);
        gunzip
          .on('data', (data) => {
            buffer.push(data.toString());
          })
          .on('end', () => {
            resolve(JSON.parse(buffer.join('')));
          })
          .on('error', (err) => {
            reject(err);
          });
      }),
    headers: {
      'User-Agent': getRandomUserAgent(),
      'Content-Type': responseType,
      'Accept-Encoding': 'gzip',
    },
  });
