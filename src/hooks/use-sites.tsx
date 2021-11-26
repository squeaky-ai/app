import { useQuery } from '@apollo/client';
import { useToasts } from 'hooks/use-toasts';
import { GET_SITES_QUERY } from 'data/sites/queries';
import type { Site } from 'types/graphql';

interface UseSites {
  loading: boolean;
  error: boolean;
  sites: Site[];
}

export const useSites = (): UseSites => {
  const toasts = useToasts();

  const { loading, error, data } = useQuery(GET_SITES_QUERY);

  if (error) {
    toasts.add({ type: 'error', body: 'An error has occurred' });
  }

  return {
    loading, 
    error: !!error,
    sites: data ? data.sites : []
  };
};
