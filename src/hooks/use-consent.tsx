import React from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { GET_CONSENT_QUERY } from 'data/consent/queries';
import type { Consent } from 'types/graphql';
import type { SupportedLanguages } from 'types/translations';

interface UseConsent {
  loading: boolean;
  error: boolean;
  consent: Consent;
  locale: SupportedLanguages;
  setLocale: (locale: SupportedLanguages) => void;
}

export const useConsent = (): UseConsent => {
  const router = useRouter();

  const [locale, setLocale] = React.useState<SupportedLanguages>(null);

  const { loading, error, data } = useQuery(GET_CONSENT_QUERY, {
    variables: {
      siteId: router.query.site_id as string,
    }
  });

  const fallback: Consent = {
    id: null,
    name: '',
    consentMethod: 'disabled',
    layout: 'bottom_left',
    privacyPolicyUrl: '',
    languages: ['en'],
    languagesDefault: 'en',
  };

  React.useEffect(() => {
    const userLocale = navigator.language.split('-')[0];

    if (!locale && data?.site && data.site.consent.languages.includes(userLocale)) {
      setLocale(userLocale as SupportedLanguages);
    }
  }, [data?.site?.consent?.languages]);

  return {
    loading,
    error: !!error,
    consent: data?.site?.consent || fallback,
    locale,
    setLocale,
  };
};
