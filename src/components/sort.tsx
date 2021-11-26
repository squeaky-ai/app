import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import { Button } from 'components/button';
import { RecordingsSort, VisitorsSort, VisitorsPagesSort } from 'types/graphql';

interface Props {
  name: string;
  order: RecordingsSort | VisitorsSort | VisitorsPagesSort | string;
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
