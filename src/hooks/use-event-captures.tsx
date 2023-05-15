import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { GET_EVENT_CAPTURES_QUERY } from 'data/events/queries';
import type { Site, EventsCapture, EventsCaptureSort, EventsCaptureFilters } from 'types/graphql';

interface Props {
  page: number;
  size?: number;
  sort?: EventsCaptureSort;
  search?: string;
  filters: EventsCaptureFilters;
}

interface UseEventCaptures {
  loading: boolean;
  error: boolean;
  events: EventsCapture;
}

export const useEventCaptures = ({ page, size, sort, search, filters }: Props): UseEventCaptures => {
  const router = useRouter();

  const { data, error, loading } = useQuery<{ site: Site }>(GET_EVENT_CAPTURES_QUERY, {
    variables: {
      siteId: router.query.site_id as string,
      page, 
      size,
      sort,
      search,
      filters,
    },
    pollInterval: 5000,
  });

  const fallback: EventsCapture = {
    items: [],
    pagination: {
      pageSize: size,
      sort,
      total: 0,
    }
  };

  return {
    loading,
    error: !!error,
    events: data
      ? data.site.eventCapture
      : fallback
  };
};
