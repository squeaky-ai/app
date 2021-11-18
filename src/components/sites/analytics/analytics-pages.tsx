import React from 'react';
import type { FC } from 'react';
import { sum, slice, orderBy } from 'lodash';
import { Table, Row, Cell } from 'components/table';
import { toHoursMinutesAndSeconds } from 'lib/dates';
import { Pagination } from 'components/pagination';
import { Tooltip } from 'components/tooltip';
import { percentage } from 'lib/maths';
import type { AnalyticsPage } from 'types/analytics';

interface Props {
  pages: AnalyticsPage[];
}

export const AnalyticsPages: FC<Props> = ({ pages }) => {
  const [page, setPage] = React.useState<number>(0);

  const total = sum(pages.map(p => p.count));

  const limit = 10;
  const offset = page * limit;
  const sorted = orderBy(pages, 'count', 'desc');

  return (
    <>
      <Table>
        <Row head>
          <Cell>Page</Cell>
          <Cell>Views</Cell>
          <Cell>Average time on page</Cell>
        </Row>
        {slice(sorted, offset, offset + limit).map(page => (
          <Row key={page.path}>
            <Cell>
              <Tooltip button={page.path} fluid>
                {page.path}
              </Tooltip>
            </Cell>
            <Cell><b>{page.count}</b> <span className='percentage'>({percentage(total, page.count)}%)</span></Cell>
            <Cell>{toHoursMinutesAndSeconds(page.avg)}</Cell>
          </Row>
        ))}
      </Table>

      <Pagination
        currentPage={page + 1}
        pageSize={10}
        setPage={setPage}
        total={pages.length}
        scrollToTop={false}
      />
    </>
  );
};
