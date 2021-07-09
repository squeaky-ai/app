import React from 'react';
import type { FC } from 'react';
import type { Recording } from 'types/recording';
import { Button } from 'components/button';

interface Props {
  recording: Recording;
}

export const SidebarTags: FC<Props> = () => (
  <div className='tags empty'>
    <div className='empty-state'>
      <p>There are no tags for this recording</p>
      <Button className='secondary'>+ Add Tag</Button>
    </div>
  </div>
);
