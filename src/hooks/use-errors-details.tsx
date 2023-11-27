import { useQuery } from '@apollo/client';
import { GET_ERRORS_DETAILS_QUERY } from 'data/errors/queries';
import { ErrorsDetails } from 'types/graphql';
import type { TimeRange } from 'types/common';
import type { Site, ErrorsCounts } from 'types/graphql';
import { useSiteId } from 'hooks/use-site-id';

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
  const siteId = useSiteId();

  const { data, loading, error } = useQuery<{ site: Site }>(GET_ERRORS_DETAILS_QUERY, {
    variables: {
      siteId,
      errorId: id,
      ...range,
    },
    skip: !siteId,
  });

  const countsFallack: ErrorsCounts = {
    groupRange: 0,
    groupType: '',
    items: [],
  };

  return {
    loading,
    error: !!error,
    details: data ? data.site.error.details : null,
    counts: data ? data.site.errorsCounts : countsFallack,
  };
};
