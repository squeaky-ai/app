import React from 'react';
import type { FC } from 'react';
import Link from 'next/link';
import classnames from 'classnames';
import { User } from 'types/graphql';

interface Props {
  user: User;
  page: 'account' | 'password' | 'preferences';
}

export const Tabs: FC<Props> = ({ page }) => {
  return (
    <div className='user-tabs'>
      <ul className='tab-header' role='navigation' aria-label='Account navigation'>
        <li className='tab'>
          <Link href='/users/account'>
            <a className={classnames('button tab-button', { active: page === 'account' })}>
              Account
            </a>
          </Link>
        </li>
        <li className='tab'>
          <Link href='/users/preferences'>
            <a className={classnames('button tab-button', { active: page === 'preferences' })}>
              Preferences
            </a>
          </Link>
        </li>
        <li className='tab'>
          <Link href='/users/password'>
            <a className={classnames('button tab-button', { active: page === 'password' })}>
              Password
            </a>
          </Link>
        </li>
      </ul>
    </div>
  );
};
