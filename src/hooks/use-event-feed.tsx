import { useQuery } from '@apollo/client';
import { GET_EVENT_FEED_QUERY } from 'data/events/queries';
import type { TimeRange } from 'types/common';
import type { Site, EventsFeed, EventsFeedSort } from 'types/graphql';
import { useSiteId } from 'hooks/use-site-id';

interface Props {
  groupIds: string[];
  captureIds: string[];
  page: number;
  size: number;
  sort: EventsFeedSort;
  range: TimeRange;
}

interface UseEventFeed {
  loading: boolean;
  error: boolean;
  feed: EventsFeed;
}

export const useEventFeed = (props: Props): UseEventFeed => {
  const siteId = useSiteId();

  const { data, error, loading } = useQuery<{ site: Site }>(GET_EVENT_FEED_QUERY, {
    variables: {
      siteId,
      ...props,
      ...props.range,
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
