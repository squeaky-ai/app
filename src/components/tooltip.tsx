import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import { Button } from 'components/button';
import { Portal } from 'components/portal';

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

  const coords = () => {
    const { x, y, height, width } = ref.current.getBoundingClientRect();

    const left = positionX === 'right' ? x + width : x;
    const top = y + height + 16;

    return { left, top };
  };

  return (
    <div ref={ref} className={classnames('tooltip', className)}>
      <Button onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} className={buttonClassName}>
        {button}
      </Button>
      <Portal>
        {open && (
          <div className={classnames('tooltip-menu', positionX)} style={coords()}>
            {children}
          </div>
        )}
      </Portal>
    </div>
  );
};
