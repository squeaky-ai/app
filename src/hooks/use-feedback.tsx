import { useQuery } from '@apollo/client';
import { GET_FEEDBACK_QUERY } from 'data/feedback/queries';
import type { Feedback } from 'types/graphql';
import { useSiteId } from 'hooks/use-site-id';

interface UseFeedback {
  loading: boolean;
  error: boolean;
  feedback: Feedback;
}

export const useFeedback = (): UseFeedback => {
  const siteId = useSiteId();

  const { loading, error, data } = useQuery(GET_FEEDBACK_QUERY, {
    variables: {
      siteId,
    },
  });

  const fallback: Feedback = {
    id: null,
    npsEnabled: false,
    npsAccentColor: null,
    npsPhrase: null,
    npsFollowUpEnabled: null,
    npsContactConsentEnabled: null,
    npsLayout: null,
    npsLanguages: ['en'],
    npsLanguagesDefault: 'en',
    npsExcludedPages: [],
    npsHideLogo: false,
    sentimentEnabled: false,
    sentimentAccentColor: null,
    sentimentExcludedPages: null,
    sentimentLayout: null,
    sentimentDevices: ['desktop', 'tablet'],
    sentimentHideLogo: false,
    sentimentSchedule: 'always',
    sentimentLanguages: ['en'],
    sentimentLanguagesDefault: 'en',
  };

  return {
    loading,
    error: !!error,
    feedback: data?.site?.feedback || fallback,
  };
};
