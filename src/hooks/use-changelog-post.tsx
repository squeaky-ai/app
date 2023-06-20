import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { GET_CHANGELOG_POST_QUERY } from 'data/changelog/queries';
import type { Admin, ChangelogPost } from 'types/graphql';

interface AdminChangelogPost {
  changelogPost: ChangelogPost;
  admin: Pick<Admin, 'blogImages'>;
}

interface UseChangelogPost {
  loading: boolean;
  error: boolean;
  post: AdminChangelogPost;
  refetch: VoidFunction;
}

export const useChangelogPost = (): UseChangelogPost => {
  const router = useRouter();

  const { loading, error, data, refetch } = useQuery(GET_CHANGELOG_POST_QUERY, {
    variables: {
      slug: `/${router.query.path}`,
    }
  });

  const fallback: AdminChangelogPost = {
    changelogPost: null,
    admin: {
      blogImages: []
    },
  };

  return {
    loading,
    error: !!error,
    post: data || fallback,
    refetch,
  };
};
