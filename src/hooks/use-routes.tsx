import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { GET_ROUTES_QUERY } from 'data/sites/queries';
import type { Site } from 'types/graphql';

interface UseRoutes {
  loading: boolean;
  error: boolean;
  routes: string[];
}

export const useRoutes = (): UseRoutes => {
  const router = useRouter();

  const { data, loading, error } = useQuery<{ site: Site }>(GET_ROUTES_QUERY, {
    variables: {
      siteId: router.query.site_id as string,
    },
  });

  return {
    loading,
    error: !!error,
    routes: data ? data.site.routes : [],
  };
};
