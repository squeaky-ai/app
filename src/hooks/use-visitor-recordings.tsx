import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { GET_VISITOR_RECORDINGS_QUERY } from 'data/visitors/queries';
import { RecordingsSort } from 'types/graphql';
import type { Visitor, Site } from 'types/graphql';
import { useSiteId } from 'hooks/use-site-id';

interface Props {
  page: number;
  sort: RecordingsSort;
}

interface UseVisitorRecordings {
  loading: boolean;
  error: boolean;
  recordings: Visitor['recordings'];
}

export const useVisitorRecordings = (props: Props): UseVisitorRecordings => {
  const router = useRouter();
  const siteId = useSiteId();

  const { data, loading, error } = useQuery<{ site: Site }>(GET_VISITOR_RECORDINGS_QUERY, {
    variables: { 
      siteId,
      visitorId: router.query.visitor_id as string,
      ...props,
    },
    skip: !siteId,
  });

  const fallback: Visitor['recordings'] = {
    items: [],
    pagination: {
      pageSize: 0,
      sort: RecordingsSort.ConnectedAtDesc,
      total: 0,
    },
  }

  return {
    loading, 
    error: !!error,
    recordings: data?.site?.visitor?.recordings || fallback,
  };
};
