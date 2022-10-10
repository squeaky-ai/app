import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { GET_ERRORS_DETAILS_RECORDINGS_QUERY } from 'data/errors/queries';
import type { TimeRange } from 'types/common';
import type { Site, RecordingsSort, Recordings } from 'types/graphql';

interface UseErrorsDetailsRecordings {
  loading: boolean;
  error: boolean;
  recordings: Recordings;
}

interface Props {
  id: string;
  range: TimeRange
  page: number;
  size: number;
  sort: RecordingsSort;
}

export const useErrorsDetailsRecordings = ({ 
  id, 
  range,
  size,
  page,
  sort,
}: Props): UseErrorsDetailsRecordings => {
  const router = useRouter();

  const { data, loading, error } = useQuery<{ site: Site }>(GET_ERRORS_DETAILS_RECORDINGS_QUERY, {
    variables: {
      siteId: router.query.site_id as string,
      errorId: id,
      size,
      page,
      sort,
      ...range,
    }
  });

  const fallback: Recordings = {
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
    recordings: data ? data.site.error.recordings : fallback,
  };
};
