import React from 'react';
import type { FC } from 'react';
import Link from 'next/link';
import classnames from 'classnames';

interface Props {
  siteId: string;
  page: 'feedback' | 'settings' | 'guide';
}

export const SentimentTabs: FC<Props> = ({ siteId, page }) => {
  return (
    <div className='sentiment-tabs'>
      <ul className='tab-header' role='navigation' aria-label='Sentiment navigation'>
        <li className='tab'>
          <Link href={`/sites/${siteId}/feedback/sentiment`}>
            <a className={classnames('button tab-button', { active: page === 'feedback' })}>
              Feedback
            </a>
          </Link>
        </li>
        <li className='tab'>
          <Link href={`/sites/${siteId}/feedback/sentiment/settings`}>
            <a className={classnames('button tab-button', { active: page === 'settings' })}>
              Settings
            </a>
          </Link>
        </li>
      </ul>
    </div>
  );
};
