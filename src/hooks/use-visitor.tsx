import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { GET_VISITOR_QUERY } from 'data/visitors/queries';
import type { Site, Visitor } from 'types/graphql';
import { useSiteId } from 'hooks/use-site-id';

interface UseVisitor {
  loading: boolean;
  error: boolean;
  visitor: Visitor | null;
}

export const useVisitor = (): UseVisitor => {
  const siteId = useSiteId();
  const router = useRouter();

  const { data, loading, error } = useQuery<{ site: Site }>(GET_VISITOR_QUERY, {
    variables: { 
      siteId,
      visitorId: router.query.visitor_id as string,
    },
    skip: !siteId,
  });

  return {
    loading, 
    error: !!error,
    visitor: data ? data.site.visitor : null,
  };
};
