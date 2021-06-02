import React from 'react';
import type { FC } from 'react';
import { RiVidiconLine, RiLineChartLine, RiSettings3Line, RiGroupLine } from 'react-icons/ri';
import Link from 'next/link';
import Tabs from 'components/Tabs';
import { Site } from 'data/sites/types';
import { PageHeading } from 'components/SqueakyPage';
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
    body: <PageHeading>Recordings</PageHeading>
  },
  {
    header: {
      name: 'Analytics',
      icon: RiLineChartLine,
      path: 'analytics',
    },
    body: <PageHeading>Analytics</PageHeading>
  },
  {
    header: {
      name: 'Site Settings',
      icon: RiSettings3Line,
      path: 'settings',
    },
    body: <PageHeading>Site Settings</PageHeading>
  },
  {
    header: {
      name: 'Team',
      icon: RiGroupLine,
      path: 'team',
    },
    body: <PageHeading>Team</PageHeading>
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
