import React from 'react';
import type { FC } from 'react';

interface Props {
  title: string;
  body: React.ReactNode;
}

export const EmptyStateHint: FC<Props> = ({ title, body }) => (
  <div className='empty-state-hint'>
    <p className='empty-state-heading'>
      <i className='ri-lightbulb-line' />
      <b>{title}</b>
    </p>
    {body}
  </div>
);
