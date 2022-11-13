import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import { CreateSiteStep } from 'types/sites';

interface Props {
  step: CreateSiteStep;
  steps: CreateSiteStep[];
}

export const Steps: FC<Props> = ({ steps, step }) => (
  <div className='steps'>
    {steps.map((s, index) => (
      <div key={s} className={classnames('step', { filled: index < step, selected: index === step })}>
        <div className='indicator' />
        {index !== steps.length - 1 && (
          <div className='seperator' />
        )}
      </div>
    ))}
  </div>
);
