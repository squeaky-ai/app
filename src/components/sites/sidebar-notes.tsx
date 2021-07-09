import React from 'react';
import type { FC } from 'react';
import type { Recording } from 'types/recording';
import { Button } from 'components/button';

interface Props {
  recording: Recording;
}

export const SidebarNotes: FC<Props> = () => (
  <div className='notes empty'>
    <div className='empty-state'>
      <p>There are no notes for this recording</p>
      <Button className='secondary'>+ Add Note</Button>
    </div>
  </div>
);
