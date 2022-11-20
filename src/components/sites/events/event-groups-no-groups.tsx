import React from 'react';
import type { FC } from 'react';
import { Illustration } from 'components/illustration';

export const EventGroupsNoGroups: FC = () => (
  <div className='no-groups'>
    <Illustration illustration='illustration-8' height={240} width={320} />
    <h4>You have not currently added any events to groups</h4>
  </div>
);
