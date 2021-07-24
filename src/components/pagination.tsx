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
  handleBack: VoidFunction;
  handleForward: VoidFunction;
  handlePage: (page: number) => void;
}

const RenderItem: FC<RenderItemProps> = ({ page, type, handleBack, handleForward, handlePage }) => {
  switch(type) {
    case 'prev':
      return (
        <Button className='back' onClick={handleBack}>
          <i className='ri-arrow-drop-left-line' />
        </Button>
      );
    case 'next':
      return (
        <Button className='forward' onClick={handleForward}>
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
        <Button onClick={() => handlePage(page)}>
          {page}
        </Button>
      );
    default:
      return null;
  }
}

export const Pagination: FC<Props> = ({ currentPage, pageSize, total, setPage }) => {
  const handleBack = () => setPage(currentPage - 1);
  
  const handleForward = () => setPage(currentPage + 1);

  const handlePage = (page: number) => setPage(page);

  return (
    <ReactPagination
      current={currentPage}
      pageSize={pageSize}
      total={total}
      itemRender={(page, type) => (
        <RenderItem 
          page={page} 
          type={type} 
          handleBack={handleBack} 
          handleForward={handleForward}
          handlePage={handlePage}
        />
      )}
    />
  );
};
