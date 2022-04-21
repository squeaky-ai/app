import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { GET_VERIFIED_AT_QUERY } from 'data/sites/queries';

interface UseSite {
  loading: boolean;
  error: boolean;
  verifiedAt: string | null;
}

export const useTrackingCode = (): UseSite => {
  const router = useRouter();

  const { loading, error, data } = useQuery(GET_VERIFIED_AT_QUERY, {
    variables: {
      siteId: router.query.site_id as string
    },
    pollInterval: 5000,
  });

  return {
    loading,
    error: !!error,
    verifiedAt: data?.site?.verifiedAt || null,
  };
};
