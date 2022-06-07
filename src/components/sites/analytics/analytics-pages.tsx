import React from 'react';
import type { FC } from 'react';
import { Table, Row, Cell } from 'components/table';
import { toHoursMinutesAndSeconds } from 'lib/dates';
import { Pagination } from 'components/pagination';
import { Tooltip } from 'components/tooltip';
import { FiltersVisitorsLink } from 'components/sites/filters/common/filters-visitors-link';
import { FiltersRecordingsLink } from 'components/sites/filters/common/filters-recordings-link';
import type { AnalyticsPages as AnalyticsPagesType } from 'types/graphql';

interface Props {
  pages: AnalyticsPagesType;
  page: number;
  setPage: (page: number) => void;
}

export const AnalyticsPages: FC<Props> = ({ pages, page, setPage }) => (
  <>
    <Table>
      <Row head>
        <Cell>Page</Cell>
        <Cell>Views</Cell>
        <Cell>Unique views</Cell>
        <Cell>Average time on page</Cell>
        <Cell>Bounce rate</Cell>
        <Cell>Exit rate</Cell>
        <Cell />
      </Row>
      {pages.items.map(page => (
        <Row key={page.url}>
          <Cell>
            <Tooltip button={page.url} fluid>
              {page.url}
            </Tooltip>
          </Cell>
          <Cell><b>{page.viewCount.toLocaleString()}</b> <span className='percentage'>({page.viewPercentage.toFixed(2)}%)</span></Cell>
          <Cell><b>{page.uniqueViewCount.toLocaleString()}</b> <span className='percentage'>({page.uniqueViewPercentage.toFixed(2)}%)</span></Cell>
          <Cell>{toHoursMinutesAndSeconds(page.averageDuration)}</Cell>
          <Cell>{page.bounceRatePercentage.toFixed(2)}%</Cell>
          <Cell>{page.exitRatePercentage.toFixed(2)}%</Cell>
          <Cell className='filters-links'>
            <FiltersRecordingsLink 
              action={{ visitedPages: [page.url] }}
              hint='View recordings that visited this page'
            />

            <FiltersVisitorsLink 
              action={{ visitedPages: [page.url] }}
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

