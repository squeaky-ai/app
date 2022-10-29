import React from 'react';
import type { FC } from 'react';
import Link from 'next/link';
import { AreaChart, Area, ResponsiveContainer, Tooltip, TooltipProps } from 'recharts';
import { Icon } from 'components/icon';
import { Label } from 'components/label';
import { Trend } from 'components/trend';
import { TableWrapper, Table, Row, Cell } from 'components/table';
import { DashboardNoData } from 'components/sites/dashboard/dashboard-no-data';
import { toHoursMinutesAndSeconds } from 'lib/dates';
import { FiltersRecordingsLink } from 'components/sites/filters/common/filters-recordings-link';
import { FiltersVisitorsLink } from 'components/sites/filters/common/filters-visitors-link';
import { DashboardChart } from 'components/sites/dashboard/dashboard-chart';
import { formatResultsForGroupType } from 'lib/charts-v2';
import type { Site, AnalyticsPageView } from 'types/graphql';
import type { Dashboard } from 'types/dashboard';
import type { TimePeriod } from 'types/common';

interface Props {
  site: Site;
  dashboard: Dashboard;
  period: TimePeriod;
}

export const DashboardPageViews: FC<Props> = ({ site, dashboard, period }) => {
  const hasPageViews = dashboard.pageViews.total > 0;

  const CustomTooltip: FC<TooltipProps<any, any>> = ({ active, payload }) => {
    if (!active || !payload?.length) return null;

    const { count } = payload[0].payload;
  
    return (
      <div className='custom-tooltip'>
        <p className='date'>Page Views</p>
        <p className='count blue'>{count}</p>
      </div>
    );
  };

  const results = formatResultsForGroupType<AnalyticsPageView>(dashboard.pageViews, period, { count: 0 }).map(d => ({
    dateKey: d.dateKey,
    count: d.count,
  }));

  return (
    <>
      <div className='heading'>
        <h5>
          <Icon name='pages-line' />
          <Link href={`/sites/${site.id}/analytics/site/traffic`}>
            <a>Page Views</a>
          </Link>
        </h5>
        {hasPageViews && (
          <div className='counts'>
            <h3>{dashboard.pageViews.total.toLocaleString()}</h3>
            <Trend direction={dashboard.pageViews.trend >= 0 ? 'up' : 'down'} value={dashboard.pageViews.trend.toLocaleString()} />            
          </div>
        )}
      </div>
      {!hasPageViews && (
        <DashboardNoData />
      )}
      {hasPageViews && (
        <>
          <DashboardChart>
            <ResponsiveContainer>
              <AreaChart data={results} margin={{ top: 1, left: 1, right: 1, bottom: 1 }}>
                {dashboard.pageViews.items.map(count => (
                  <Area 
                    key={count.dateKey}
                    dataKey='count'
                    fillOpacity={1}
                    stroke='var(--blue-500)'
                    strokeWidth={2}
                    fill='var(--blue-50)'
                    type='monotone'
                  />
                ))}

                <Tooltip content={<CustomTooltip />} />
              </AreaChart>
            </ResponsiveContainer>
          </DashboardChart>
          <Label>Most viewed</Label>
          <TableWrapper>
            <Table>
              <Row className='head'>
                <Cell>Page</Cell>
                <Cell>Views</Cell>
                <Cell>Average time on page</Cell>
                <Cell>Bounce rate</Cell>
                <Cell>Exit rate</Cell>
                <Cell />
              </Row>
              {dashboard.pages.items.map(page => (
                <Row key={page.url}>
                  <Cell>
                    <Link href={`/sites/${site.id}/analytics/page/traffic?url=${encodeURIComponent(page.url)}`}>
                      <a>{page.url}</a>
                    </Link>
                  </Cell>
                  <Cell>
                    <b>{page.viewCount.toLocaleString()}</b> <span className='percentage'>({page.viewPercentage.toFixed(2)}%)</span>
                  </Cell>
                  <Cell>
                    {toHoursMinutesAndSeconds(page.averageDuration)}
                  </Cell>
                  <Cell>
                    {page.bounceRatePercentage.toFixed(2)}%
                  </Cell>
                  <Cell>
                    {page.exitRatePercentage.toFixed(2)}%
                  </Cell>
                  <Cell>
                    <FiltersRecordingsLink
                      action={{ visitedPages: [page.url] }}
                      hint='View recordings that visited this page'
                    />

                    <FiltersVisitorsLink
                      action={{ visitedPages: [page.url] }}
                      hint='View visitors that visited this page'
                    />
                  </Cell>
                </Row>
              ))}
            </Table>
          </TableWrapper>
        </>
      )}
    </>
  );
};
