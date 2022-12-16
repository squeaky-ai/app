import React from 'react';
import type { FC } from 'react';
import Link from 'next/link';
import classnames from 'classnames';

interface Props {
  page: 'account' | 'password' | 'preferences' | 'feature-flags';
}

export const Tabs: FC<Props> = ({ page }) => (
  <div className='user-tabs'>
    <ul className='tab-header' role='navigation' aria-label='Account navigation'>
      <li className='tab'>
        <Link href='/users/account' className={classnames('button tab-button', { active: page === 'account' })}>
          Account
        </Link>
      </li>
      <li className='tab'>
        <Link href='/users/password' className={classnames('button tab-button', { active: page === 'password' })}>
          Password
        </Link>
      </li>
      <li className='tab'>
        <Link href='/users/preferences' className={classnames('button tab-button', { active: page === 'preferences' })}>
          Preferences
        </Link>
      </li>
      <li className='tab'>
        <Link href='/users/feature-flags' className={classnames('button tab-button', { active: page === 'feature-flags' })}>
          Feature Flags
        </Link>
      </li>
    </ul>
  </div>
);
