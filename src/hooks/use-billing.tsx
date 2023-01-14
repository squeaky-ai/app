import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { GET_BILLING_QUERY } from 'data/sites/queries';
import type { Billing } from 'types/billing';
import type { DecoratedPlan, Site } from 'types/graphql';

interface UseBilling {
  loading: boolean;
  error: boolean;
  billing: Billing;
}

export const useBilling = (): UseBilling => {
  const router = useRouter();

  const { data, loading, error } = useQuery<{ site: Site, plans: DecoratedPlan[] }>(GET_BILLING_QUERY, {
    variables: { 
      siteId: router.query.site_id as string,
    }
  });

  const fallback: Billing = {
    billing: null,
    plan: null,
    plans: [],
  };

  return {
    loading,
    error: !!error,
    billing: data 
      ? { billing: data.site.billing, plan: data.site.plan, plans: data.plans } 
      : fallback
  };
};
