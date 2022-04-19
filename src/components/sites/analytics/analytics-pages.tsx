import React from 'react';
import type { FC } from 'react';
import { Table, Row, Cell, RowSkeleton } from 'components/table';
import { toHoursMinutesAndSeconds } from 'lib/dates';
import { Pagination } from 'components/pagination';
import { Tooltip } from 'components/tooltip';
import { FiltersVisitorsLink } from 'components/sites/filters/common/filters-visitors-link';
import { FiltersRecordingsLink } from 'components/sites/filters/common/filters-recordings-link';
import type { AnalyticsPages as AnalyticsPagesType } from 'types/graphql';

interface Props {
  pages: AnalyticsPagesType;
  page: number;
  loading: boolean;
  setPage: (page: number) => void;
}

export const AnalyticsPages: FC<Props> = ({ pages, page, loading, setPage }) => (
  <>
    <Table>
      <Row head>
        <Cell>Page</Cell>
        <Cell>Views</Cell>
        <Cell>Average time on page</Cell>
        <Cell />
      </Row>
      {loading && (
        <RowSkeleton count={10} />
      )}
      {!loading && pages.items.map(page => (
        <Row className='has-skeleton' key={page.path}>
          <Cell>
            <Tooltip button={page.path} fluid>
              {page.path}
            </Tooltip>
          </Cell>
          <Cell><b>{page.count.toLocaleString()}</b> <span className='percentage'>({page.percentage.toFixed(2)}%)</span></Cell>
          <Cell>{toHoursMinutesAndSeconds(page.avg)}</Cell>
          <Cell className='filters-links'>
            <FiltersRecordingsLink 
              action={{ visitedPages: [page.path] }}
              hint='View recordings that visited this page'
            />

            <FiltersVisitorsLink 
              action={{ visitedPages: [page.path] }}
              hint='View visitors that visited this page'
            />
          </Cell>
        </Row>
      ))}
    </Table>

    <Pagination
      currentPage={page}
      pageSize={pages.pagination.pageSize}
      total={pages.pagination.total}
      setPage={setPage}
      scrollToTop={false}
    />
  </>
);

