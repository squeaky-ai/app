import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { GET_BLOG_POST_QUERY } from 'data/blog/queries';
import type { BlogPost } from 'types/graphql';

interface AdminBlogPost {
  blogPost: BlogPost;
  blogImagesAdmin: string[];
}

interface UseBlogPost {
  loading: boolean;
  error: boolean;
  post: AdminBlogPost;
  refetch: VoidFunction;
}

export const useBlogPost = (): UseBlogPost => {
  const router = useRouter();

  const { loading, error, data, refetch } = useQuery(GET_BLOG_POST_QUERY, {
    variables: {
      slug: `/${router.query.category}/${router.query.path}`,
    }
  });

  const fallback: AdminBlogPost = {
    blogPost: null,
    blogImagesAdmin: [],
  };

  return {
    loading,
    error: !!error,
    post: data || fallback,
    refetch,
  };
};
