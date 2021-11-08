import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import { Button } from 'components/button';
import type { PageSortBy } from 'types/visitor';
import type { RecordingSortBy } from 'types/recording';
import type { VisitorSortBy } from 'types/visitor';

interface Props {
  name: string;
  order: RecordingSortBy | VisitorSortBy | PageSortBy | string;
  onAsc: VoidFunction;
  onDesc: VoidFunction;
}

export const Sort: FC<Props> = ({ name, order, onAsc, onDesc }) => {
  const key = order
    .replace('__desc', '')
    .replace('__asc', '')
    .toLowerCase();

  const direction = order.includes('asc') ? 'asc' : 'desc';

  const handleClick = () => {
    if (key === name) {
      direction === 'asc' ? onDesc() : onAsc();
    } else {
      onAsc();
    }
  };

  return (
    <span className={classnames('sort', order.toLowerCase())}>
      <Button onClick={handleClick} className={classnames(key === name ? direction : '', { active: key === name })}>
        <i className='ri-arrow-up-line' />
      </Button>
    </span>
  );
};
