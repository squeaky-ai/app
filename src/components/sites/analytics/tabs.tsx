import React from 'react';
import type { FC } from 'react';
import Link from 'next/link';
import classnames from 'classnames';
import type { Site } from 'types/graphql';

interface Props {
  site: Site;
  tab: 'traffic' | 'audience';
  type: 'site' | 'page';
  page?: string;
}

export const Tabs: FC<Props> = ({ site, tab, type, page }) => {
  const url = page
    ? `?url=${encodeURIComponent(page)}`
    : '';

  return (
    <div className='analytics-tabs'>
      <ul className='tab-header' role='navigation' aria-label='Analytics navigation'>
        <li className='tab'>
          <Link href={`/sites/${site.id}/analytics/${type}/traffic${url}`} className={classnames('button tab-button', { active: tab === 'traffic' })}>
            Traffic
          </Link>
        </li>
        <li className='tab'>
          <Link href={`/sites/${site.id}/analytics/${type}/audience${url}`} className={classnames('button tab-button', { active: tab === 'audience' })}>
            Audience
          </Link>
        </li>
      </ul>
    </div>
  );
};
