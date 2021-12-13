import React from 'react';
import type { FC } from 'react';
import Link from 'next/link';
import classnames from 'classnames';
import { Icon } from 'components/icon';

interface Props {
  path: string;
}

export const SidebarAccount: FC<Props> = ({ path }) => (
  <Link href='/users/account'>
    <a className={classnames('link', { active: path.startsWith('/users') })} data-label='Account'>
      <Icon name='account-circle-line' />
    </a>
  </Link>
);
