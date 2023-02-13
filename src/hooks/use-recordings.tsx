import { useQuery } from '@apollo/client';
import { GET_RECORDINGS_QUERY } from 'data/recordings/queries';
import { RecordingsSort } from 'types/graphql';
import type { TimeRange } from 'types/common';
import type { Site, RecordingsFilters, Recordings } from 'types/graphql';

interface Props {
  site: Site;
  page: number;
  size?: number;
  sort?: RecordingsSort;
  filters?: RecordingsFilters;
  range: TimeRange;
}

interface UseRecordings {
  loading: boolean;
  error: boolean;
  recordings: Recordings;
}

export const useRecordings = ({ site, page, size, sort, filters, range }: Props): UseRecordings => {
  const { data, loading, error } = useQuery<{ site: Site }>(GET_RECORDINGS_QUERY, {
    variables: { 
      siteId: site.id, 
      page, 
      size,
      sort,
      filters,
      ...range,
    },
    skip: site.recordingsCount === 0,
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
    recordings: data ? data.site.recordings : fallback,
  };
};
