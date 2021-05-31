import React from 'react';
import Link from 'next/link';
import type { FC } from 'react';
import SiteListContainer from './components/SiteListContainer';
import SiteListItem from './components/SiteListItem';
import Text from 'components/Text';
import Avatar from 'components/Avatar';
import { Site } from 'data/sites/types';

export interface SiteListProps {
  sites: Site[];
}

const SiteList: FC<SiteListProps> = ({ sites }) => (
  <SiteListContainer>
    {sites.map((site) => (
      <SiteListItem key={site.id}>
        <Link href={`/sites/${site.id}`}>
          <a>
            <Avatar src={site.avatar} />
            <Text><b>{site.name}</b></Text>
            <Text className='url'>{site.url}</Text>
            <Text>Owner: {site.ownerName}</Text>
          </a>
        </Link>
      </SiteListItem>
    ))}
  </SiteListContainer>
);

export default SiteList;
