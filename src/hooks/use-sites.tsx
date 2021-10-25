import { useQuery } from '@apollo/client';
import { GET_SITES_QUERY } from 'data/sites/queries';
import type { Site } from 'types/site';

interface UseSites {
  loading: boolean;
  error: boolean;
  sites: Site[];
}

export const useSites = (): UseSites => {
  const { loading, error, data } = useQuery(GET_SITES_QUERY);

  if (error) {
    console.error(error);
  }

  return {
    loading, 
    error: !!error,
    sites: data ? data.sites : []
  };
};
