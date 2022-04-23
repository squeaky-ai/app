import { useQuery } from '@apollo/client';
import { GET_PLAN_QUERY } from 'data/sites/queries';
import type { Site, SitesPlan } from 'types/graphql';

interface Props {
  site: Site;
}

interface UsePlan {
  loading: boolean;
  error: boolean;
  plan: SitesPlan;
}

export const usePlan = (props: Props): UsePlan => {
  const { loading, error, data } = useQuery(GET_PLAN_QUERY, {
    variables: {
      siteId: props.site.id,
    }
  });

  const fallback: SitesPlan = {
    name: 'Free',
    tier: 0,
    exceeded: false,
    invalid: false,
    maxMonthlyRecordings: 500,
    recordingsLockedCount: 0,
    visitorsLockedCount: 0,
    dataStorageMonths: 6,
    responseTimeHours: 168,
    auditTrailEnabled: false,
    privateInstanceEnabled: false,
    ssoEnabled: false,
    notes: '',
    support: [],
  };

  return {
    loading,
    error: !!error,
    plan: data ? data.site.plan : fallback
  };
};
