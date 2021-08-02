import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import { Button } from 'components/button';

export const SidebarAccount: FC = () => {
  const [open, setOpen] = React.useState<boolean>(true);

  const toggleOpen = () => setOpen(!open);

  return (
    <>
      <Button className={classnames('link', { open })} onClick={toggleOpen}>
        <i className='ri-account-circle-line' />
        <span>Account</span>
      </Button>
    </>
  );
};
