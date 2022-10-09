import React from 'react';
import type { FC } from 'react';

interface Props {
  id: string;
}

export const ErrorVisitors: FC<Props> = ({ id }) => {
  console.log(id);

  return (
    <div className='error-visitors'>

    </div>
  );
};
