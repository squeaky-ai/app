import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { GET_DATA_EXPORT_QUERY } from 'data/sites/queries';
import { DataExport } from 'types/graphql';
import type { Site } from 'types/graphql';

interface UseDataExport {
  loading: boolean;
  error: boolean;
  dataExport: DataExport[];
}

export const useDataExport = (): UseDataExport => {
  const router = useRouter();

  const { data, loading, error } = useQuery<{ site: Site }>(GET_DATA_EXPORT_QUERY, {
    variables: {
      siteId: router.query.site_id as string,
    }
  });

  return {
    loading,
    error: !!error,
    dataExport: data ? data.site.dataExports : [],
  };
};
