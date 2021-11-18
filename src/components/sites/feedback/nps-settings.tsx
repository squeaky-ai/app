import React from 'react';
import type { FC } from 'react';
import { Toggle } from 'components/toggle';

export const NpsSettings: FC = () => {
  return (
    <div className='nps-settings'>
      <Toggle>
        Use NPS® Survey
      </Toggle>
    </div>
  );
};
