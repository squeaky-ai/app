import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { GET_VISITORS_QUERY } from 'data/visitors/queries';
import type { Site } from 'types/site';
import type { Filters, PaginatedVisitorsResponse, VisitorSortBy } from 'types/visitor';

interface Props {
  page: number;
  size?: number;
  query?: string;
  sort?: VisitorSortBy;
  filters?: Filters;
}

interface UseVisitors {
  loading: boolean;
  visitors: PaginatedVisitorsResponse;
}

export const useVisitors = ({ page, size, query, sort, filters }: Props): UseVisitors => {
  const router = useRouter();

  const { data, loading, previousData } = useQuery<{ site: Site }>(GET_VISITORS_QUERY, {
    variables: { 
      siteId: router.query.site_id as string, 
      page, 
      size,
      query,
      sort,
      filters,
    }
  });

  const fallback: PaginatedVisitorsResponse = { 
    items: [], 
    pagination: { 
      pageSize: 0, 
      total: 0, 
      sort: 'first_viewed_at__desc' 
    } 
  };

  return {
    loading,
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
