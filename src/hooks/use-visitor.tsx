import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { GET_VISITOR_QUERY } from 'data/visitors/queries';
import type { Site, Visitor } from 'types/graphql';

interface UseVisitor {
  loading: boolean;
  error: boolean;
  visitor: Visitor | null;
}

export const useVisitor = (): UseVisitor => {
  const router = useRouter();

  const { data, loading, error } = useQuery<{ site: Site }>(GET_VISITOR_QUERY, {
    variables: { 
      siteId: router.query.site_id as string,
      visitorId: router.query.visitor_id as string,
    },
  });

  return {
    loading, 
    error: !!error,
    visitor: data ? data.site.visitor : null,
  };
};
