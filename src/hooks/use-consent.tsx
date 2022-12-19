import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { GET_CONSENT_QUERY } from 'data/consent/queries';
import type { Consent } from 'types/graphql';

interface UseConsent {
  loading: boolean;
  error: boolean;
  consent: Consent;
}

export const useConsent = (): UseConsent => {
  const router = useRouter();

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

  return {
    loading,
    error: !!error,
    consent: data?.site?.consent || fallback,
  };
};
