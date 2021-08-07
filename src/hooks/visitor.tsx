import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { GET_VISITOR_QUERY } from 'data/visitors/queries';
import type { Site } from 'types/site';
import type { Visitor } from 'types/visitor';

export const useVisitor = (): [boolean, Visitor | null] => {
  const router = useRouter();

  const { data, loading } = useQuery<{ site: Site }>(GET_VISITOR_QUERY, {
    variables: { 
      siteId: router.query.site_id as string,
      viewerId: router.query.visitor_id as string
    }
  });

  return [
    loading, 
    data ? data.site.visitor : null
  ];
};
