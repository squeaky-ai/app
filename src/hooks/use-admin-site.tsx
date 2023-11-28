import { useQuery } from '@apollo/client';
import { GET_ADMIN_SITE_QUERY } from 'data/admin/queries';
import type { Admin } from 'types/graphql';
import { useSiteId } from 'hooks/use-site-id';

type SiteAdmin = Pick<Admin, 'site' | 'activeVisitors'>;

interface UseAdminSite {
  loading: boolean;
  error: boolean;
  admin: SiteAdmin;
}

export const useAdminSite = (): UseAdminSite => {
  const [siteId, skip] = useSiteId();

  const { loading, error, data } = useQuery(GET_ADMIN_SITE_QUERY, {
    variables: {
      siteId,
    },
    skip,
  });

  const fallback: SiteAdmin = {
    site: null,
    activeVisitors: [],
  };

  return {
    loading: loading || skip, 
    error: !!error,
    admin: data?.admin || fallback,
  };
};
