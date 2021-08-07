import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { GET_RECORDINGS_QUERY } from 'data/recordings/queries';
import type { Site } from 'types/site';
import type { PaginatedRecordingsResponse, RecordingSortBy } from 'types/recording';

interface Props {
  page: number;
  query?: string;
  sort?: RecordingSortBy;
}

export const useRecordings = ({ page, query, sort }: Props): [boolean, PaginatedRecordingsResponse] => {
  const router = useRouter();

  const { data, loading, previousData } = useQuery<{ site: Site }>(GET_RECORDINGS_QUERY, {
    variables: { 
      siteId: router.query.site_id as string, 
      page, 
      size: 15,
      query,
      sort
    }
  });

  const fallback: PaginatedRecordingsResponse = { 
    items: [], 
    pagination: { 
      pageSize: 0, 
      total: 0, 
      sort: 'DATE_DESC' 
    } 
  };

  // When every keypress is made, the state will turn to loading
  // which means that we'd default to an empty items list. This
  // causes the UI to flicker. Instead, we return the last set of
  // results whenever it's loading and only update when the new
  // results are in
  const results = data
    ? data.site.recordings
    : previousData ? previousData.site.recordings : fallback;

  return [loading, results];
};
