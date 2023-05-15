import { useQuery } from '@apollo/client';
import { GET_AD_TRACKING_QUERY } from 'data/admin/queries';
import { Admin, AdminAdTracking } from 'types/graphql';

interface Props {
  utmContentIds: string[];
  page: number;
  size?: number;
}

interface UseAdminAdTracking {
  loading: boolean;
  error: boolean;
  adTracking: AdminAdTracking;
}

export const useAdminAdTracking = (props: Props): UseAdminAdTracking => {
  const { loading, error, data } = useQuery<{ admin: Admin}>(GET_AD_TRACKING_QUERY, {
    variables: {
      utmContentIds: props.utmContentIds,
      size: props.size,
      page: props.page,
    },
  });

  const fallback: AdminAdTracking = {
    items: [],
    pagination: {
      pageSize: 25,
      total: 0,
    },
  };

  return {
    loading, 
    error: !!error,
    adTracking: data?.admin?.adTracking || fallback,
  };
};
