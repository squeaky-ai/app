import React from 'react';
import type { FC } from 'react';
import { Tooltip } from 'components/tooltip';

interface Props {
  data?: string;
}

export const EventData: FC<Props> = ({ data }) => {
  if (!data) return <>-</>;

  return (
    <Tooltip button={data} fluid>
      <pre className='code block event-data-code'>
        <code>
          {data}
        </code>
      </pre>
    </Tooltip>
  );
};
