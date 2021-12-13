import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import { Icon } from 'components/icon';
import { Button } from 'components/button';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  roles: number[];
}

export const Access: FC<Props> = ({ className, roles }) => {
  const [open, setOpen] = React.useState<boolean>(false);

  const roleNames: { [key: number]: string } = {
    1: 'Admins',
    2: 'Site Owner'
  };

  return (
    <Button className={classnames('access', className, { open })} onClick={() => setOpen(!open)}>
      <Icon name='lock-line' />
      <span className='description'>
        Visible to {roles.map(r => roleNames[r]).join(' & ')}
       </span>
    </Button>
  );
};
