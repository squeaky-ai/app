import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { GET_ERRORS_DETAILS_QUERY } from 'data/errors/queries';
import { ErrorsDetails } from 'types/graphql';
import type { TimeRange } from 'types/common';
import type { Site, ErrorsCounts } from 'types/graphql';

interface UseErrorsDetails {
  loading: boolean;
  error: boolean;
  details: ErrorsDetails;
  counts: ErrorsCounts;
}

interface Props {
  id: string;
  range: TimeRange
}

export const useErrorsDetails = ({ id, range }: Props): UseErrorsDetails => {
  const router = useRouter();

  const { data, loading, error } = useQuery<{ site: Site }>(GET_ERRORS_DETAILS_QUERY, {
    variables: {
      siteId: router.query.site_id as string,
      errorId: id,
      ...range,
    }
  });

  const countsFallack: ErrorsCounts = {
    groupRange: 0,
    groupType: '',
    items: [],
  };

  return {
    loading,
    error: !!error,
    details: data ? data.site.errorDetails : null,
    counts: data ? data.site.errorsCounts : countsFallack,
  };
};
