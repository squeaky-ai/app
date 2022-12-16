import React from 'react';
import type { FC } from 'react';
import Link from 'next/link';
import classnames from 'classnames';
import { Icon } from 'components/icon';

interface Props {
  path: string;
  visible: boolean;
}

export const SidebarAccount: FC<Props> = ({ 
  path,
  visible,
}) => {
  if (!visible) return null;

  return (
    <Link href='/users/account'>
      <a className={classnames('link', { active: path.startsWith('/users') })} data-label='Account'>
        <Icon name='account-circle-line' />
      </a>
    </Link>
  );
};
