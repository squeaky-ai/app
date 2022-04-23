import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { GET_ADMIN_SITE_QUERY } from 'data/admin/queries';
import type { Admin } from 'types/graphql';

type SiteAdmin = Pick<Admin, 'site' | 'activeVisitors'>;

interface UseAdminSite {
  loading: boolean;
  error: boolean;
  admin: SiteAdmin;
}

export const useAdminSite = (): UseAdminSite => {
  const router = useRouter();

  const { loading, error, data } = useQuery(GET_ADMIN_SITE_QUERY, {
    variables: {
      siteId: router.query.site_id as string,
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
