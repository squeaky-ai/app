import { useQuery } from '@apollo/client';
import { GET_AD_TRACKING_QUERY } from 'data/admin/queries';
import { Admin, AdminAdTracking } from 'types/graphql';

interface Props {
  utmContentIds: string[];
}

interface UseAdminAdTracking {
  loading: boolean;
  error: boolean;
  adTracking: AdminAdTracking[];
}

export const useAdminAdTracking = (props: Props): UseAdminAdTracking => {
  const { loading, error, data } = useQuery<{ admin: Admin}>(GET_AD_TRACKING_QUERY, {
    variables: {
      utmContentIds: props.utmContentIds,
    },
  });

  return {
    loading, 
    error: !!error,
    adTracking: data?.admin?.adTracking || [],
  };
};
