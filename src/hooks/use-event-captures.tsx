import { useQuery } from '@apollo/client';
import { GET_EVENT_CAPTURES_QUERY } from 'data/events/queries';
import type { Site, EventsCapture, EventsCaptureSort, EventsCaptureFilters } from 'types/graphql';
import { useSiteId } from 'hooks/use-site-id';

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
  const siteId = useSiteId();

  const { data, error, loading } = useQuery<{ site: Site }>(GET_EVENT_CAPTURES_QUERY, {
    variables: {
      siteId,
      page, 
      size,
      sort,
      search,
      filters,
    },
    pollInterval: 5000,
    skip: !siteId,
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
