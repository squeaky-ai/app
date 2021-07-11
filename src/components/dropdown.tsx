import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import { Button } from 'components/button';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  button: string | React.ReactNode;
  buttonClassName?: string;
  direction?: 'up' | 'down';
}

export const Dropdown: FC<Props> = ({ button, buttonClassName, className, children, direction }) => {
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

  React.useEffect(() => {
    document.addEventListener('click', handleClick);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('click', handleClick, true);
      document.removeEventListener('keyup', handleKeyUp, true);
    }
  }, []);

  return (
    <div ref={ref} className={classnames('dropdown', className, direction, { open })}>
      <Button onClick={() => setOpen(!open)} className={buttonClassName}>
        {button}
        <i className='arrow ri-arrow-drop-down-line' />
      </Button>
      <div className='dropdown-menu'>
        {children}
      </div>
    </div>
  );
};
