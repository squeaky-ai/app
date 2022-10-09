import React from 'react';
import type { FC } from 'react';

interface Props {
  id: string;
}

export const ErrorRecordings: FC<Props> = ({ id }) => {
  console.log(id);

  return (
    <div className='error-recordings'>

    </div>
  );
};
