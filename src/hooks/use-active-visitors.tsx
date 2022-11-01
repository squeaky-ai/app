import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { GET_ACTIVE_USERS_QUERY } from 'data/sites/queries';

interface UseActiveVisitors {
  loading: boolean;
  error: boolean;
  activeVisitors: number;
}

export const useActiveVisitors = (): UseActiveVisitors => {
  const router = useRouter();

  const variables = {
    siteId: router.query.site_id as string
  };

  const { loading, error, data } = useQuery(GET_ACTIVE_USERS_QUERY, {
    variables,
    pollInterval: 5000,
  });

  return {
    loading,
    error: !!error,
    activeVisitors: data ? data.site.activeUserCount : 0,
  };
};
