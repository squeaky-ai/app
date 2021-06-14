import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import { Button } from './button';

interface Props {
  button: string | React.ReactNode;
}

export const Dropdown: FC<Props> = ({ button, children }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <div className={classnames('dropdown', { open })}>
      <Button onClick={() => setOpen(!open)}>
        {button}
        <i className='arrow ri-arrow-drop-down-line' />
      </Button>
      <div className='dropdown-menu'>
        {children}
      </div>
    </div>
  );
};
