import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { GET_NPS_QUERY } from 'data/nps/queries';
import type { Site } from 'types/site';
import type { TimeRange } from 'lib/dates';
import type { Nps, NpsResponseSortBy } from 'types/nps';

interface Props {
  page: number;
  size?: number;
  query?: string;
  sort?: NpsResponseSortBy;
  range: TimeRange;
}

interface UseNps {
  loading: boolean;
  error: boolean;
  nps: Nps;
}

export const useNps = ({ page, size, sort, range }: Props): UseNps => {
  const router = useRouter();

  const { data, loading, error, previousData } = useQuery<{ site: Site }>(GET_NPS_QUERY, {
    variables: { 
      siteId: router.query.site_id as string, 
      page, 
      size,
      sort,
      ...range,
    }
  });

  if (error) {
    console.error(error);
  }

  const fallback: Nps = {
    responses: {
      items: [], 
      pagination: { 
        pageSize: 0, 
        total: 0, 
        sort: 'timestamp__desc' 
      } 
    },
    groups: {
      promoters: 0,
      passives: 0,
      detractors: 0,
    },
    stats: {
      displays: 0,
      ratings: 0,
    },
    ratings: [],
    replies: {
      trend: 0,
      responses: [],
    },
  };

  return {
    loading,
    error: !!error,
    nps: data
      ? data.site.nps
      : previousData ? previousData.site.nps : fallback
  };
};
