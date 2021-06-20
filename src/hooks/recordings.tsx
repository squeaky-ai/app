import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { GET_RECORDINGS_QUERY } from 'data/recordings/queries';
import type { Site } from 'types/site';
import type { PaginatedRecordingsResponse } from 'types/recording';

interface Props {
  page: number;
  query?: string;
}

export const useRecordings = ({ page, query }: Props): PaginatedRecordingsResponse => {
  const router = useRouter();

  const { data } = useQuery<{ site: Site }>(GET_RECORDINGS_QUERY, {
    variables: { 
      id: router.query.site_id as string, 
      page, 
      size: 15,
      query
    }
  });

  return data 
    ? data.site.recordings
    : { items: [], pagination: { pageSize: 0, pageCount: 0 } };
};
