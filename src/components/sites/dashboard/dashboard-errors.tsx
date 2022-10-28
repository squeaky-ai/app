import React from 'react';
import type { FC } from 'react';
import Link from 'next/link';
import { Icon } from 'components/icon';
import { Label } from 'components/label';
import { DashboardChart } from 'components/sites/dashboard/dashboard-chart';
import { TableWrapper, Table, Row, Cell } from 'components/table';
import type { Site } from 'types/graphql';
import type { Dashboard } from 'types/dashboard';

interface Props {
  site: Site;
  dashboard: Dashboard;
}

export const DashboardErrors: FC<Props> = ({ site, dashboard }) => {
  const hasErrors = dashboard.errors.length > 0;

  return (
    <>
      <div className='heading'>
        <h5>
          <Icon name='error-warning-line' />
          <Link href={`/sites/${site.id}/errors`}>
            <a>Errors</a>
          </Link>
        </h5>
        <h3>TODO</h3>
      </div>
      {!hasErrors && (
        <div className='dashboard-empty-state'>
          <Icon name='time-line' />
          <p>No data available</p>
        </div>
      )}
      {hasErrors && (
        <>
          <DashboardChart />
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
                  <Cell>{error.errorCount}%</Cell>
                </Row>
              ))}
            </Table>
          </TableWrapper>
        </>
      )}
    </>
  );
};
