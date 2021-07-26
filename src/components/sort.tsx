import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import { Button } from 'components/button';
import type { SortBy } from 'types/recording';

interface Props {
  name: string;
  order: SortBy;
  onAsc: VoidFunction;
  onDesc: VoidFunction;
}

export const Sort: FC<Props> = ({ name, order, onAsc, onDesc }) => {
  const key = order
    .replace('_DESC', '')
    .replace('_ASC', '')
    .toLowerCase();

  const direction = order.includes('ASC') ? 'asc' : 'desc';

  const handleClick = () => {
    if (key === name) {
      direction === 'asc' ? onDesc() : onAsc();
    } else {
      onAsc();
    }
  };

  return (
    <div className={classnames('sort', order.toLowerCase())}>
      <Button onClick={handleClick} className={classnames(key === name ? direction : '', { active: key === name })}>
        <i className='ri-arrow-up-line' />
      </Button>
    </div>
  );
};
