import React from 'react';
import type { FC } from 'react';
import Link from 'next/link';
import classnames from 'classnames';
import type { Site } from 'types/graphql';

interface Props {
  site: Site;
  tab: 'traffic' | 'audience';
}

export const Tabs: FC<Props> = ({ site, tab }) => (
  <div className='analytics-tabs'>
    <ul className='tab-header' role='navigation' aria-label='Analytics navigation'>
      <li className='tab'>
        <Link href={`/sites/${site.id}/analytics/traffic`}>
          <a className={classnames('button tab-button', { active: tab === 'traffic' })}>
            Traffic
          </a>
        </Link>
      </li>
      <li className='tab'>
        <Link href={`/sites/${site.id}/analytics/audience`}>
          <a className={classnames('button tab-button', { active: tab === 'audience' })}>
            Audience
          </a>
        </Link>
      </li>
    </ul>
  </div>
);
