import { useQuery } from '@apollo/client';
import { GET_ADMIN_SITES_BUNDLES_QUERY } from 'data/admin/queries';
import type { SitesBundle } from 'types/graphql';

interface UseAdminSitesBundles {
  loading: boolean;
  error: boolean;
  bundles: SitesBundle[];
}

export const useAdminSitesBundles = (): UseAdminSitesBundles => {
  const { loading, error, data } = useQuery(GET_ADMIN_SITES_BUNDLES_QUERY);

  return {
    loading, 
    error: !!error,
    bundles: data?.admin?.sitesBundles || [],
  };
};
