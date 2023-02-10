import React from 'react';
import type { FC } from 'react';
import { Icon } from 'components/icon';

interface Props {
  title: string;
  body: React.ReactNode;
  icon?: string;
}

export const EmptyStateHint: FC<Props> = ({ title, body, icon }) => (
  <div className='empty-state-hint'>
    <p className='empty-state-heading'>
      <span>
        <Icon name={icon || 'lightbulb-line'} />
        <b>{title}</b>
      </span>
    </p>
    {body}
  </div>
);
