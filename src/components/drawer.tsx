import React from 'react';
import type { FC } from 'react';
import { useRouter } from 'next/router';
import classnames from 'classnames';
import { Button } from 'components/button';

interface Props {
  name: string;
  title: string | React.ReactNode;
  aside?: string | React.ReactNode;
}

export const Drawer: FC<Props> = ({ title, children, aside, name }) => {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const { tab } = router.query;

    if (tab && tab === name) {
      setOpen(true);
    }
  }, []);

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
