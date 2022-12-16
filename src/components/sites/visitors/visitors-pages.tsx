import React from 'react';
import type { FC } from 'react';
import Link from 'next/link';
import { Sort } from 'components/sort';
import { Pagination } from 'components/pagination';
import { Table, Row, Cell } from 'components/table';
import { toTimeString } from 'lib/dates';
import { Site, VisitorsPagesSort } from 'types/graphql';
import type { Visitor } from 'types/graphql';

interface Props {
  site: Site;
  visitor: Visitor;
  sort: VisitorsPagesSort;
  page: number;
  setPage: (value: number) => void;
  setSort: (sort: VisitorsPagesSort) => void;
}

export const VisitorPages: FC<Props> = ({ site, visitor, page, sort, setPage, setSort }) => {
  const { items, pagination } = visitor.pages;

  return (
    <>
      <Table className='visitor-pages-table'>
        <Row head>
          <Cell>
            Page
          </Cell>
          <Cell>
            Views
            <Sort 
              name='views_count' 
              order={sort} 
              onAsc={() => setSort(VisitorsPagesSort.ViewsCountAsc)} 
              onDesc={() => setSort(VisitorsPagesSort.ViewsCountDesc)} 
            />
          </Cell>
          <Cell>
            Average time on page
            <Sort 
              name='average_time_on_page' 
              order={sort} 
              onAsc={() => setSort(VisitorsPagesSort.AverageTimeOnPageAsc)} 
              onDesc={() => setSort(VisitorsPagesSort.AverageTimeOnPageDesc)} 
            />
          </Cell>
        </Row>
        {items.map(item => (
          <Row key={item.pageView}>
            <Cell>
              <Link href={`/sites/${site.id}/analytics/page/traffic?url=${encodeURIComponent(item.pageView)}`}>
                {item.pageView}
              </Link>
            </Cell>
            <Cell><b>{item.pageViewCount}</b></Cell>
            <Cell>{toTimeString(item.averageTimeOnPage)}</Cell>
          </Row>
        ))}
      </Table>

      <Pagination 
        currentPage={page} 
        pageSize={pagination.pageSize}
        total={pagination.total}
        setPage={setPage}
      />
    </>
  );
};
