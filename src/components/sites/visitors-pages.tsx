import React from 'react';
import type { FC } from 'react';
import { toTimeString } from 'lib/dates';
import { Sort } from 'components/sort';
import { Pagination } from 'components/pagination';
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

      <div className='table visitor-pages-table'>
        <table cellSpacing='0'>
          <thead>
            <tr>
              <th>Page</th>
              <th>Views<Sort name='views_count' order={sort} onAsc={() => setSort('VIEWS_COUNT_ASC')} onDesc={() => setSort('VIEWS_COUNT_DESC')} /></th>
              <th>Average time on page</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item.pageView}>
                <td>{item.pageView}</td>
                <td><b>{item.pageViewCount}</b></td>
                <td>{toTimeString(item.averageTimeOnPage)}</td>
                <td />
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination 
        currentPage={page} 
        pageSize={pagination.pageSize}
        total={pagination.total}
        setPage={setPage}
      />
    </>
  );
};
