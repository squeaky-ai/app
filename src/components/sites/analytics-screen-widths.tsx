import React from 'react';
import type { FC } from 'react';
import { min, max } from 'lodash';
import { Card } from 'components/card';
import { average, frequent } from 'lib/maths';

interface Props {
  dimensions: number[];
}

export const AnalyticsScreenWidths: FC<Props> = ({ dimensions }) => {
  return (
    <Card>
      <h4>
        Screen Width
        <i className='ri-arrow-left-line' />
        <i className='ri-arrow-right-line' />
      </h4>
      <div className='items'>
        <div className='item'>
          <p>Smallest</p>
          <h3>{min(dimensions) || 0}px</h3>
        </div>
        <div className='item'>
          <p>Average</p>
          <h3>{Math.floor(average(dimensions)) || 0}px</h3>
        </div>
        <div className='item'>
          <p>Most Frequent</p>
          <h3>{frequent(dimensions)} px</h3>
        </div>
        <div className='item'>
          <p>Largest</p>
          <h3>{max(dimensions) || 0}px</h3>
        </div>
      </div>
    </Card>    
  );
};
