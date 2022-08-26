import React from 'react';
import type { FC } from 'react';
import Link from 'next/link';
import classnames from 'classnames';
import type { Team } from 'types/graphql';
import { ADMIN, OWNER } from 'data/teams/constants';

interface Props {
  siteId: string;
  member: Team;
  page: 'feedback' | 'appearance' | 'visibility';
}

export const SentimentTabs: FC<Props> = ({ siteId, member, page }) => (
  <div className='sentiment-tabs'>
    <ul className='tab-header' role='navigation' aria-label='Sentiment navigation'>
      <li className='tab'>
        <Link href={`/sites/${siteId}/feedback/sentiment`}>
          <a className={classnames('button tab-button', { active: page === 'feedback' })}>
            Feedback
          </a>
        </Link>
      </li>
      {[OWNER, ADMIN].includes(member.role) && (
        <>
          <li className='tab'>
            <Link href={`/sites/${siteId}/feedback/sentiment/appearance`}>
              <a className={classnames('button tab-button', { active: page === 'appearance' })}>
                Appearance
              </a>
            </Link>
          </li>
          <li className='tab'>
            <Link href={`/sites/${siteId}/feedback/sentiment/visibility`}>
              <a className={classnames('button tab-button', { active: page === 'visibility' })}>
                Visibility
              </a>
            </Link>
          </li>
        </>
      )}
    </ul>
  </div>
);
