import React from 'react';
import type { FC } from 'react';
import { range, uniq } from 'lodash';
import { format, subMonths } from 'date-fns';
import { useResize } from 'hooks/use-resize';
import { DeviceWidths } from 'data/common/constants';
import { Chart } from 'components/sites/chart';
import { SiteBundlesStatsChartTooltip } from 'components/admin/site-bundles-stats-chart-tooltip';
import type { AdminSite, AdminSiteBundleStatsRecordingCount } from 'types/graphql';

interface Props {
  sites: AdminSite[];
  counts: AdminSiteBundleStatsRecordingCount[];
}

export const SiteBundlesStatsChart: FC<Props> = ({ sites, counts }) => {
  const { width } = useResize();

  const data = (() => {
    const now = new Date();
  
    const results = range(0, 11).map(month => {
      const thisMonth = subMonths(now, month);

      const matches = counts
        .filter(count => count.dateKey === format(thisMonth, 'yyyy/MM'))
        .reduce((acc, match) => {
          return { ...acc, [`site-id-${match.siteId}`]: match.count };
        }, {});

      return {
        ...matches,
        dateKey: format(thisMonth, 'MMM'),
      }
    });

    return results.reverse();
  })();

  const siteIds = uniq(counts.map(count => count.siteId));

  const items = siteIds.map((id => ({ dataKey: `site-id-${id}` })));

  return (
    <div className='chart-wrapper'>
      <Chart
        admin
        data={data}
        tooltip={props => <SiteBundlesStatsChartTooltip sites={sites} {...props} />}
        scale='auto'
        chartType='bar'
        items={items}
        xAxisProps={{
          interval: width > DeviceWidths.DESKTOP ? 0 : 'preserveStartEnd',
        }}
      />
    </div>
  );
};
