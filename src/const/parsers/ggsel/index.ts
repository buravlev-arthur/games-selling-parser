import { Platforms, GetRequestBody } from '@/types/parsers/ggsel';

const base: string = 'https://a.ggsel.com';
const url: string = '/elastic/goods/search?with_filters=1&with_categories=1';

export const getRequestBody: GetRequestBody = (name, platformId, totalCount) => ({
  params: {
    body: {
      query: {
        bool: {
          must: [
            {
              query_string: {
                query: name,
              },
            },
            {
              match: {
                parent_category_ids: platformId,
              },
            },
            {
              match: {
                is_active: 1,
              },
            },
            {
              terms: {
                content_type_id: [2],
              },
            },
          ],
        },
      },
    },
    size: totalCount,
  },
});

export const apiUrl: URL = new URL(url, base);

export const platforms: Platforms = {
  xbox: 16,
};
