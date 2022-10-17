import React from 'react';
import type { FC } from 'react';
import { Button } from 'components/button';
import { Icon } from 'components/icon';

interface Props {
  children: React.ReactNode;
  text: string;
}

export const SidebarInfoCopy: FC<Props> = ({ children, text }) => {
  const [copying, setCopying] = React.useState<boolean>(false);

  const copy = async () => {
    setCopying(true);

    await navigator.clipboard.writeText(text);

    setTimeout(() => {
      setCopying(false);
    }, 2000);
  };

  return (
    <div className='sidebar-copy'>
      <Button className='copy' onClick={copy}>
        <Icon name={copying ? 'check-line' : 'file-copy-line'} />
      </Button>
      {children}
    </div>
  );
};
