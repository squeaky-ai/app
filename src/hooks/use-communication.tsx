import { useQuery } from '@apollo/client';
import { GET_COMMUNICATION_QUERY } from 'data/users/queries';
import type { UsersCommunication } from 'types/graphql';

interface UseCommunication {
  loading: boolean;
  error: boolean;
  communication: UsersCommunication;
}

export const useCommunication = (): UseCommunication => {
  const { loading, error, data } = useQuery(GET_COMMUNICATION_QUERY);

  const fallback: UsersCommunication = {
    id: null,
    onboardingEmail: true,
    weeklyReviewEmail: true,
    monthlyReviewEmail: true,
    productUpdatesEmail: true,
    marketingAndSpecialOffersEmail: true,
    knowledgeSharingEmail: true,
  };

  return {
    loading,
    error: !!error,
    communication: data?.user?.communication || fallback,
  };
};
