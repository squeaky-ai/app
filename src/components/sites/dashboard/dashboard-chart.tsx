import React from 'react';
import type { FC } from 'react';

interface Props {
  children: React.ReactNode;
}

export const DashboardChart: FC<Props> = ({ children }) => (
  <div className='dashboard-chart'>
    {children}
  </div>
);
