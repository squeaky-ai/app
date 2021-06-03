import React from 'react';
import Link from 'next/link';
import type { FC } from 'react';
import SiteListContainer from './components/SiteListContainer';
import SiteListItem from './components/SiteListItem';
import EmptyState from './components/EmptyState';
import EmptyStateImage from './components/EmptyStateImage';
import Heading from './components/Heading';
import Text from 'components/Text';
import Avatar from 'components/Avatar';
import { Site } from 'data/sites/types';
import Button from 'components/Button';

export interface SiteListProps {
  sites: Site[];
}

const SiteList: FC<SiteListProps> = ({ sites }) => (
  <>
    {sites && (
      <>
        <Heading>
          <h2>Sites</h2>
          <Link href='/sites/create'>
            <a>+ Add New</a>
          </Link>
        </Heading>

        <SiteListContainer>
          {sites.map((site) => (
            <SiteListItem key={site.id}>
              <Link href={`/sites/${site.id}/recordings`}>
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
      </>
    )}

    {!sites && (
      <EmptyState>
        <EmptyStateImage />
        <h2>Welcome to Squeaky</h2>
        <Text>It’s time to discover what your users are really getting up to! Add your first site by clicking the button below.</Text>
        <Button>Add Site</Button>
      </EmptyState>
    )}
  </>
);

export default SiteList;
