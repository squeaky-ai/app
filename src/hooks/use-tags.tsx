import { gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import type { Site, Tag } from 'types/graphql';

interface UseTags {
  loading: boolean;
  error: boolean;
  tags: Tag[];
}

const QUERY = gql`
  query GetSiteTags($siteId: ID!) {
    site(siteId: $siteId) {
      id
      tags {
        id
        name
      }
    }
  }
`;

export const useTags = (): UseTags => {
  const router = useRouter();

  const { data, error, loading } = useQuery<{ site: Site }>(QUERY, {
    variables: {
      siteId: router.query.site_id as string
    }
  });

  const tags = data ? data.site.tags : [];

  return {
    loading,
    error: !!error,
    tags: [...tags].sort((a, b) => a.name.localeCompare(b.name)),
  };
};
