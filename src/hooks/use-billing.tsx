import { useQuery } from '@apollo/client';
import { GET_BILLING_QUERY } from 'data/sites/queries';
import type { Billing } from 'types/billing';
import type { DecoratedPlan, Site } from 'types/graphql';
import { useSiteId } from 'hooks/use-site-id';

interface UseBilling {
  loading: boolean;
  error: boolean;
  billing: Billing;
}

export const useBilling = (): UseBilling => {
  const siteId = useSiteId();

  const { data, loading, error } = useQuery<{ site: Site, plans: DecoratedPlan[] }>(GET_BILLING_QUERY, {
    variables: { 
      siteId,
    }
  });

  const fallback: Billing = {
    billing: null,
    plan: null,
    plans: [],
    providerAuth: null,
  };

  return {
    loading,
    error: !!error,
    billing: data 
      ? { billing: data.site.billing, plan: data.site.plan, plans: data.plans, providerAuth: data.site.providerAuth } 
      : fallback
  };
};
