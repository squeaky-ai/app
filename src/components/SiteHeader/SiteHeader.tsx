import React from 'react';
import type { FC } from 'react';
import Link from 'next/link';
import Tabs from 'components/Tabs';
import { Site } from 'data/sites/types';
import AllSitesButton from './components/AllSitesButton';
import SiteHeaderContainer from './components/SiteHeaderContainer';
import SiteTitle from './components/SiteTitle';
import Avatar from 'components/Avatar';

export interface SiteHeaderProps {
  site: Site;
}

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

const SiteHeader: FC<SiteHeaderProps> = ({ site }) => (
  <SiteHeaderContainer>
    <AllSitesButton>
      <Link href='/sites'>
        <a>&lt; All sites</a>
      </Link>
    </AllSitesButton>
    <SiteTitle>
      <Avatar src={site.avatar} />
      <h2>{site.name}</h2>
    </SiteTitle>
    <Tabs tabs={tabs} />
  </SiteHeaderContainer>
);

export default SiteHeader;
