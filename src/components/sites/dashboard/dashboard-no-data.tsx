import React from 'react';
import type { FC } from 'react';
import { Icon } from 'components/icon';

export const DashboardNoData: FC = () => (
  <div className='dashboard-empty-state'>
    <Icon name='time-line' />
    <p>No data available</p>
  </div>
);
