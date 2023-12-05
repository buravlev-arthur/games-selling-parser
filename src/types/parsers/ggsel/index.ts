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

export interface ResponseBody {
  hits: {
    hits: Array<{
      _source: {
        id_goods: number;
        id_seller: number;
        name: string;
        seller_name: string;
        name_section: string;
        name_en: string;
        price_wmr: number;
        rating: number;
      };
    }>;
  };
}

export type GamesList = ResponseBody['hits']['hits'];

export type GetRequestBody = (name: string, platformId: number, totalCount: number) => RequestBody;
