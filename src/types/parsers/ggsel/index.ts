import type { PlatformName } from '@/types';

export type Platforms = {
  [key in PlatformName]?: number;
};

interface Must {
  query_string?: {
    query: string;
  };
  match?: {
    parent_category_ids?: number;
    is_active?: number;
  };
  terms?: {
    content_type_id: Array<number>;
  };
}

export interface RequestBody {
  params: {
    body: {
      query: {
        bool: {
          must: Array<Must>;
        };
      };
    };
    size: number;
  };
}

export type GetRequestBody = (name: string, platformId: number, totalCount: number) => RequestBody;
