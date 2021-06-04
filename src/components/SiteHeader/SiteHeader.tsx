import React from 'react';
import type { FC } from 'react';
import { useRouter } from 'next/router';
import { RiVidiconLine, RiLineChartLine, RiSettings3Line, RiGroupLine } from 'react-icons/ri';
import Link from 'next/link';
import { TabsHeader, TabsHeaderItem } from 'components/Tabs';
import { Site } from 'data/sites/types';
import Text from 'components/Text';
import AllSitesButton from './components/AllSitesButton';
import SiteHeaderContainer from './components/SiteHeaderContainer';
import SiteTitle from './components/SiteTitle';
import Avatar from 'components/Avatar';

export interface SiteHeaderProps {
  site?: Site;
}

const SiteHeader: FC<SiteHeaderProps> = ({ site }) => {
  const router = useRouter();

  const url = (path: string) => `/sites/${site?.id}/${path}`;

  const active = (path: string) => router.asPath.startsWith(url(path));

  return (
    <SiteHeaderContainer>
      <AllSitesButton>
        <Link href='/sites'>
          <a>&lt; All sites</a>
        </Link>
      </AllSitesButton>
      <SiteTitle>
        <Avatar src={site?.avatar} />
        <h2>{site?.name}</h2>
      </SiteTitle>
      <TabsHeader>
        <TabsHeaderItem active={active('recordings')}>
          <Link href={url('recordings')}>
            <a>
              <RiVidiconLine />
              <Text>Recordings</Text>
            </a>
          </Link>
        </TabsHeaderItem>
        <TabsHeaderItem active={active('analytics')}>
          <Link href={url('analytics')}>
            <a>
              <RiLineChartLine />
              <Text>Analytics</Text>
            </a>
          </Link>
        </TabsHeaderItem>
        <TabsHeaderItem active={active('settings')}>
          <Link href={url('settings')}>
            <a>
              <RiSettings3Line />
              <Text>Site Settings</Text>
            </a>
          </Link>
        </TabsHeaderItem>
        <TabsHeaderItem active={active('team')}>
          <Link href={url('team')}>
            <a>
              <RiGroupLine />
              <Text>Team</Text>
            </a>
          </Link>
        </TabsHeaderItem>
      </TabsHeader>
    </SiteHeaderContainer>
  );
};

export default SiteHeader;
