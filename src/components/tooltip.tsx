import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import { Button } from 'components/button';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  button: string | React.ReactNode;
  buttonClassName?: string;
  positionX?: 'left' | 'right';
}

export const Tooltip: FC<Props> = ({ button, buttonClassName, positionX, className, children }) => {
  const ref = React.useRef<HTMLDivElement>();
  const [open, setOpen] = React.useState(false);

  const handleMouseOver = () => {
    setOpen(true);
  };

  const handleMouseOut = () => {
    setOpen(false);
  };

  return (
    <div ref={ref} className={classnames('tooltip', className, positionX, { open, })}>
      <Button onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} className={buttonClassName}>
        {button}
      </Button>
      <div className='tooltip-menu'>
        {children}
      </div>
    </div>
  );
};
