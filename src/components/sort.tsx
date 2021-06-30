import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import { Button } from 'components/button';

interface Props {
  order: 'ASC' | 'DESC';
  onAsc: VoidFunction;
  onDesc: VoidFunction;
}

export const Sort: FC<Props> = ({ order, onAsc, onDesc }) => (
  <div className={classnames('sort', order.toLowerCase())}>
    <Button onClick={onAsc}>
      <i className='ri-arrow-drop-up-line' /> 
    </Button>
    <Button onClick={onDesc}>
      <i className='ri-arrow-drop-down-line' /> 
    </Button>
  </div>
);
