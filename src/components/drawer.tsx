import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import { Button } from './button';

interface Props {
  title: string | React.ReactNode;
}

export const Drawer: FC<Props> = ({ title, children }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <div className={classnames('drawer', { open })}>
      <Button className='drawer-title' onClick={() => setOpen(!open)}>
        <i className='arrow ri-arrow-drop-down-line' />
        {title}
      </Button>
      <div className='drawer-body'>
        {children}
      </div>
    </div>
  );
};
