import React from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { GET_FEEDBACK_QUERY } from 'data/feedback/queries';
import type { Feedback } from 'types/graphql';
import type { SupportedLanguages } from 'types/translations';

interface UseFeedback {
  loading: boolean;
  error: boolean;
  feedback: Feedback;
  locale: SupportedLanguages;
  setLocale: (locale: SupportedLanguages) => void;
}

export const useFeedback = (): UseFeedback => {
  const router = useRouter();

  const [locale, setLocale] = React.useState<SupportedLanguages>(null);

  const { loading, error, data } = useQuery(GET_FEEDBACK_QUERY, {
    variables: {
      siteId: router.query.site_id as string,
      locale: locale || 'en',
    }
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
    npsTranslations: '{}',
    npsHideLogo: false,
    sentimentEnabled: false,
    sentimentAccentColor: null,
    sentimentExcludedPages: null,
    sentimentLayout: null,
    sentimentDevices: ['desktop', 'tablet'],
    sentimentHideLogo: false,
    sentimentSchedule: 'always',
  };

  React.useEffect(() => {
    const userLocale = navigator.language.split('-')[0];

    if (!locale && data?.site?.feedback && data.site.feedback.npsLanguages.includes(userLocale)) {
      setLocale(userLocale as SupportedLanguages);
    }
  }, [data?.site?.feedback?.npsLanguages]);

  return {
    loading,
    error: !!error,
    feedback: data?.site?.feedback || fallback,
    locale,
    setLocale,
  };
};
