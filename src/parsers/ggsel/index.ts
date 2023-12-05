import { createAxiosInstance, parseBuffer } from '@/utils';
import type { GetGamesList } from '@/types';
import { PlatformName } from '@/types';
import type { ResponseBody, GamesList } from '@/types/parsers/ggsel';
import { apiUrl, getRequestBody, platforms } from '@/const/parsers/ggsel';
import { RequestDefaultCount } from '@/const';

const axios = createAxiosInstance(apiUrl.origin, 'application/json');
const path = `${apiUrl.pathname}${apiUrl.search}`;

export const getGamesList: GetGamesList<GamesList> = async (name, platform, totalCount = RequestDefaultCount) => {
  const body = getRequestBody(name, platforms[platform] as number, totalCount);
  const { data } = await axios.post<Buffer>(path, body);
  const responseBody = await parseBuffer<ResponseBody>(data, 'json');
  return (responseBody as ResponseBody).hits.hits;
};

const init = async () => {
  const list = await getGamesList('Diablo IV', PlatformName.xbox, 1);
  console.log(list);
};

init();
