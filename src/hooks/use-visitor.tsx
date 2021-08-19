import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { GET_VISITOR_QUERY } from 'data/visitors/queries';
import type { Site } from 'types/site';
import type { Visitor, PageSortBy } from 'types/visitor';
import type { RecordingSortBy } from 'types/recording';

interface Props {
  recordingPage: number;
  recordingSort: RecordingSortBy;
  pagesPage: number;
  pagesSort: PageSortBy;
}

interface UseVisitor {
  loading: boolean;
  visitor: Visitor | null;
}

export const useVisitor = (props: Props): UseVisitor => {
  const router = useRouter();

  const { data, loading, previousData } = useQuery<{ site: Site }>(GET_VISITOR_QUERY, {
    variables: { 
      siteId: router.query.site_id as string,
      visitorId: router.query.visitor_id as string,
      ...props
    }
  });

  return {
    loading, 
    visitor: data 
      ? data.site.visitor 
      : previousData ? previousData.site.visitor : null
  };
};
