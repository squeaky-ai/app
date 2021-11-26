import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { useToasts } from 'hooks/use-toasts';
import { GET_VISITORS_QUERY } from 'data/visitors/queries';
import { VisitorsSort } from 'types/graphql';
import type { Site, VisitorsFilters, Visitors } from 'types/graphql';

interface Props {
  page: number;
  size?: number;
  query?: string;
  sort?: VisitorsSort;
  filters?: VisitorsFilters;
}

interface UseVisitors {
  loading: boolean;
  error: boolean;
  visitors: Visitors;
}

export const useVisitors = ({ page, size, query, sort, filters }: Props): UseVisitors => {
  const router = useRouter();
  const toasts = useToasts();

  const { data, loading, error, previousData } = useQuery<{ site: Site }>(GET_VISITORS_QUERY, {
    variables: { 
      siteId: router.query.site_id as string, 
      page, 
      size,
      query,
      sort,
      filters,
    }
  });

  if (error) {
    toasts.add({ type: 'error', body: 'An error has occurred' });
  }

  const fallback: Visitors = { 
    items: [], 
    pagination: { 
      pageSize: 0, 
      total: 0, 
      sort: VisitorsSort.FirstViewedAtDesc,
    } 
  };

  return {
    loading,
    error: !!error,
    visitors: data
      ? data.site.visitors
      // When every keypress is made, the state will turn to loading
      // which means that we'd default to an empty items list. This
      // causes the UI to flicker. Instead, we return the last set of
      // results whenever it's loading and only update when the new
      // results are in
      : previousData ? previousData.site.visitors : fallback
  }
};
