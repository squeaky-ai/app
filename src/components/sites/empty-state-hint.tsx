import React from 'react';
import type { FC } from 'react';
import { Button } from 'components/button';

interface Props {
  title: string;
  body: React.ReactNode;
  videoName?: string;
}

export const EmptyStateHint: FC<Props> = ({ title, body, videoName }) => (
  <div className='empty-state-hint'>
    <p className='empty-state-heading'>
      <span>
        <i className='ri-lightbulb-line' />
        <b>{title}</b>
      </span>
      {!!videoName && (
        <Button className='video'>
          <i className='ri-vidicon-line' />
          {videoName}
        </Button>
      )}
    </p>
    {body}
  </div>
);
