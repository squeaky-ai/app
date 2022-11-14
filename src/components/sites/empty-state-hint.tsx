import React from 'react';
import type { FC } from 'react';
import { Icon } from 'components/icon';
import { Button } from 'components/button';

interface Props {
  title: string;
  body: React.ReactNode;
  icon?: string;
  videoName?: string;
}

export const EmptyStateHint: FC<Props> = ({ title, body, icon, videoName }) => (
  <div className='empty-state-hint'>
    <p className='empty-state-heading'>
      <span>
        <Icon name={icon || 'lightbulb-line'} />
        <b>{title}</b>
      </span>
      {!!videoName && (
        <Button className='video'>
          <Icon name='vidicon-line' />
          {videoName}
        </Button>
      )}
    </p>
    {body}
  </div>
);
