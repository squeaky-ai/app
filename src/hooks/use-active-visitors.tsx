import { useQuery } from '@apollo/client';
import { GET_ACTIVE_USERS_QUERY } from 'data/sites/queries';
import { useSiteId } from 'hooks/use-site-id';

interface UseActiveVisitors {
  loading: boolean;
  error: boolean;
  activeVisitors: number;
}

export const useActiveVisitors = (): UseActiveVisitors => {
  const [siteId, skip] = useSiteId();

  const { loading, error, data } = useQuery(GET_ACTIVE_USERS_QUERY, {
    variables: { siteId },
    pollInterval: 5000,
    skip,
  });

  return {
    loading: loading || skip,
    error: !!error,
    activeVisitors: data ? data.site.activeUserCount : 0,
  };
};
