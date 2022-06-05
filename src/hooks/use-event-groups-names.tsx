import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { GET_EVENT_GROUPS_QUERY } from 'data/events/queries';
import type { Site, EventsGroup } from 'types/graphql';

interface UseEventGroups {
  loading: boolean;
  error: boolean;
  groups: EventsGroup[];
}

export const useEventGroups = (): UseEventGroups => {
  const router = useRouter();

  const { data, error, loading } = useQuery<{ site: Site }>(GET_EVENT_GROUPS_QUERY, {
    variables: {
      siteId: router.query.site_id as string,
    }
  });

  return {
    loading,
    error: !!error,
    groups: data
      ? data.site.eventGroups
      : []
  };
};
