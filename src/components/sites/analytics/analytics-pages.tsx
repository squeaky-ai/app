import React from 'react';
import type { FC } from 'react';
import { Table, Row, Cell } from 'components/table';
import { toHoursMinutesAndSeconds } from 'lib/dates';
import { Sort } from 'components/sort';
import { Pagination } from 'components/pagination';
import { Tooltip } from 'components/tooltip';
import { FiltersVisitorsLink } from 'components/sites/filters/common/filters-visitors-link';
import { FiltersRecordingsLink } from 'components/sites/filters/common/filters-recordings-link';
import { AnalyticsPagesSort } from 'types/graphql';
import type { AnalyticsPages as AnalyticsPagesType } from 'types/graphql';

interface Props {
  pages: AnalyticsPagesType;
  page: number;
  sort: AnalyticsPagesSort;
  setPage: (page: number) => void;
  setSort: (sort: AnalyticsPagesSort) => void;
}

export const AnalyticsPages: FC<Props> = ({ pages, page, sort, setPage, setSort }) => (
  <>
    <Table>
      <Row head>
        <Cell>Page</Cell>
        <Cell>
          Views
          <Sort 
            name='views' 
            order={sort} 
            onAsc={() => setSort(AnalyticsPagesSort.ViewsAsc)} 
            onDesc={() => setSort(AnalyticsPagesSort.ViewsDesc)} 
          />
        </Cell>
        <Cell>
          Average time on page
          <Sort 
            name='duration' 
            order={sort} 
            onAsc={() => setSort(AnalyticsPagesSort.DurationAsc)} 
            onDesc={() => setSort(AnalyticsPagesSort.DurationDesc)} 
          />
        </Cell>
        <Cell>
          Bounce rate
          <Sort 
            name='bounce_rate' 
            order={sort} 
            onAsc={() => setSort(AnalyticsPagesSort.BounceRateAsc)} 
            onDesc={() => setSort(AnalyticsPagesSort.BounceRateDesc)} 
          />
        </Cell>
        <Cell>
          Exit rate
          <Sort 
            name='exit_rate' 
            order={sort} 
            onAsc={() => setSort(AnalyticsPagesSort.ExitRateAsc)} 
            onDesc={() => setSort(AnalyticsPagesSort.ExitRateDesc)} 
          />
        </Cell>
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

