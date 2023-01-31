import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { GET_VISITOR_EVENTS_QUERY } from 'data/visitors/queries';
import { Visitor, Site, EventsFeedSort } from 'types/graphql';

interface Props {
  page: number;
  sort: EventsFeedSort;
}

interface UseVisitorEvents {
  loading: boolean;
  error: boolean;
  events: Visitor['events'];
}

export const useVisitorEvents = (props: Props): UseVisitorEvents => {
  const router = useRouter();

  const { data, loading, error } = useQuery<{ site: Site }>(GET_VISITOR_EVENTS_QUERY, {
    variables: { 
      siteId: router.query.site_id as string,
      visitorId: router.query.visitor_id as string,
      ...props,
    },
  });

  const fallback: Visitor['events'] = {
    items: [],
    pagination: {
      pageSize: 0,
      sort: EventsFeedSort.TimestampDesc,
      total: 0,
    },
  }

  return {
    loading, 
    error: !!error,
    events: data?.site?.visitor?.events || fallback,
  };
};
