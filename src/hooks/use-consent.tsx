import { useQuery } from '@apollo/client';
import { GET_CONSENT_QUERY } from 'data/consent/queries';
import type { Consent } from 'types/graphql';
import { useSiteId } from 'hooks/use-site-id';

interface UseConsent {
  loading: boolean;
  error: boolean;
  consent: Consent;
}

export const useConsent = (): UseConsent => {
  const siteId = useSiteId();

  const { loading, error, data } = useQuery(GET_CONSENT_QUERY, {
    variables: {
      siteId,
    },
    skip: !siteId,
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
