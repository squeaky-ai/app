import React from 'react';
import ReactDOM from 'react-dom';
import type { FC } from 'react';

export const Portal: FC = ({ children }) => {
  const selector = '#portal-root';

  const ref = React.useRef<HTMLElement>();
  const [mounted, setMounted] = React.useState<boolean>(false);

  React.useEffect(() => {
    ref.current = document.querySelector(selector);
    setMounted(true);
  }, [selector]);

  return mounted ? ReactDOM.createPortal(children, ref.current) : null
};
