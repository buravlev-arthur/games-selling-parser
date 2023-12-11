import { GetRequestBody } from '@/types/parsers/ggsel';

const base: string = 'https://a.ggsel.com';
const url: string = '/elastic/goods/search?with_filters=1&with_categories=1';

export const getRequestBody: GetRequestBody = (name, categoryId, totalCount) => ({
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
                parent_category_ids: categoryId,
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
      track_total_hits: true,
    },
    size: totalCount,
  },
});

export const apiUrl: URL = new URL(url, base);

export const platforms: Record<string, number> = {
  xbox: 16,
  origin: 13,
  steam: 12,
  uplay: 11,
};
