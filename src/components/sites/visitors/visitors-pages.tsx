import React from 'react';
import type { FC } from 'react';
import { Sort } from 'components/sort';
import { Pagination } from 'components/pagination';
import { Table, Row, Cell } from 'components/table';
import { VisitorsPagesSort } from 'types/graphql';
import type { Visitor } from 'types/graphql';

interface Props {
  visitor: Visitor;
  sort: VisitorsPagesSort;
  page: number;
  setPage: (value: number) => void;
  setSort: (sort: VisitorsPagesSort) => void;
}

export const VisitorPages: FC<Props> = ({ visitor, page, sort, setPage, setSort }) => {
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
        </Row>
        {items.map(item => (
          <Row key={item.pageView}>
            <Cell>{item.pageView}</Cell>
            <Cell><b>{item.pageViewCount}</b></Cell>
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
