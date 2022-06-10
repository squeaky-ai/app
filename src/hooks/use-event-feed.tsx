import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { GET_EVENT_FEED_QUERY } from 'data/events/queries';
import type { Site, EventsFeed, EventsFeedSort } from 'types/graphql';

interface Props {
  groupIds: string[];
  captureIds: string[];
  page: number;
  size?: number;
  sort?: EventsFeedSort;
}

interface UseEventFeed {
  loading: boolean;
  error: boolean;
  feed: EventsFeed;
}

export const useEventFeed = (props: Props): UseEventFeed => {
  const router = useRouter();

  const { data, error, loading } = useQuery<{ site: Site }>(GET_EVENT_FEED_QUERY, {
    variables: {
      siteId: router.query.site_id as string,
      ...props,
    }
  });

  const fallback: EventsFeed = {
    items: [],
    pagination: {
      pageSize: props.size,
      sort: props.sort,
      total: 0,
    },
  }

  return {
    loading,
    error: !!error,
    feed: data ? data.site.eventFeed : fallback,
  };
};
