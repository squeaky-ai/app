import { useQuery } from '@apollo/client';
import { GET_SITES_QUERY } from 'data/sites/queries';
import type { Site } from 'types/graphql';

interface UseSites {
  loading: boolean;
  error: boolean;
  sites: Site[];
}

export const useSites = (): UseSites => {
  const { loading, error, data } = useQuery(GET_SITES_QUERY);

  return {
    loading, 
    error: !!error,
    sites: data ? data.sites : []
  };
};
