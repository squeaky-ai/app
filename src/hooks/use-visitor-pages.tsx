import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { GET_VISITOR_PAGES_QUERY } from 'data/visitors/queries';
import { Visitor, Site, VisitorsPagesSort } from 'types/graphql';

interface Props {
  page: number;
  sort: VisitorsPagesSort;
}

interface UseVisitorPages {
  loading: boolean;
  error: boolean;
  pages: Visitor['pages'];
}

export const useVisitorPages = (props: Props): UseVisitorPages => {
  const router = useRouter();

  const { data, loading, error } = useQuery<{ site: Site }>(GET_VISITOR_PAGES_QUERY, {
    variables: { 
      siteId: router.query.site_id as string,
      visitorId: router.query.visitor_id as string,
      ...props,
    },
  });

  const fallback: Visitor['pages'] = {
    items: [],
    pagination: {
      pageSize: 0,
      sort: VisitorsPagesSort.ViewsCountDesc,
      total: 0,
    },
  }

  return {
    loading, 
    error: !!error,
    pages: data?.site?.visitor?.pages || fallback,
  };
};
