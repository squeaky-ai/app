import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { GET_ERRORS_DETAILS_VISITORS_QUERY } from 'data/errors/queries';
import type { TimeRange } from 'types/common';
import type { Site, Visitors, VisitorsSort } from 'types/graphql';

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
  const router = useRouter();

  const { data, loading, error } = useQuery<{ site: Site }>(GET_ERRORS_DETAILS_VISITORS_QUERY, {
    variables: {
      siteId: router.query.site_id as string,
      errorId: id,
      size,
      page,
      sort,
      ...range,
    }
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
    loading,
    error: !!error,
    visitors: data ? data.site.error.visitors : fallback,
  };
};
