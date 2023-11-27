import { gql, useQuery } from '@apollo/client';
import type { Site, Tag } from 'types/graphql';
import { useSiteId } from 'hooks/use-site-id';

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
  const siteId = useSiteId();

  const { data, error, loading } = useQuery<{ site: Site }>(QUERY, {
    variables: {
      siteId,
    }
  });

  const tags = data ? data.site.tags : [];

  return {
    loading,
    error: !!error,
    tags: [...tags].sort((a, b) => a.name.localeCompare(b.name)),
  };
};
