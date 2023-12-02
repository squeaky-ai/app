import React from 'react';
import { Card } from 'components/card';
import { Row, Table, Cell } from 'components/table';
import { SiteBundlesStatsChart } from 'components/admin/site-bundles-stats-chart';
import { SitesBundle } from 'types/graphql';

interface Props {
  bundle: SitesBundle;
}

export const SiteBundlesStats: React.FC<Props> = ({ bundle }) => (
  <Card className='site-bundles-stats'>
    <div className='left'>
      <h5>Recordings</h5>
      <SiteBundlesStatsChart sites={bundle.sites} counts={bundle.stats.recordingCounts} />
    </div>
    <div className='right recording-counts'>
      <Table>
        <Row className='head'>
          <Cell />
          <Cell>All Time</Cell>
          <Cell>Current Month</Cell>
        </Row>
        <Row>
          <Cell>Total</Cell>
          <Cell>{bundle.stats.totalAll.toLocaleString()}</Cell>
          <Cell>{bundle.stats.totalCurrentMonth.toLocaleString()}</Cell>
        </Row>
        <Row>
          <Cell>Deleted</Cell>
          <Cell>{bundle.stats.deletedAll.toLocaleString()}</Cell>
          <Cell>{bundle.stats.deletedCurrentMonth.toLocaleString()}</Cell>
        </Row>
      </Table>
    </div>
  </Card>
);
