import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { GET_FEEDBACK_QUERY } from 'data/feedback/queries';
import { useToasts } from 'hooks/use-toasts';
import type { Feedback } from 'types/graphql';

interface UseFeedback {
  loading: boolean;
  error: boolean;
  feedback: Feedback;
}

export const useFeedback = (): UseFeedback => {
  const router = useRouter();
  const toasts = useToasts();

  const { loading, error, data } = useQuery(GET_FEEDBACK_QUERY, {
    variables: {
      siteId: router.query.site_id as string
    }
  });

  if (error) {
    toasts.add({ type: 'error', body: 'An error has occurred' });
  }

  const fallback: Feedback = {
    npsEnabled: false,
    npsAccentColor: null,
    npsPhrase: null,
    npsFollowUpEnabled: null,
    npsContactConsentEnabled: null,
    npsLayout: null,
    sentimentEnabled: false,
    sentimentAccentColor: null,
    sentimentExcludedPages: null,
    sentimentLayout: null,
  };

  return {
    loading,
    error: !!error,
    feedback: data?.site?.feedback || fallback,
  };
};
