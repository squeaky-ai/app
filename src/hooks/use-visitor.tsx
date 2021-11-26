import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { GET_VISITOR_QUERY } from 'data/visitors/queries';
import { RecordingsSort } from 'types/graphql';
import type { Site, Visitor, VisitorsPagesSort } from 'types/graphql';

interface Props {
  recordingPage: number;
  recordingSort: RecordingsSort;
  pagesPage: number;
  pagesSort: VisitorsPagesSort;
}

interface UseVisitor {
  loading: boolean;
  error: boolean;
  visitor: Visitor | null;
}

export const useVisitor = (props: Props): UseVisitor => {
  const router = useRouter();

  const { data, loading, error, previousData } = useQuery<{ site: Site }>(GET_VISITOR_QUERY, {
    variables: { 
      siteId: router.query.site_id as string,
      visitorId: router.query.visitor_id as string,
      ...props
    }
  });

  if (error) {
    console.error(error);
  }

  return {
    loading, 
    error: !!error,
    visitor: data 
      ? data.site.visitor 
      : previousData ? previousData.site.visitor : null
  };
};
