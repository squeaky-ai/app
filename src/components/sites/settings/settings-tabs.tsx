import React from 'react';
import type { FC } from 'react';
import Link from 'next/link';
import classnames from 'classnames';
import { Icon } from 'components/icon';
import { OWNER } from 'data/teams/constants';
import { MAX_DAYS_BEFORE_POTENTIAL_ISSUE } from 'data/sites/constants';
import type { Site } from 'types/graphql';
import type { Team } from 'types/graphql';

interface Props {
  site: Site;
  member: Team; 
  page: 'details' | 'tracking-code' | 'privacy' | 'tags' | 'screening' | 'delete';
}

export const SettingsTabs: FC<Props> = ({ site, page, member }) => {
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
          <Link href={`/sites/${site.id}/settings/details/tracking-code`}>
            <a className={classnames('button tab-button', { active: page === 'tracking-code' })}>
              Tracking code
              {site.verifiedAt 
                ? site.daysSinceLastRecording >= MAX_DAYS_BEFORE_POTENTIAL_ISSUE
                  ? <span className='badge warning'><Icon name='error-warning-line' /></span> 
                  : <span className='badge verified'><Icon name='checkbox-circle-line' /></span> 
                : <span className='badge unverified'><Icon name='error-warning-line' /></span>}
            </a>
          </Link>
        </li>
        <li className='tab'>
          <Link href={`/sites/${site.id}/settings/details/privacy`}>
            <a className={classnames('button tab-button', { active: page === 'privacy' })}>
              Privacy
            </a>
          </Link>
        </li>
        <li className='tab'>
          <Link href={`/sites/${site.id}/settings/details/tags`}>
            <a className={classnames('button tab-button', { active: page === 'tags' })}>
              Tags
            </a>
          </Link>
        </li>
        <li className='tab'>
          <Link href={`/sites/${site.id}/settings/details/screening`}>
            <a className={classnames('button tab-button', { active: page === 'screening' })}>
              Screening
            </a>
          </Link>
        </li>
        {member.role === OWNER && (
          <li className='tab'>
            <Link href={`/sites/${site.id}/settings/details/delete`}>
              <a className={classnames('button tab-button', { active: page === 'delete' })}>
                Site deletion
              </a>
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
};
