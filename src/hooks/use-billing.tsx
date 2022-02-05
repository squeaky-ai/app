import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { GET_BILLING_QUERY } from 'data/sites/queries';
import type { Site, SiteBilling } from 'types/graphql';

interface UseBilling {
  loading: boolean;
  error: boolean;
  billing?: SiteBilling;
}

export const useBilling = (): UseBilling => {
  const router = useRouter();

  const { data, loading, error } = useQuery<{ site: Site }>(GET_BILLING_QUERY, {
    variables: { 
      siteId: router.query.site_id as string,
    }
  });

  return {
    loading,
    error: !!error,
    billing: data?.site?.billing,
  };
};
