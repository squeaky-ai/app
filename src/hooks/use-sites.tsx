import { useQuery } from '@apollo/client';
import { GET_SITES_QUERY } from 'data/sites/queries';
import type { Site } from 'types/site';

interface UseSites {
  loading: boolean;
  sites: Site[];
}

export const useSites = (): UseSites => {
  const { loading, data } = useQuery(GET_SITES_QUERY);

  return {
    loading, 
    sites: data ? data.sites : []
  };
};
