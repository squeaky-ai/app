import React from 'react';
import type { FC } from 'react';
import Tabs from 'components/Tabs';

const tabs = [
  {
    header: {
      name: 'Recordings',
      icon: 'ri-vidicon-line',
      path: 'recordings',
    },
    body: <h3>Recordings</h3>
  },
  {
    header: {
      name: 'Analytics',
      icon: 'ri-line-chart-line',
      path: 'analytics',
    },
    body: <h3>Analytics</h3>
  },
  {
    header: {
      name: 'Site Settings',
      icon: 'ri-settings-3-line',
      path: 'settings',
    },
    body: <h3>Site Settings</h3>
  },
  {
    header: {
      name: 'Team',
      icon: 'ri-group-line',
      path: 'team',
    },
    body: <h3>Team</h3>
  }
];

const SiteTabs: FC = () => (
  <Tabs tabs={tabs} />
);

export default SiteTabs;
