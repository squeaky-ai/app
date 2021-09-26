import { format } from 'date-fns';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { GET_OVERVIEW_QUERY } from 'data/overview/queries';
import type { Site } from 'types/site';
import type { Overview } from 'types/overview';
import type { TimeRange } from 'lib/dates';

interface UseOverview {
  loading: boolean;
  overview: Overview;
}

export const useOverview = (): UseOverview => {
  const router = useRouter();

  const now = new Date();

  const range: TimeRange = {
    fromDate: '2021-08-01 ', // earliest thing in the db
    toDate: format(now, 'yyyy-MM-dd')
  };

  const { data, loading, previousData } = useQuery<{ site: Site }>(GET_OVERVIEW_QUERY, {
    variables: {
      siteId: router.query.site_id as string,
      ...range,
    }
  });

  const fallback: Overview = {
    notes: {
      items: []
    },
    analytics: {
      visitorsCount: {
        total: 0,
        new: 0,
      },
      pageViews: 0,
      recordingsCount: {
        total: 0,
        new: 0,
      },
    },
    recordingLatest: null,
  };

  return {
    loading,
    overview: (data
      ? data.site
      : previousData ? previousData.site : fallback) as Overview
  };
};
