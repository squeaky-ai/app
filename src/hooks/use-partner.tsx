import { useQuery } from '@apollo/client';
import { GET_PARTNER_QUERY } from 'data/users/queries';
import type { UsersPartner } from 'types/graphql';

interface UsePartner {
  loading: boolean;
  error: boolean;
  partner: UsersPartner;
}

export const usePartner = (): UsePartner => {
  const { loading, error, data } = useQuery(GET_PARTNER_QUERY, {
    pollInterval: 5000,
  });

  return {
    loading,
    error: !!error,
    partner: data?.user?.partner,
  };
};
