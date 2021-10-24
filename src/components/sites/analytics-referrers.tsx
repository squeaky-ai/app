import React from 'react';
import type { FC } from 'react';
import { sum, slice, orderBy } from 'lodash';
import { Table, Row, Cell } from 'components/table';
import { Pagination } from 'components/pagination';
import { percentage } from 'lib/maths';
import type { AnalyticsReferrer } from 'types/analytics';

interface Props {
  referrers: AnalyticsReferrer[];
}

export const AnalyticsReferrers: FC<Props> = ({ referrers }) => {
  const [page, setPage] = React.useState<number>(0);

  const total = sum(referrers.map(p => p.count));

  const limit = 10;
  const offset = page * limit;
  const sorted = orderBy(referrers, 'count', 'desc');

  return (
    <>
      <Table>
        <Row head>
          <Cell>Page</Cell>
          <Cell>Number of users</Cell>
        </Row>
        {slice(sorted, offset, offset + limit).map(referrer => (
          <Row key={referrer.name}>
            <Cell>{referrer.name === 'Direct' ? <>Direct <i>(none)</i></> : referrer.name}</Cell>
            <Cell><b>{referrer.count}</b> <span className='percentage'>({percentage(total, referrer.count)}%)</span></Cell>
          </Row>
        ))}
      </Table>

      <Pagination
        currentPage={page + 1}
        pageSize={10}
        setPage={setPage}
        total={referrers.length}
        scrollToTop={false}
      />
    </>
  );
};
