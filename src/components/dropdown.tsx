import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import FocusTrap from 'focus-trap-react';
import { Button } from 'components/button';
import { Portal } from 'components/portal';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  button: string | React.ReactNode;
  buttonClassName?: string;
  menuClassName?: string;
  direction?: 'up' | 'down';
  portal?: boolean;
}

export const Dropdown: FC<Props> = ({ button, buttonClassName, menuClassName, className, children, direction, portal }) => {
  const ref = React.useRef<HTMLDivElement>();
  const [open, setOpen] = React.useState(false);

  const handleClick = (event: MouseEvent) => {
    const element = event.target as Element;

    if (ref.current && !ref.current.contains(element)) {
      setOpen(false);
    }
  };

  const handleKeyUp = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setOpen(false);
    }
  };

  const coords = () => {
    const { x, y, height, width } = ref.current.getBoundingClientRect();

    const left = x + width;
    const top = y + height + 16;

    return { top, left };
  };

  React.useEffect(() => {
    document.addEventListener('click', handleClick);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('click', handleClick, true);
      document.removeEventListener('keyup', handleKeyUp, true);
    }
  }, []);

  return (
    <div ref={ref} className={classnames('dropdown', className, { open })}>
      <Button onClick={() => setOpen(!open)} className={buttonClassName}>
        {button}
        <i className='arrow ri-arrow-drop-down-line' />
      </Button>

      {portal
        ? (
          <Portal>
            {open && (
              <FocusTrap focusTrapOptions={{ clickOutsideDeactivates: true }}>
                <div className={classnames('dropdown-menu', direction, menuClassName)} style={coords()}>
                  {children}
                </div>
              </FocusTrap>
            )}
          </Portal>
        )
        : (
          <>
            {open && (
              <FocusTrap focusTrapOptions={{ clickOutsideDeactivates: true }}>
                <div className={classnames('dropdown-menu', direction, menuClassName)}>
                  {children}
                </div>
              </FocusTrap>
            )}
          </>
        )
      }
    </div>
  );
};
