import { useQuery } from '@apollo/client';
import { GET_BLOG_POSTS_QUERY } from 'data/blog/queries';
import type { BlogPosts } from 'types/graphql';

interface UseBlogPosts {
  loading: boolean;
  error: boolean;
  posts: BlogPosts;
}

export const useBlogPosts = (): UseBlogPosts => {
  const { loading, error, data } = useQuery(GET_BLOG_POSTS_QUERY, {
    variables: {
      category: null,
      tags: [],
    }
  });

  const fallback: BlogPosts = {
    tags: [],
    categories: [],
    posts: [],
  };

  return {
    loading,
    error: !!error,
    posts: data?.blogPosts || fallback,
  };
};
