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
  const siteId = useSiteId();

  const { loading, error, data } = useQuery(GET_ADMIN_SITE_QUERY, {
    variables: {
      siteId,
    }
  });

  const fallback: SiteAdmin = {
    site: null,
    activeVisitors: [],
  };

  return {
    loading, 
    error: !!error,
    admin: data?.admin || fallback,
  };
};
