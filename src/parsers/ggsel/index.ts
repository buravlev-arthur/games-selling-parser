import { createAxiosInstance } from '@/utils';
import type { GetGamesList } from '@/types';
import { PlatformName } from '@/types';
import { apiUrl, getRequestBody, platforms } from '@/const/parsers/ggsel';
import { RequestDefaultCount } from '@/const';

const axios = createAxiosInstance(apiUrl.origin, 'application/json');
const path = `${apiUrl.pathname}${apiUrl.search}`;

export const getGamesList: GetGamesList = async (name, platform, totalCount = RequestDefaultCount) => {
  const body = getRequestBody(name, platforms[platform] as number, totalCount);
  const { data } = await axios.post(path, body);
  return data;
};

const init = async () => {
  const list = await getGamesList('Diablo IV', PlatformName.xbox, 10);
  console.log(list);
};

init();
