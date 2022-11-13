import { useLazyQuery } from '@apollo/client';
import { GET_SITE_QUERY_CREATE } from 'data/sites/queries';
import type { Site } from 'types/graphql';
import type { LazyQueryExecFunction, OperationVariables } from '@apollo/client';

interface UseSiteCreate {
  loading: boolean;
  error: boolean;
  site: Site | null;
  getSite: LazyQueryExecFunction<{ site: Site }, OperationVariables>;
}

export const useSiteCreate = (): UseSiteCreate => {
  const [getSite, { data, loading, error }] = useLazyQuery<{ site: Site }>(GET_SITE_QUERY_CREATE);

  return {
    loading,
    error: !!error,
    site: data ? data.site : null,
    getSite,
  };
};
