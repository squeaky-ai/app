import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { GET_NPS_QUERY } from 'data/nps/queries';
import { useToasts } from 'hooks/use-toasts';
import { FeedbackNpsResponseSort } from 'types/graphql';
import type { TimeRange } from 'lib/dates';
import type { Site, Nps } from 'types/graphql';

interface Props {
  page: number;
  size?: number;
  query?: string;
  sort?: FeedbackNpsResponseSort;
  range: TimeRange;
}

interface UseNps {
  loading: boolean;
  error: boolean;
  nps: Nps;
}

export const useNps = ({ page, size, sort, range }: Props): UseNps => {
  const router = useRouter();
  const toasts = useToasts();

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
    toasts.add({ type: 'error', body: 'An error has occurred' });
  }

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
    nps: data
      ? data.site.nps
      : previousData ? previousData.site.nps : fallback
  };
};
