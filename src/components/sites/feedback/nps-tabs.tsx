import React from 'react';
import type { FC } from 'react';
import Link from 'next/link';
import classnames from 'classnames';

interface Props {
  siteId: string;
  page: 'feedback' | 'appearance' | 'scheduling' | 'form' | 'guide';
}

export const NpsTabs: FC<Props> = ({ siteId, page }) => (
  <div className='nps-tabs'>
    <ul className='tab-header' role='navigation' aria-label='NPS navigation'>
      <li className='tab'>
        <Link href={`/sites/${siteId}/feedback/nps`}>
          <a className={classnames('button tab-button', { active: page === 'feedback' })}>
            Feedback
          </a>
        </Link>
      </li>
      <li className='tab'>
        <Link href={`/sites/${siteId}/feedback/nps/appearance`}>
          <a className={classnames('button tab-button', { active: page === 'appearance' })}>
            Appearance
          </a>
        </Link>
      </li>
      <li className='tab'>
        <Link href={`/sites/${siteId}/feedback/nps/scheduling`}>
          <a className={classnames('button tab-button', { active: page === 'scheduling' })}>
            Scheduling &amp; Visibility
          </a>
        </Link>
      </li>
      <li className='tab'>
        <Link href={`/sites/${siteId}/feedback/nps/form`}>
          <a className={classnames('button tab-button', { active: page === 'form' })}>
            Form options
          </a>
        </Link>
      </li>
      <li className='tab'>
        <Link href={`/sites/${siteId}/feedback/nps/guide`}>
          <a className={classnames('button tab-button', { active: page === 'guide' })}>
            Guide
          </a>
        </Link>
      </li>
    </ul>
  </div>
);
