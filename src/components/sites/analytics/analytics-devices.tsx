import React from 'react';
import type { FC } from 'react';
import { sum } from 'lodash';
import { Icon } from 'components/icon';
import { Card } from 'components/card';
import { percentage } from 'lib/maths';
import type { AnalyticsDevice } from 'types/graphql';

interface Props {
  devices: AnalyticsDevice[];
}

export const AnalyticsDevices: FC<Props> = ({ devices }) => {
  const total = sum(devices.map(b => b.count));

  const [mobile, desktop] = devices;

  return (
    <>
      <Card>
        <Icon name='computer-line' />
        <div className='stats'>
          <p><b>Desktop / Laptop</b></p>
          <h3>{desktop.count} <span>{percentage(total, desktop.count) || 0}%</span></h3>
        </div>
      </Card>

      <Card>
        <Icon name='tablet-line' />
        <div className='stats'>
          <p><b>Tablet / Mobile</b></p>
          <h3>{mobile.count} <span>{percentage(total, mobile.count) || 0}%</span></h3>
        </div>
      </Card>
    </>
  );
};
