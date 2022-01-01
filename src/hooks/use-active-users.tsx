import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { GET_ACTIVE_USERS_QUERY } from 'data/sites/queries';

interface UseActiveUsers {
  loading: boolean;
  error: boolean;
  activeUsers: number;
  startPolling: (interval: number) => void;
  stopPolling: VoidFunction;
}

export const useActiveUsers = (): UseActiveUsers => {
  const router = useRouter();

  const variables = {
    siteId: router.query.site_id as string
  };

  const { loading, error, data, startPolling, stopPolling } = useQuery(GET_ACTIVE_USERS_QUERY, {
    variables
  });

  return {
    loading,
    error: !!error,
    activeUsers: data ? data.site.activeUserCount : 0,
    startPolling,
    stopPolling,
  };
};
