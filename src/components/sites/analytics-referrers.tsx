import React from 'react';
import type { FC } from 'react';
import { sum, slice, orderBy } from 'lodash';
import { Table, Row, Cell } from 'components/table';
import type { AnalyticsReferrer } from 'types/analytics';

interface Props {
  referrers: AnalyticsReferrer[];
}

export const AnalyticsReferrers: FC<Props> = ({ referrers }) => {
  const total = sum(referrers.map(p => p.count));

  const percentage = (count: number) => Number(((count / total) * 100).toFixed(2));

  const results = orderBy(slice(referrers, 0, 10), 'count', 'desc');

  return (
    <Table>
      <Row head>
        <Cell>Page</Cell>
        <Cell>Number of users</Cell>
      </Row>
      {results.map(referrer => (
        <Row key={referrer.name}>
          <Cell>{referrer.name === 'Direct' ? <>Direct <i>(none)</i></> : referrer.name}</Cell>
          <Cell><b>{referrer.count}</b> <span className='percentage'>({percentage(referrer.count)}%)</span></Cell>
        </Row>
      ))}
    </Table>
  );
};
