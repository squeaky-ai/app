import React from 'react';
import type { FC } from 'react';
import Link from 'next/link';
import classnames from 'classnames';
import { ADMIN, OWNER, SUPER_USER } from 'data/teams/constants';
import type { Team } from 'types/graphql';

interface Props {
  siteId: string;
  member?: Team;
  page: 'feedback' | 'appearance' | 'scheduling' | 'form' | 'guide';
}

export const NpsTabs: FC<Props> = ({ siteId, member, page }) => (
  <div className='nps-tabs'>
    <ul className='tab-header' role='navigation' aria-label='NPS navigation'>
      <li className='tab'>
        <Link href={`/sites/${siteId}/feedback/nps`} className={classnames('button tab-button', { active: page === 'feedback' })}>
          Feedback
        </Link>
      </li>
      {[OWNER, ADMIN, SUPER_USER].includes(member?.role) && (
        <>
          <li className='tab'>
            <Link href={`/sites/${siteId}/feedback/nps/appearance`} className={classnames('button tab-button', { active: page === 'appearance' })}>
              Appearance
            </Link>
          </li>
          <li className='tab'>
            <Link href={`/sites/${siteId}/feedback/nps/scheduling`} className={classnames('button tab-button', { active: page === 'scheduling' })}>
              Scheduling &amp; Visibility
            </Link>
          </li>
          <li className='tab'>
            <Link href={`/sites/${siteId}/feedback/nps/form`} className={classnames('button tab-button', { active: page === 'form' })}>
              Form options
            </Link>
          </li>
        </>
      )}
      <li className='tab'>
        <Link href={`/sites/${siteId}/feedback/nps/guide`} className={classnames('button tab-button', { active: page === 'guide' })}>
          Guide
        </Link>
      </li>
    </ul>
  </div>
);
