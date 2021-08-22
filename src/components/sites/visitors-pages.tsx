import React from 'react';
import type { FC } from 'react';
import { toTimeString } from 'lib/dates';
import { Sort } from 'components/sort';
import { Pagination } from 'components/pagination';
import { Table, Row, Cell } from 'components/table';
import type { Visitor } from 'types/visitor';
import type { PageSortBy } from 'types/visitor';

interface Props {
  visitor: Visitor;
  sort: PageSortBy;
  page: number;
  setPage: (value: number) => void;
  setSort: (sort: PageSortBy) => void;
}

export const VisitorPages: FC<Props> = ({ visitor, page, sort, setPage, setSort }) => {
  const { items, pagination } = visitor.pages;

  return (
    <>
      <h4 className='sub-heading'>Pages</h4>

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
              onAsc={() => setSort('VIEWS_COUNT_ASC')} 
              onDesc={() => setSort('VIEWS_COUNT_DESC')} 
            />
          </Cell>
          <Cell>
            Average time on page
          </Cell>
        </Row>
        {items.map(item => (
          <Row key={item.pageView}>
            <Cell>{item.pageView}</Cell>
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
