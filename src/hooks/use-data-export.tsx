import { useQuery } from '@apollo/client';
import { GET_DATA_EXPORT_QUERY } from 'data/sites/queries';
import { DataExport } from 'types/graphql';
import type { Site } from 'types/graphql';
import { useSiteId } from 'hooks/use-site-id';

interface UseDataExport {
  loading: boolean;
  error: boolean;
  dataExport: DataExport[];
}

export const useDataExport = (): UseDataExport => {
  const siteId = useSiteId();

  const { data, loading, error } = useQuery<{ site: Site }>(GET_DATA_EXPORT_QUERY, {
    variables: {
      siteId,
    },
    pollInterval: 5000,
  });

  return {
    loading,
    error: !!error,
    dataExport: data ? data.site.dataExports : [],
  };
};
