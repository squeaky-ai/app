import React from 'react';
import type { FC } from 'react';
import Link from 'next/link';
import { orderBy } from 'lodash';
import { AreaChart, Area, ResponsiveContainer, Tooltip as TooltipChart } from 'recharts';
import { Icon } from 'components/icon';
import { Pill } from 'components/pill';
import { Tooltip } from 'components/tooltip';
import { Label } from 'components/label';
import { ActiveVisitors } from 'components/sites/active-visitors';
import { DashboardChart } from 'components/sites/dashboard/dashboard-chart';
import { DashboardVisitorsChartTooltip } from 'components/sites/dashboard/dashboard-visitors-chart-tooltip';
import { TableWrapper, Table, Row, Cell } from 'components/table';
import { toNiceDate } from 'lib/dates';
import { formatResultsForGroupType } from 'lib/charts-v2';
import type { Site, AnalyticsVisitor } from 'types/graphql';
import type { Dashboard } from 'types/dashboard';
import type { TimePeriod } from 'types/common';

interface Props {
  site: Site;
  dashboard: Dashboard;
  period: TimePeriod;
}

export const DashboardVisitors: FC<Props> = ({ site, dashboard, period }) => {
  const hasVisitors = dashboard.visitorsCount.total > 0;

  const results = formatResultsForGroupType<Pick<AnalyticsVisitor, 'allCount' | 'dateKey'>>(dashboard.visitors, period, { allCount: 0 }).map(d => ({
    dateKey: d.dateKey,
    count: d.allCount,
  }));

  return (
    <>
      <div className='heading active-users-heading'>
        <h5>
          <Icon name='group-line' />
          <Link href={`/sites/${site.id}/visitors`}>
            Visitors
          </Link>
        </h5>
        <Tooltip portalClassName='active-users-portal' button={
          <Pill className='small active-users'>
            <Icon name='flashlight-line' />
            <ActiveVisitors />
          </Pill>
        }>
          Live visitors
        </Tooltip>
      </div>
      {!hasVisitors && (
        <div className='dashboard-empty-state'>
          <Icon name='time-line' />
          <p>No data available</p>
        </div>
      )}
      {hasVisitors && (
        <>
          <DashboardChart>
            <ResponsiveContainer>
              <AreaChart data={results} margin={{ top: 1, left: 1, right: 1, bottom: 1 }}>
                {dashboard.visitors.items.map(count => (
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

                <TooltipChart content={DashboardVisitorsChartTooltip} />
              </AreaChart>
            </ResponsiveContainer>
          </DashboardChart>
          <div className='heading'>
            <h3>{dashboard.visitorsCount.total.toLocaleString()}</h3>
            <Pill className='medium tertiary'>{(dashboard.visitorsCount.new).toLocaleString()} New</Pill>
            <Pill className='medium secondary'>{(dashboard.visitorsCount.total - dashboard.visitorsCount.new).toLocaleString()} Existing</Pill>
          </div>
          <Label>Most active</Label>
          <TableWrapper>
            <Table>
              {orderBy(dashboard.visitorsHighlights.active, v => v.recordingCount.total, 'desc').map(visitor => (
                <Row key={visitor.id}>
                  <Cell>
                    <Icon name='user-line' />
                    <Link href={`/sites/${site.id}/visitors/${visitor.id}`}>
                      {visitor.visitorId}
                    </Link>
                  </Cell>
                  <Cell>{visitor.recordingCount.total} sessions</Cell>
                </Row>
              ))}
            </Table>
          </TableWrapper>
          <Label>Newest</Label>
          <TableWrapper>
            <Table>
              {dashboard.visitorsHighlights.newest.map(visitor => (
                <Row key={visitor.id}>
                  <Cell>
                    <Icon name='user-line' />
                    <Link href={`/sites/${site.id}/visitors/${visitor.id}`}>
                      {visitor.visitorId}
                    </Link>
                  </Cell>
                  <Cell>{toNiceDate(visitor.createdAt)}</Cell>
                </Row>
              ))}
            </Table>
          </TableWrapper>
        </>
      )}
    </>
  );
};
