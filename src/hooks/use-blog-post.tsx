import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { GET_BLOG_POST_QUERY } from 'data/blog/queries';
import type { Admin, BlogPost } from 'types/graphql';

interface AdminBlogPost {
  blogPost: BlogPost;
  admin: Pick<Admin, 'blogImages'>;
}

interface UseBlogPost {
  loading: boolean;
  error: boolean;
  post: AdminBlogPost;
  refetch: VoidFunction;
}

export const useBlogPost = (): UseBlogPost => {
  const router = useRouter();

  const skip = !router.isReady;

  const { loading, error, data, refetch } = useQuery(GET_BLOG_POST_QUERY, {
    variables: {
      slug: `/${router.query.category}/${router.query.path}`,
    },
    skip,
  });

  const fallback: AdminBlogPost = {
    blogPost: null,
    admin: {
      blogImages: []
    },
  };

  return {
    loading: loading || skip,
    error: !!error,
    post: data || fallback,
    refetch,
  };
};
