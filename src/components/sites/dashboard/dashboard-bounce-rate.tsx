import React from 'react';
import type { FC } from 'react';
import { Icon } from 'components/icon';
import { Trend } from 'components/trend';
import { Label } from 'components/label';
import { DashboardChart } from 'components/sites/dashboard/dashboard-chart';
import { TableWrapper, Table, Row, Cell } from 'components/table';
import type { Site } from 'types/graphql';
import type { Dashboard } from 'types/dashboard';

interface Props {
  site: Site;
  dashboard: Dashboard;
}

export const DashboardBounceRate: FC<Props> = ({ dashboard }) => {
  const hasBounceRate = dashboard.bounces.length > 0;

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
          <DashboardChart />
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
                  <Cell>{bounce.percentage}%</Cell>
                </Row>
              ))}
            </Table>
          </TableWrapper>
        </>
      )}
    </>
  );
};
