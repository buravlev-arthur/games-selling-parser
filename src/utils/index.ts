import userAgents from '@/const/userAgents';
import axios from 'axios';
import type { CreateAxiosInstance } from '@/types';
import zlib from 'zlib';

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

export function parseBuffer<T = unknown>(data: ArrayBuffer, format: 'json' | 'text'): Promise<T | Error> {
  return new Promise((resolve, reject) => {
    zlib.gunzip(data, (error, output) => {
      if (error) reject(error);
      const result = format === 'json' ? JSON.parse(String(output)) : String(output);
      resolve(result);
    });
  });
}
