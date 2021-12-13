import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import { Button } from 'components/button';
import { Portal } from 'components/portal';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  button: string | React.ReactNode;
  buttonClassName?: string;
  portalClassName?: string;
  positionX?: 'left' | 'right';
  fluid?: boolean;
}

export const Tooltip: FC<Props> = ({ button, fluid, buttonClassName, portalClassName, positionX, className, children, onClick }) => {
  const ref = React.useRef<HTMLDivElement>();
  const [open, setOpen] = React.useState(false);

  const handleMouseOver = () => {
    setOpen(true);
  };

  const handleMouseOut = () => {
    setOpen(false);
  };

  const coords = () => {
    const { x, y, height, width } = ref.current.getBoundingClientRect();

    const left = positionX === 'right' ? x + width : x;
    const top = y + height + 16;

    return { left, top };
  };

  return (
    <div ref={ref} className={classnames('tooltip', className)} onClick={onClick}>
      <Button onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} className={buttonClassName}>
        {button}
      </Button>
      <Portal>
        {open && (
          <div className={classnames('tooltip-menu', portalClassName, positionX, { fluid })} style={coords()}>
            {children}
          </div>
        )}
      </Portal>
    </div>
  );
};
