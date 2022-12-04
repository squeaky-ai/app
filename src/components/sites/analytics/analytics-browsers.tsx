import React from 'react';
import type { FC } from 'react';
import { Browser } from 'components/browser';
import { Card } from 'components/card';
import { Table, Row, Cell } from 'components/table';
import { FiltersVisitorsLink } from '../filters/common/filters-visitors-link';
import { Sort } from 'components/sort';
import { FiltersRecordingsLink } from 'components/sites/filters/common/filters-recordings-link';
import { Pagination } from 'components/pagination';
import { AnalyticsBrowsers as AnalyticsBrowsersType, AnalyticsBrowsersSort } from 'types/graphql';
import { percentage } from 'lib/maths';

interface Props {
  browsers: AnalyticsBrowsersType;
  sort: AnalyticsBrowsersSort;
  page: number;
  setPage: (page: number) => void;
  setSort: (sort: AnalyticsBrowsersSort) => void;
}

export const AnalyticsBrowsers: FC<Props> = ({ 
  page,
  sort,
  browsers,
  setPage,
  setSort,
}) => (
  <>
    <Card>
      <Table>
        <Row head>
          <Cell>Browser</Cell>
          <Cell>
            Visitors
            <Sort
              name='count'
              onAsc={() => setSort(AnalyticsBrowsersSort.CountAsc)}
              onDesc={() => setSort(AnalyticsBrowsersSort.CountDesc)}
              order={sort}
            />
          </Cell>
          <Cell />
        </Row>
        {browsers.items.map(browser => (
          <Row key={browser.browser}>
            <Cell>
              <Browser name={browser.browser} height={16} width={16} />
              {browser.browser}
            </Cell>
            <Cell>
              <b>{browser.count.toLocaleString()}</b> {percentage(browsers.pagination.total, browser.count)}%
            </Cell>
            <Cell className='filters-links'>
              <FiltersRecordingsLink 
                action={{ browsers: [browser.browser] }}
                hint='View recordings that used this browser'
              />

              <FiltersVisitorsLink
                action={{ browsers: [browser.browser] }}
                hint='View visitors that use this browser'
              />
            </Cell>
          </Row>
        ))}
      </Table>
    </Card>

    {browsers.items.length > browsers.pagination.pageSize && (
      <Pagination
        currentPage={page}
        pageSize={browsers.pagination.pageSize}
        total={browsers.pagination.total}
        setPage={setPage}
        scrollToTop={false}
      />
    )}
  </>
);
