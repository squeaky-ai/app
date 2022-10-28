import React from 'react';
import type { FC } from 'react';
import Link from 'next/link';
import { sum } from 'lodash';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import { Icon } from 'components/icon';
import { Label } from 'components/label';
import { DashboardChart } from 'components/sites/dashboard/dashboard-chart';
import { TableWrapper, Table, Row, Cell } from 'components/table';
import { formatResultsForGroupType } from 'lib/charts-v2';
import type { Site, ErrorsCount } from 'types/graphql';
import type { Dashboard } from 'types/dashboard';
import type { TimePeriod } from 'types/common';

interface Props {
  site: Site;
  dashboard: Dashboard;
  period: TimePeriod;
}

export const DashboardErrors: FC<Props> = ({ site, dashboard, period }) => {
  const hasErrors = dashboard.errors.length > 0;
  const totalErrors = sum(dashboard.errorsCounts.items.map(e => e.count));

  const results = formatResultsForGroupType<ErrorsCount>(dashboard.errorsCounts, period, { count: 0 }).map(d => ({
    dateKey: d.dateKey,
    count: d.count,
  }));

  return (
    <>
      <div className='heading'>
        <h5>
          <Icon name='error-warning-line' />
          <Link href={`/sites/${site.id}/errors`}>
            <a>Errors</a>
          </Link>
        </h5>
        {hasErrors && (
          <h3>{totalErrors}</h3>
        )}
      </div>
      {!hasErrors && (
        <div className='dashboard-empty-state'>
          <Icon name='time-line' />
          <p>No data available</p>
        </div>
      )}
      {hasErrors && (
        <>
          <DashboardChart>
            <ResponsiveContainer>
              <AreaChart data={results} margin={{ top: 0, left: 0, right: 0, bottom: 0 }}>
                {dashboard.errorsCounts.items.map(count => (
                  <Area 
                    key={count.dateKey}
                    dataKey='count'
                    fillOpacity={1}
                    stroke='var(--rose-500)'
                    strokeWidth={2}
                    fill='var(--peach-200)'
                  />
                ))}
              </AreaChart>
            </ResponsiveContainer>
          </DashboardChart>
          <Label>Most frequent</Label>
          <TableWrapper>
            <Table>
              <Row className='head'>
                <Cell>Error</Cell>
                <Cell>Events</Cell>
              </Row>
              {dashboard.errors.map(error => (
                <Row key={error.message}>
                  <Cell>{error.message}</Cell>
                  <Cell>
                    <Link href={`/sites/${site.id}/errors/${error.id}`}>
                      <a>{error.errorCount}</a>
                    </Link>
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
