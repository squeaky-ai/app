import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import { range } from 'lib/utils';
import { Button } from 'components/button';

interface Props extends React.HTMLAttributes<HTMLUListElement> {
  page: number;
  pageCount: number;
  setPage: (page: number) => void;
}

export const Pagination: FC<Props> = ({ className, page, pageCount, setPage }) => {
  return (
    <ul className={classnames('pagination', className)}>
      <li>
        <Button className='back' disabled={page === 0} onClick={() => setPage(page - 1)}>
          <i className='ri-arrow-drop-left-line' />
        </Button>
      </li>
      {range(pageCount).map(i => (
        <li key={i}>
          <Button className={classnames({ active: i === page })} disabled={page === i}  onClick={() => setPage(i)}>
            {i + 1}
          </Button>
        </li>
      ))}
      <li>
        <Button className='forward' disabled={(pageCount - 1) <= page} onClick={() => setPage(page + 1)}>
          <i className='ri-arrow-drop-right-line' />
        </Button>
      </li>
    </ul>  
  );
};
