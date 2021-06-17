import React from 'react';
import type { FC } from 'react';
import Link from 'next/link';
import classnames from 'classnames';
import { Site } from '../../types/site';

interface Props {
  site: Site;
  page: 'recordings' | 'analytics' | 'settings' | 'team';
}

export const Tabs: FC<Props> = ({ site, page }) => {
  return (
    <>
      <div className='site-tabs'>
        <h4 className='sub-heading'>
          <div className='avatar'></div>
          {site.name}
        </h4>
      </div>

      <ul className='tab-header'>
        <li className='tab'>
          <Link href={`/sites/${site.id}/recordings`}>
            <a className={classnames('button tab-button', { active: page === 'recordings' })}>
              <i className='ri-vidicon-line' />
              Recordings
            </a>
          </Link>
        </li>
        <li className='tab'>
          <Link href={`/sites/${site.id}/analytics`}>
            <a className={classnames('button tab-button', { active: page === 'analytics' })}>
              <i className='ri-line-chart-line' />
              Analytics
            </a>
          </Link>
        </li>
        <li className='tab'>
          <Link href={`/sites/${site.id}/team`}>
            <a className={classnames('button tab-button', { active: page === 'team' })}>
              <i className='ri-group-line' />
              Team
            </a>
          </Link>
        </li>
        <li className='tab'>
          <Link href={`/sites/${site.id}/settings`}>
            <a className={classnames('button tab-button', { active: page === 'settings' })}>
              <i className='ri-settings-3-line' />
              Settings
            </a>
          </Link>
        </li>
      </ul>
    </>
  );
};
