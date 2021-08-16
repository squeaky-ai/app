import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { GET_VISITORS_QUERY } from 'data/visitors/queries';
import type { Site } from 'types/site';
import type { PaginatedVisitorsResponse, VisitorSortBy } from 'types/visitor';

interface Props {
  page: number;
  query?: string;
  sort?: VisitorSortBy;
}

interface UseVisitors {
  loading: boolean;
  visitors: PaginatedVisitorsResponse;
}

export const useVisitors = ({ page, query, sort }: Props): UseVisitors => {
  const router = useRouter();

  const { data, loading, previousData } = useQuery<{ site: Site }>(GET_VISITORS_QUERY, {
    variables: { 
      siteId: router.query.site_id as string, 
      page, 
      size: 15,
      query,
      sort
    }
  });

  const fallback: PaginatedVisitorsResponse = { 
    items: [], 
    pagination: { 
      pageSize: 0, 
      total: 0, 
      sort: 'FIRST_VIEWED_AT_DESC' 
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