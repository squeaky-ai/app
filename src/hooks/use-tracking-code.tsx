import { useQuery } from '@apollo/client';
import { GET_VERIFIED_AT_QUERY } from 'data/sites/queries';
import { useSiteId } from 'hooks/use-site-id';

interface UseSite {
  loading: boolean;
  error: boolean;
  verifiedAt: string | null;
}

export const useTrackingCode = (): UseSite => {
  const siteId = useSiteId();

  const { loading, error, data } = useQuery(GET_VERIFIED_AT_QUERY, {
    variables: {
      siteId,
    },
    pollInterval: 5000,
  });

  return {
    loading,
    error: !!error,
    verifiedAt: data?.site?.verifiedAt || null,
  };
};
