import { useQuery } from '@apollo/client';
import { GET_EVENT_GROUPS_QUERY } from 'data/events/queries';
import type { Site, EventsGroup } from 'types/graphql';
import { useSiteId } from 'hooks/use-site-id';

interface UseEventGroups {
  loading: boolean;
  error: boolean;
  groups: EventsGroup[];
}

export const useEventGroups = (): UseEventGroups => {
  const siteId = useSiteId();

  const { data, error, loading } = useQuery<{ site: Site }>(GET_EVENT_GROUPS_QUERY, {
    variables: {
      siteId,
    },
    skip: !siteId,
  });

  return {
    loading,
    error: !!error,
    groups: data
      ? data.site.eventGroups
      : []
  };
};
