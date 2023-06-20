import { useQuery } from '@apollo/client';
import { GET_CHANGELOG_POSTS_QUERY } from 'data/changelog/queries';
import type { ChangelogPost } from 'types/graphql';

interface UseChangelogPosts {
  loading: boolean;
  error: boolean;
  posts: ChangelogPost[];
}

export const useChangelogPosts = (): UseChangelogPosts => {
  const { loading, error, data } = useQuery(GET_CHANGELOG_POSTS_QUERY);

  return {
    loading,
    error: !!error,
    posts: data?.changelogPosts || [],
  };
};
