import React from 'react';
import type { FC } from 'react';
import Link from 'next/link';
import classnames from 'classnames';
import { Button } from 'components/button';
import { signout } from 'lib/api/auth';

interface Props {
  path: string;
}

export const SidebarAccount: FC<Props> = ({ path }) => {
  const [open, setOpen] = React.useState<boolean>(false);

  const toggleOpen = () => {
    setOpen(!open);
  };

  const handleSignOut = async () => {
    await signout();
    location.href = '/';
  };

  return (
    <div className={classnames('link account', { open })} data-label='Account'>
      <Button onClick={toggleOpen}>
        <i className='ri-account-circle-line' />
        <span>Account</span>
        <i className='arrow ri-arrow-drop-down-line' />
      </Button>
      <div className='items'>
        <Link href='/users/account'>
          <a className={classnames('button', { active: path.startsWith('/users') })}>
            Settings
          </a>
        </Link>
        <Button onClick={handleSignOut}>Log out</Button>
      </div>
    </div>
  );
};
