import { useQuery } from '@apollo/client';
import { GET_ADMIN_SITES_QUERY } from 'data/admin/queries';
import { AdminSiteSort } from 'types/graphql';
import type { AdminSites, ActiveVisitorCount} from 'types/graphql';

interface Props {
  size: number;
  page: number;
  sort: AdminSiteSort;
  search?: string;
}

interface UseAdminSites {
  loading: boolean;
  error: boolean;
  sites: AdminSites;
  activeVisitors: ActiveVisitorCount[];
}

export const useAdminSites = (props: Props): UseAdminSites => {
  const { loading, error, data } = useQuery(GET_ADMIN_SITES_QUERY, {
    variables: props,
  });

  const fallback: AdminSites = {
    items: [],
    pagination: {
      sort: AdminSiteSort.CreatedAtDesc,
      total: 0,
      pageSize: 25,
    },
  };

  return {
    loading, 
    error: !!error,
    sites: data?.admin?.sites || fallback,
    activeVisitors: data?.admin?.activeVisitors || [],
  };
};
