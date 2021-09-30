import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { GET_RECORDINGS_QUERY } from 'data/recordings/queries';
import type { Site } from 'types/site';
import type { Filters, PaginatedRecordingsResponse, RecordingSortBy } from 'types/recording';

interface Props {
  page: number;
  size?: number;
  query?: string;
  sort?: RecordingSortBy;
  filters?: Filters;
}

interface UseRecordings {
  loading: boolean;
  recordings: PaginatedRecordingsResponse;
}

export const useRecordings = ({ page, size, query, sort, filters }: Props): UseRecordings => {
  const router = useRouter();

  const { data, loading, previousData } = useQuery<{ site: Site }>(GET_RECORDINGS_QUERY, {
    variables: { 
      siteId: router.query.site_id as string, 
      page, 
      size,
      query,
      sort,
      filters,
    }
  });

  const fallback: PaginatedRecordingsResponse = { 
    items: [], 
    pagination: { 
      pageSize: 0, 
      total: 0, 
      sort: 'connected_at__desc' 
    } 
  };

  return {
    loading,
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
