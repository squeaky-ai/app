import React from 'react';
import type { FC } from 'react';
import Link from 'next/link';
import classnames from 'classnames';
import { Container } from 'components/container';
import { ADMIN, MEMBER } from 'data/teams/constants';
import { Avatar } from 'components/sites/avatar';
import { Team } from 'types/team';
import { Site } from 'types/site';

type Page = 'recordings' | 'analytics' | 'settings' | 'team' | 'subscription';

type Tab = {
  page: Page;
  name: string;
  icon: string;
  hideForRoles: number[];
}

interface Props {
  site: Site;
  member: Team;
  page: Page;
}

export const Tabs: FC<Props> = ({ site, page, member }) => {
  const tabs: Tab[] = [
    {
      page: 'recordings',
      name: 'Recordings',
      icon: 'ri-vidicon-line',
      hideForRoles: []
    },
    {
      page: 'analytics',
      name: 'Analytics',
      icon: 'ri-line-chart-line',
      hideForRoles: []
    },
    {
      page: 'team',
      name: 'Team',
      icon: 'ri-group-line',
      hideForRoles: [MEMBER]
    },
    {
      page: 'settings',
      name: 'Settings',
      icon: 'ri-settings-3-line',
      hideForRoles: [MEMBER]
    },
    {
      page: 'subscription',
      name: 'Subscription',
      icon: 'ri-bank-card-2-line',
      hideForRoles: [MEMBER, ADMIN]
    }
  ];

  return (
    <Container className='xl centered'>
      <div className='site-tabs'>
        <h4 className='sub-heading'>
          <Avatar site={site} />
          {site.name}
        </h4>
      </div>

      <ul className='tab-header' role='navigation' aria-label='Site navigation'>
        {tabs.map(tab => (
          <li className={classnames('tab', { hidden: tab.hideForRoles.includes(member?.role) })} key={tab.page}>
            <Link href={`/sites/${site.id}/${tab.page}`}>
              <a className={classnames('button tab-button', { active: page === tab.page })}>
                <i className={tab.icon} />
                {tab.name}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </Container>
  );
};
