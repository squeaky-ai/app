import { useQuery } from '@apollo/client';
import { GET_PLAN_QUERY } from 'data/sites/queries';
import type { SitesPlan } from 'types/graphql';
import { useSiteId } from './use-site-id';

interface UsePlan {
  loading: boolean;
  error: boolean;
  plan: SitesPlan;
}

export const usePlan = (): UsePlan => {
  const siteId = useSiteId();

  const { loading, error, data } = useQuery(GET_PLAN_QUERY, {
    variables: {
      siteId,
    },
    skip: !siteId,
  });

  const fallback: SitesPlan = {
    id: '',
    name: 'Free',
    planId: '',
    deprecated: false,
    free: true,
    enterprise: false,
    exceeded: false,
    invalid: false,
    maxMonthlyRecordings: 500,
    dataStorageMonths: 6,
    responseTimeHours: 168,
    auditTrailEnabled: false,
    privateInstanceEnabled: false,
    ssoEnabled: false,
    notes: '',
    support: [],
    featuresEnabled: [],
    teamMemberLimit: null,
    currentMonthRecordingsCount: 0,
    fractionalUsage: 0,
  };

  return {
    loading,
    error: !!error,
    plan: data ? data.site.plan : fallback
  };
};
