import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import { Button } from './button';

interface Props {
  title: string | React.ReactNode;
  aside?: string | React.ReactNode;
}

export const Drawer: FC<Props> = ({ title, children, aside }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <div className={classnames('drawer', { open })}>
      <div className='drawer-title'>
        <Button className='drawer-toggle' onClick={() => setOpen(!open)}>
          <i className='arrow ri-arrow-drop-down-line' />
          {title}
        </Button>
        {aside}
      </div>
      <div className='drawer-body'>
        {children}
      </div>
    </div>
  );
};
