import React from 'react';
import type { FC } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import classnames from 'classnames';
import { Site } from 'types/graphql';

export type TabsType = 'stats' | 'feed';

interface Props {
  site: Site;
  active: TabsType;
}

export const EventTabs: FC<Props> = ({ site, active }) => {
  const { asPath } = useRouter();

  const search = asPath.split('?')[1];

  return (
    <div className='event-tabs'>
      <ul className='tab-header' role='navigation' aria-label='Event stats'>
        <li className='tab'>
          <Link scroll={false} href={`/sites/${site.id}/events/history/stats?${search}`} className={classnames('button tab-button', { active: active === 'stats' })}>
            Stats
          </Link>
        </li>
        <li className='tab'>
          <Link scroll={false} href={`/sites/${site.id}/events/history/feed?${search}`} className={classnames('button tab-button', { active: active === 'feed' })}>
            Event Feed
          </Link>
        </li>
      </ul>
    </div>
  );
};
