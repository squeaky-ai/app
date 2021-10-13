import React from 'react';
import type { FC } from 'react';
import Link from 'next/link';
import classnames from 'classnames';
import { OWNER } from 'data/teams/constants';
import { MAX_DAYS_BEFORE_POTENTIAL_ISSUE } from 'data/sites/constants';
import type { Site } from 'types/site';
import type { Team } from 'types/team';

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
          <Link href={`/sites/${site.id}/settings/tracking-code`}>
            <a className={classnames('button tab-button', { active: page === 'tracking-code' })}>
              Tracking code
              {site.verifiedAt 
                ? site.daysSinceLastRecording >= MAX_DAYS_BEFORE_POTENTIAL_ISSUE
                  ? <span className='badge warning'><i className='ri-error-warning-line' /></span> 
                  : <span className='badge verified'><i className='ri-checkbox-circle-line' /></span> 
                : <span className='badge unverified'><i className='ri-error-warning-line' /></span>}
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
          <Link href={`/sites/${site.id}/settings/screening`}>
            <a className={classnames('button tab-button', { active: page === 'screening' })}>
              Screening
            </a>
          </Link>
        </li>
        {member.role === OWNER && (
          <li className='tab'>
            <Link href={`/sites/${site.id}/settings/delete`}>
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
