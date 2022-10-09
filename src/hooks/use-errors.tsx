import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { GET_ERRORS_QUERY } from 'data/errors/queries';
import { ErrorsSort } from 'types/graphql';
import type { TimeRange } from 'types/common';
import type { Site, Errors, ErrorsCounts } from 'types/graphql';

interface UseErrors {
  loading: boolean;
  error: boolean;
  errors: Errors;
  counts: ErrorsCounts;
}

interface Props {
  page: number;
  size?: number;
  sort?: ErrorsSort;
  range: TimeRange
}

export const useErrors = ({ page, size, sort, range }: Props): UseErrors => {
  const router = useRouter();

  const { data, loading, error } = useQuery<{ site: Site }>(GET_ERRORS_QUERY, {
    variables: {
      siteId: router.query.site_id as string,
      page,
      size,
      sort,
      ...range,
    }
  });

  const errorsFallback: Errors = {
    items: [],
    pagination: {
      pageSize: 25,
      sort: ErrorsSort.ErrorCountDesc,
      total: 0,
    },
  };

  const countsFallack: ErrorsCounts = {
    groupRange: 0,
    groupType: '',
    items: [],
  };

  return {
    loading,
    error: !!error,
    errors: data ? data.site.errors : errorsFallback,
    counts: data ? data.site.errorsCounts : countsFallack,
  };
};