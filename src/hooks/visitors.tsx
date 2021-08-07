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

export const useVisitors = ({ page, query, sort }: Props): [boolean, PaginatedVisitorsResponse] => {
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

  // When every keypress is made, the state will turn to loading
  // which means that we'd default to an empty items list. This
  // causes the UI to flicker. Instead, we return the last set of
  // results whenever it's loading and only update when the new
  // results are in
  const results = data
    ? data.site.visitors
    : previousData ? previousData.site.visitors : fallback;

  return [loading, results];
};
