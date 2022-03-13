import { useQuery } from '@apollo/client';
import { GET_ADMIN_BLOG_QUERY } from 'data/admin/queries';
import type { AdminBlog } from 'types/admin';

interface UseAdminBlog {
  loading: boolean;
  error: boolean;
  admin: AdminBlog;
  refetch: VoidFunction,
}

export const useAdminBlog = (): UseAdminBlog => {
  const { loading, error, data, refetch } = useQuery(GET_ADMIN_BLOG_QUERY);

  const fallback: AdminBlog = {
    blogImagesAdmin: [],
  };

  return {
    loading, 
    error: !!error,
    admin: data || fallback,
    refetch,
  };
};
