import React from 'react';
import type { FC } from 'react';
import Link from 'next/link';
import classnames from 'classnames';
import { getTeamMember } from '../../lib/sites';
import { ADMIN, MEMBER } from '../../data/teams/constants';
import { User } from '../../types/user';
import { Site } from '../../types/site';

type Page = 'recordings' | 'analytics' | 'settings' | 'team' | 'subscription';

type Tab = {
  page: Page;
  name: string;
  icon: string;
  hideForRoles: number[];
}

interface Props {
  site: Site;
  user: User;
  page: Page;
}

export const Tabs: FC<Props> = ({ site, page, user }) => {
  const member = getTeamMember(site, user);

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
    <>
      <div className='site-tabs'>
        <h4 className='sub-heading'>
          <div className='avatar'></div>
          {site.name}
        </h4>
      </div>

      <ul className='tab-header'>
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
    </>
  );
};
