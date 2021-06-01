import React from 'react';
import type { FC } from 'react';
import { RiVidiconLine, RiLineChartLine, RiSettings3Line, RiGroupLine } from 'react-icons/ri';
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
      icon: RiVidiconLine,
      path: 'recordings',
    },
    body: <h3>Recordings</h3>
  },
  {
    header: {
      name: 'Analytics',
      icon: RiLineChartLine,
      path: 'analytics',
    },
    body: <h3>Analytics</h3>
  },
  {
    header: {
      name: 'Site Settings',
      icon: RiSettings3Line,
      path: 'settings',
    },
    body: <h3>Site Settings</h3>
  },
  {
    header: {
      name: 'Team',
      icon: RiGroupLine,
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
