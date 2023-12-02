import { useQuery } from '@apollo/client';
import { GET_DASHBOARD_QUERY } from 'data/dashboard/queries';
import type { TimeRange } from 'types/common';
import type { Site } from 'types/graphql';
import type { Dashboard } from 'types/dashboard';
import { useSiteId } from 'hooks/use-site-id';

interface Props {
  range: TimeRange;
}

interface UseDashboard {
  loading: boolean;
  error: boolean;
  dashboard: Dashboard;
}

export const useDashboard = (props: Props): UseDashboard => {
  const [siteId, skip] = useSiteId();

  const { data, loading, error } = useQuery<{ site: Site }>(GET_DASHBOARD_QUERY, {
    variables: {
      siteId,
      ...props.range,
    },
    skip,
  });

  const fallback: Dashboard = {
    pageViews: {
      groupRange: 0,
      groupType: '',
      total: 0,
      trend: 0,
      items: [],
    },
    pages: {
      items: [],
      pagination: {
        pageSize: 0,
        total: 0,
      }
    },
    bounceRate: {
      average: 0,
      trend: 0,
    },
    bounceCounts: {
      groupRange: 0,
      groupType: '',
      items: [],
    },
    bounces: [],
    exits: [],
    visitorsCount: {
      new: 0,
      total: 0,
    },
    visitors: {
      groupRange: 0,
      groupType: '',
      items: [],
    },
    recordings: {
      groupRange: 0,
      groupType: '',
      items: [],
    },
    recordingsCount: {
      new: 0,
      total: 0,
    },
    errors: [],
    errorsCounts: {
      groupRange: 0,
      groupType: '',
      items: [],
    },
    recordingsHighlights: {
      eventful: [],
      longest: [],
    },
    visitorsHighlights: {
      active: [],
      newest: [],
    },
  };

  const dashboard: Dashboard = data ? {
    pageViews: data.site.analytics.pageViews,
    pages: data.site.analytics.pages,
    bounceRate: data.site.analytics.bounceRate,
    bounceCounts: data.site.analytics.bounceCounts,
    bounces: data.site.analytics.bounces,
    exits: data.site.analytics.exits,
    visitorsCount: data.site.analytics.visitorsCount,
    visitors: data.site.analytics.visitors,
    recordings: data.site.analytics.recordings,
    recordingsCount: data.site.analytics.recordingsCount,
    errors: data.site.errors.items,
    errorsCounts: data.site.errorsCounts,
    recordingsHighlights: data.site.recordingsHighlights,
    visitorsHighlights: data.site.visitorsHighlights,
  } : fallback;

  return {
    loading: loading || skip,
    error: !!error,
    dashboard,
  };
};
