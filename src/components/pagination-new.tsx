import React from 'react';
import type { FC } from 'react';
import { Button } from 'components/button';
import { Icon } from 'components/icon';

interface Props extends React.HTMLAttributes<HTMLUListElement> {
  currentPage: number;
  pageSize: number;
  total: number;
  scrollToTop?: boolean;
  setPage: (page: number) => void;
}


export const Pagination: FC<Props> = ({ currentPage, pageSize, total, setPage, scrollToTop = true }) => {
  const page = currentPage - 1;

  const start = (page * pageSize) + 1;
  const end = (page * pageSize) + pageSize;

  const handlePageChange = (page: number) => {
    setPage(page);

    if (scrollToTop) {
      setTimeout(() => {
        document
          .getElementById('main')
          .scrollTo({ top: 0, behavior: 'smooth' });
      }, 250);
    }
  };

  return (
    <div className='rc-pagination pagination'>
      <div>
        <p>{start} - {end} of {total}</p>
      </div>
      <div className='actions'>
        <Button className='quaternary' onClick={() => handlePageChange(currentPage - 1)} disabled={page === 0}>
          <Icon name='arrow-left-s-line' />
        </Button>
        <Button className='quaternary' onClick={() => handlePageChange(currentPage + 1)} disabled={page >= Math.floor(total / pageSize)}>
          <Icon name='arrow-right-s-line' />
        </Button>
      </div>
    </div>
  );
};
