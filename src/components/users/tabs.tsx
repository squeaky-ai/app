import React from 'react';
import type { FC } from 'react';
import Link from 'next/link';
import classnames from 'classnames';
import { User } from '../../types/user';

interface Props {
  user: User;
  page: 'account' | 'password';
}

export const Tabs: FC<Props> = ({ user, page }) => {
  return (
    <div className='user-tabs'>
      <h3>Account Settings</h3>
      <ul className='tab-header'>
        <li className='tab'>
          <Link href='/users/account'>
            <a className={classnames('button tab-button', { active: page === 'account' })}>
              <i className='ri-account-circle-line' />
              Account
            </a>
          </Link>
        </li>
        <li className='tab'>
          <Link href='/users/password'>
            <a className={classnames('button tab-button', { active: page === 'password' })}>
              <i className='ri-lock-line' />
              Password
            </a>
          </Link>
        </li>
      </ul>
    </div>
  );
};
