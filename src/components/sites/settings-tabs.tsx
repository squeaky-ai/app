import React from 'react';
import type { FC } from 'react';
import Link from 'next/link';
import classnames from 'classnames';
import { Site } from 'types/site';

interface Props {
  site: Site;
  page: 'details' | 'tracking-code' | 'privacy' | 'tags' | 'ip' | 'delete';
}

export const SettingsTabs: FC<Props> = ({ site, page }) => {
  return (
    <div className='site-tabs'>
      <ul className='tab-header' role='navigation' aria-label='Account navigation'>
        <li className='tab'>
          <Link href={`/sites/${site.id}/settings/details`}>
            <a className={classnames('button tab-button', { active: page === 'details' })}>
              Site details
            </a>
          </Link>
        </li>
        <li className='tab'>
          <Link href={`/sites/${site.id}/settings/tracking-code`}>
            <a className={classnames('button tab-button', { active: page === 'tracking-code' })}>
              Tracking code
            </a>
          </Link>
        </li>
        <li className='tab'>
          <Link href={`/sites/${site.id}/settings/privacy`}>
            <a className={classnames('button tab-button', { active: page === 'privacy' })}>
              Privacy
            </a>
          </Link>
        </li>
        <li className='tab'>
          <Link href={`/sites/${site.id}/settings/tags`}>
            <a className={classnames('button tab-button', { active: page === 'tags' })}>
              Tags
            </a>
          </Link>
        </li>
        <li className='tab'>
          <Link href={`/sites/${site.id}/settings/ip`}>
            <a className={classnames('button tab-button', { active: page === 'ip' })}>
              IP Screening
            </a>
          </Link>
        </li>
        <li className='tab'>
          <Link href={`/sites/${site.id}/settings/delete`}>
            <a className={classnames('button tab-button', { active: page === 'delete' })}>
              Site deletion
            </a>
          </Link>
        </li>
      </ul>
    </div>
  );
};
