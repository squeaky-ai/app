import React from 'react';
import type { FC } from 'react';
import { sum, slice, orderBy } from 'lodash';
import { Table, Row, Cell } from 'components/table';
import type { AnalyticsPage } from 'types/analytics';

interface Props {
  pages: AnalyticsPage[];
}

export const AnalyticsPages: FC<Props> = ({ pages }) => {
  const total = sum(pages.map(p => p.count));

  const percentage = (count: number) => Number(((count / total) * 100).toFixed(2));

  const results = orderBy(slice(pages, 0, 10), 'count', 'desc');

  return (
    <Table>
      <Row head>
        <Cell>Page</Cell>
        <Cell>Views</Cell>
        <Cell>Average time on page</Cell>
      </Row>
      {results.map(page => (
        <Row key={page.path}>
          <Cell>{page.path}</Cell>
          <Cell><b>{page.count}</b> <span className='percentage'>({percentage(page.count)}%)</span></Cell>
          <Cell>-</Cell>
        </Row>
      ))}
    </Table>
  );
};
