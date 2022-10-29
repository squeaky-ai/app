import React from 'react';
import type { FC } from 'react';
import { Icon } from 'components/icon';
import { Label } from 'components/label';
import { TableWrapper, Table, Row, Cell } from 'components/table';
import type { Site } from 'types/graphql';
import type { Dashboard } from 'types/dashboard';

interface Props {
  site: Site;
  dashboard: Dashboard;
}

export const DashboardExitRate: FC<Props> = ({ dashboard }) => {
  const hasExitRate = dashboard.exits.length > 0;

  return (
    <>
      <div className='heading'>
        <h5>
          <Icon name='logout-box-line' />
          Exit Rate
        </h5>
      </div>
      {!hasExitRate && (
        <div className='dashboard-empty-state'>
          <Icon name='time-line' />
          <p>No data available</p>
        </div>
      )}
      {hasExitRate && (
        <>
          <Label>Highest exit rates</Label>
          <TableWrapper>
            <Table>
              {dashboard.exits.map(bounce => (
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
