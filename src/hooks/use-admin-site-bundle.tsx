import { useLazyQuery } from '@apollo/client';
import { GET_ADMIN_SITES_BUNDLE_QUERY } from 'data/admin/queries';
import type { SitesBundle } from 'types/graphql';

interface Props {
  bundleId: string;
}

interface UseAdminSitesBundles {
  loading: boolean;
  error: boolean;
  bundle: SitesBundle;
  getSiteBundle: VoidFunction;
}

export const useAdminSitesBundle = ({ bundleId }: Props): UseAdminSitesBundles => {
  const [getSiteBundle, { loading, error, data }] = useLazyQuery(GET_ADMIN_SITES_BUNDLE_QUERY, {
    variables: { bundleId },
  });

  return {
    loading, 
    error: !!error,
    bundle: data?.admin?.sitesBundle,
    getSiteBundle,
  };
};
