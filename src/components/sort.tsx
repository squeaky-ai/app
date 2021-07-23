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

  const isDisabled = (dir: 'asc' | 'desc') => key === name && dir === direction;

  return (
    <div className={classnames('sort', order.toLowerCase())}>
      <Button onClick={onAsc} disabled={isDisabled('asc')}>
        <i className='ri-arrow-drop-up-line' /> 
      </Button>
      <Button onClick={onDesc} disabled={isDisabled('desc')}>
        <i className='ri-arrow-drop-down-line' /> 
      </Button>
    </div>
  );
};
