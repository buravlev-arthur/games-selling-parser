import { GetRequestBody } from '@/types/parsers/ggsel';

export const shopName = 'ggsel';
const base: string = 'https://a.ggsel.com';
const url: string = '/elastic/goods/search?with_filters=1&with_categories=1';

export const getRequestBody: GetRequestBody = (name, categoryId, platformId, totalCount) => ({
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
                content_type_id: [categoryId],
              },
            },
          ],
        },
      },
      track_total_hits: true,
    },
    size: totalCount,
  },
});

export const apiUrl: URL = new URL(url, base);

export const platforms: Record<string, number> = {
  xbox: 16,
  playstation: 15,
  steam: 12,
};

export const categories: Record<string, number> = {
  xbox: 2,
  steam: 2,
  playstation: 33,
};
