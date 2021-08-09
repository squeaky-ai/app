import { format } from 'date-fns';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { GET_OVERVIEW_QUERY } from 'data/overview/queries';
import type { Site } from 'types/site';
import type { Overview } from 'types/overview';
import type { TimeRange } from 'lib/dates';

export const useOverview = (): [boolean, Overview] => {
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
    visitors: 0,
    pageViews: 0,
    recordingsCount: 0,
  };

  const results = data
    ? data.site.analytics
    : previousData ? previousData.site.analytics : fallback;

  return [loading, results as Overview];
};
