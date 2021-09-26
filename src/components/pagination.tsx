import React from 'react';
import type { FC } from 'react';
import { Button } from 'components/button';
import ReactPagination from 'rc-pagination';

interface Props extends React.HTMLAttributes<HTMLUListElement> {
  currentPage: number;
  pageSize: number;
  total: number;
  setPage: (page: number) => void;
}

interface RenderItemProps {
  page: number;
  type: string;
}

const RenderItem: FC<RenderItemProps> = ({ page, type }) => {
  switch(type) {
    case 'prev':
      return (
        <Button className='back'>
          <i className='ri-arrow-drop-left-line' />
        </Button>
      );
    case 'next':
      return (
        <Button className='forward'>
          <i className='ri-arrow-drop-right-line' />
        </Button>
      );
    case 'jump-next':
    case 'jump-prev':
      return (
        <Button className='blank'>
          ...
        </Button>
      );
    case 'page':
      return (
        <Button>
          {page}
        </Button>
      );
    default:
      return null;
  }
}

export const Pagination: FC<Props> = ({ currentPage, pageSize, total, setPage }) => {
  if (total <= pageSize) {
    // Usuall the pagination sits along side the page size, if this
    // doesn't render anything at all, then the space-between flex
    // will mean that the page-size will render on the left which 
    // looks crap
    return <span />;
  }

  return (
    <ReactPagination
      current={currentPage}
      pageSize={pageSize}
      total={total}
      onChange={(page) => setPage(page - 1)}
      itemRender={(page, type) => (
        <RenderItem 
          page={page} 
          type={type}
        />
      )}
    />
  );
};
