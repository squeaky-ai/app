import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { GET_VISITORS_QUERY } from 'data/visitors/queries';
import { VisitorsSort } from 'types/graphql';
import { getDateRange } from 'lib/dates';
import type { Site, Visitors, VisitorsFilters as Filters } from 'types/graphql';
import type { VisitorsFilters } from 'types/visitors';
import type { TimeRange } from 'types/common';

interface Props {
  page: number;
  size?: number;
  sort?: VisitorsSort;
  search?: string;
  filters?: VisitorsFilters;
  range: TimeRange;
}

interface UseVisitors {
  loading: boolean;
  error: boolean;
  visitors: Visitors;
}

const formatVisitorsFilters = (filters: VisitorsFilters): Filters => ({
  ...filters,
  firstVisited: filters.firstVisited ? getDateRange(filters.firstVisited) : null,
  lastActivity: filters.lastActivity ? getDateRange(filters.lastActivity) : null,
});

export const useVisitors = ({ page, size, sort, search, filters, range }: Props): UseVisitors => {
  const router = useRouter();

  const { data, loading, error } = useQuery<{ site: Site }>(GET_VISITORS_QUERY, {
    variables: { 
      siteId: router.query.site_id as string, 
      page, 
      size,
      sort,
      search,
      filters: formatVisitorsFilters(filters),
      ...range,
    }
  });

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
    visitors: data ? data.site.visitors : fallback,
  }
};
