import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { GET_RECORDINGS_QUERY } from 'data/recordings/queries';
import { RecordingsSort } from 'types/graphql';
import type { Site, RecordingsFilters, Recordings } from 'types/graphql';

interface Props {
  page: number;
  size?: number;
  sort?: RecordingsSort;
  filters?: RecordingsFilters;
}

interface UseRecordings {
  loading: boolean;
  error: boolean;
  recordings: Recordings;
}

export const useRecordings = ({ page, size, sort, filters }: Props): UseRecordings => {
  const router = useRouter();

  const { data, loading, error, previousData } = useQuery<{ site: Site }>(GET_RECORDINGS_QUERY, {
    variables: { 
      siteId: router.query.site_id as string, 
      page, 
      size,
      sort,
      filters,
    }
  });

  const fallback: Recordings = { 
    items: [], 
    pagination: { 
      pageSize: 0, 
      total: 0, 
      sort: RecordingsSort.ConnectedAtDesc 
    } 
  };

  return {
    loading,
    error: !!error,
    recordings: data
      ? data.site.recordings
      // When every keypress is made, the state will turn to loading
      // which means that we'd default to an empty items list. This
      // causes the UI to flicker. Instead, we return the last set of
      // results whenever it's loading and only update when the new
      // results are in
      : previousData ? previousData.site.recordings : fallback
  };
};
