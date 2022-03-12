import React from 'react';
import type { FC } from 'react';
import Link from 'next/link';
import classnames from 'classnames';
import type { AdminTab } from 'types/admin';

interface Props {
  tab: AdminTab;
}

export const Tabs: FC<Props> = ({ tab }) => {
  return (
    <div className='admin-tabs'>
      <ul className='tab-header' role='navigation' aria-label='Account navigation'>
        <li className='tab'>
          <Link href='/__admin/users'>
            <a className={classnames('button tab-button', { active: tab === 'users' })}>
              Users
            </a>
          </Link>
        </li>
        <li className='tab'>
          <Link href='/__admin/sites'>
            <a className={classnames('button tab-button', { active: tab === 'sites' })}>
              Sites
            </a>
          </Link>
        </li>
        <li className='tab'>
          <Link href='/__admin/blog'>
            <a className={classnames('button tab-button', { active: tab === 'blog' })}>
              Blog
            </a>
          </Link>
        </li>
      </ul>
    </div>
  );
};
