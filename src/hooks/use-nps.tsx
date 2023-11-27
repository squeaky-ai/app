import { useQuery } from '@apollo/client';
import { GET_NPS_QUERY } from 'data/nps/queries';
import { FeedbackNpsResponseSort } from 'types/graphql';
import type { TimeRange } from 'types/common';
import type { FeedbackNpsResponseFilters, Site, Nps } from 'types/graphql';
import { useSiteId } from 'hooks/use-site-id';

interface Props {
  page: number;
  size?: number;
  query?: string;
  sort?: FeedbackNpsResponseSort;
  filters: FeedbackNpsResponseFilters;
  range: TimeRange;
}

interface UseNps {
  loading: boolean;
  error: boolean;
  nps: Nps;
}

export const useNps = ({ page, size, sort, filters, range }: Props): UseNps => {
  const siteId = useSiteId();

  const { data, loading, error } = useQuery<{ site: Site }>(GET_NPS_QUERY, {
    variables: { 
      siteId,
      page, 
      size,
      sort,
      filters,
      ...range,
    },
    skip: !siteId,
  });

  const fallback: Nps = {
    responses: {
      items: [], 
      pagination: { 
        pageSize: 0, 
        total: 0, 
        sort: FeedbackNpsResponseSort.TimestampDesc, 
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
    scores: {
      trend: 0,
      score: 0,
      responses: [],
    }
  };

  return {
    loading,
    error: !!error,
    nps: data ? data.site.nps : fallback,
  };
};
