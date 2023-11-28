import { useQuery } from '@apollo/client';
import { GET_ROUTES_QUERY } from 'data/sites/queries';
import type { Site } from 'types/graphql';
import { useSiteId } from 'hooks/use-site-id';

interface UseRoutes {
  loading: boolean;
  error: boolean;
  routes: string[];
}

export const useRoutes = (): UseRoutes => {
  const [siteId, skip] = useSiteId();

  const { data, loading, error } = useQuery<{ site: Site }>(GET_ROUTES_QUERY, {
    variables: {
      siteId,
    },
    skip,
  });

  return {
    loading: loading || skip,
    error: !!error,
    routes: data ? data.site.routes : [],
  };
};
