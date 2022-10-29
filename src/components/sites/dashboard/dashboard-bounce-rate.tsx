import React from 'react';
import type { FC } from 'react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import { Icon } from 'components/icon';
import { Trend } from 'components/trend';
import { Label } from 'components/label';
import { DashboardChart } from 'components/sites/dashboard/dashboard-chart';
import { TableWrapper, Table, Row, Cell } from 'components/table';
import { formatResultsForGroupType } from 'lib/charts-v2';
import { percentage } from 'lib/maths';
import type { AnalyticsBounceCount, Site } from 'types/graphql';
import type { Dashboard } from 'types/dashboard';
import type { TimePeriod } from 'types/common';

interface Props {
  site: Site;
  dashboard: Dashboard;
  period: TimePeriod;
}

export const DashboardBounceRate: FC<Props> = ({ dashboard, period }) => {
  const hasBounceRate = dashboard.bounces.length > 0;

  const results = formatResultsForGroupType<AnalyticsBounceCount>(dashboard.bounceCounts, period, { bounceRateCount: 0, viewCount: 0 }).map(d => ({
    dateKey: d.dateKey,
    count: percentage(d.viewCount, d.bounceRateCount),
  }));

  return (
    <>
      <div className='heading'>
        <h5>
          <Icon name='arrow-left-right-line' />
          Bounce Rate
        </h5>
      </div>
      {!hasBounceRate && (
        <div className='dashboard-empty-state'>
          <Icon name='time-line' />
          <p>No data available</p>
        </div>
      )}
      {hasBounceRate && (
        <>
          <DashboardChart>
            <ResponsiveContainer>
              <AreaChart data={results} margin={{ top: 0, left: 0, right: 0, bottom: 0 }}>
                {dashboard.bounceCounts.items.map(count => (
                  <Area 
                    key={count.dateKey}
                    dataKey='count'
                    fillOpacity={1}
                    stroke='var(--blue-500)'
                    strokeWidth={2}
                    fill='var(--blue-50)'
                  />
                ))}
              </AreaChart>
            </ResponsiveContainer>
          </DashboardChart>
          <div className='heading'>
            <h3>{dashboard.bounceRate.average}%</h3>
            <Trend direction={dashboard.bounceRate.trend >= 0 ? 'up' : 'down'} value={`${dashboard.bounceRate.trend}%`} />
          </div>
          <Label>Highest bounce rates</Label>
          <TableWrapper>
            <Table>
              {dashboard.bounces.map(bounce => (
                <Row key={bounce.url}>
                  <Cell>{bounce.url}</Cell>
                  <Cell>{bounce.percentage.toFixed(2)}%</Cell>
                </Row>
              ))}
            </Table>
          </TableWrapper>
        </>
      )}
    </>
  );
};
