import React from 'react';
import type { FC } from 'react';
import Link from 'next/link';
import { sum } from 'lodash';
import { AreaChart, Area, ResponsiveContainer, Tooltip } from 'recharts';
import { Icon } from 'components/icon';
import { Label } from 'components/label';
import { DashboardChart } from 'components/sites/dashboard/dashboard-chart';
import { DashboardErrorsChartTooltip } from 'components/sites/dashboard/dashboard-errors-chart-tooltip';
import { TableWrapper, Table, Row, Cell } from 'components/table';
import { formatResultsForGroupType } from 'lib/charts-v2';
import type { Site, ErrorsCount } from 'types/graphql';
import type { Dashboard } from 'types/dashboard';
import type { TimePeriod } from 'types/common';
import { Illustration } from 'components/illustration';

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
            Errors
          </Link>
        </h5>
        {hasErrors && (
          <h3>{totalErrors}</h3>
        )}
      </div>
      {!hasErrors && (
        <div className='dashboard-empty-state'>
          <Illustration illustration='illustration-18' height={180} width={162} alt='Illustration to represent the empty errors page' />
          <p>Your site has no errors for the time period you&apos;ve selected</p>
        </div>
      )}
      {hasErrors && (
        <>
          <DashboardChart>
            <ResponsiveContainer>
              <AreaChart data={results} margin={{ top: 1, left: 1, right: 1, bottom: 1 }}>
                {dashboard.errorsCounts.items.map(count => (
                  <Area 
                    key={count.dateKey}
                    dataKey='count'
                    fillOpacity={1}
                    stroke='var(--rose-500)'
                    strokeWidth={2}
                    fill='var(--peach-200)'
                    type='monotone'
                  />
                ))}

                <Tooltip content={DashboardErrorsChartTooltip} />
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
                      {error.errorCount}
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
