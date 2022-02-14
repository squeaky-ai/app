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
    name: '',
    type: 0,
    exceeded: false,
    billingValid: true,
    recordingsLimit: 500,
    recordingsLocked: 0,
    visitorsLocked: 0,
  };

  return {
    loading,
    error: !!error,
    plan: data ? data.site.plan : fallback
  };
};
