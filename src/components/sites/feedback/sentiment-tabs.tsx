import React from 'react';
import type { FC } from 'react';
import Link from 'next/link';
import classnames from 'classnames';

interface Props {
  siteId: string;
  page: 'feedback' | 'appearance' | 'visibility';
}

export const SentimentTabs: FC<Props> = ({ siteId, page }) => (
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
    </ul>
  </div>
);
