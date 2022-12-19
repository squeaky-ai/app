import React from 'react';
import type { FC } from 'react';
import Link from 'next/link';
import classnames from 'classnames';
import { ADMIN, OWNER, SUPER_USER } from 'data/teams/constants';
import type { Team } from 'types/graphql';

interface Props {
  siteId: string;
  member?: Team;
  page: 'feedback' | 'appearance' | 'visibility' | 'form';
}

export const SentimentTabs: FC<Props> = ({ siteId, member, page }) => (
  <div className='sentiment-tabs'>
    <ul className='tab-header' role='navigation' aria-label='Sentiment navigation'>
      <li className='tab'>
        <Link href={`/sites/${siteId}/feedback/sentiment`} className={classnames('button tab-button', { active: page === 'feedback' })}>
          Feedback
        </Link>
      </li>
      {[OWNER, ADMIN, SUPER_USER].includes(member?.role) && (
        <>
          <li className='tab'>
            <Link href={`/sites/${siteId}/feedback/sentiment/appearance`} className={classnames('button tab-button', { active: page === 'appearance' })}>
              Appearance
            </Link>
          </li>
          <li className='tab'>
            <Link href={`/sites/${siteId}/feedback/sentiment/visibility`} className={classnames('button tab-button', { active: page === 'visibility' })}>
              Visibility
            </Link>
          </li>
          <li className='tab'>
            <Link href={`/sites/${siteId}/feedback/sentiment/form`} className={classnames('button tab-button', { active: page === 'form' })}>
              Form Options
            </Link>
          </li>
        </>
      )}
    </ul>
  </div>
);
