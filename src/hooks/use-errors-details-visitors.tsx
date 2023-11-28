import { useQuery } from '@apollo/client';
import { GET_ERRORS_DETAILS_VISITORS_QUERY } from 'data/errors/queries';
import type { TimeRange } from 'types/common';
import type { Site, Visitors, VisitorsSort } from 'types/graphql';
import { useSiteId } from 'hooks/use-site-id';

interface UseErrorsDetailsVisitors {
  loading: boolean;
  error: boolean;
  visitors: Visitors;
}

interface Props {
  id: string;
  range: TimeRange
  page: number;
  size: number;
  sort: VisitorsSort;
}

export const useErrorsDetailsVisitors = ({ 
  id, 
  range,
  size,
  page,
  sort,
}: Props): UseErrorsDetailsVisitors => {
  const [siteId, skip] = useSiteId();

  const { data, loading, error } = useQuery<{ site: Site }>(GET_ERRORS_DETAILS_VISITORS_QUERY, {
    variables: {
      siteId,
      errorId: id,
      size,
      page,
      sort,
      ...range,
    },
    skip,
  });

  const fallback: Visitors = {
    items: [],
    pagination: {
      pageSize: size,
      sort,
      total: 0,
    },
  };

  return {
    loading: loading || skip,
    error: !!error,
    visitors: data ? data.site.error.visitors : fallback,
  };
};
