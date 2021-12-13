import React from 'react';
import type { FC } from 'react';
import { Icon } from 'components/icon';
import { Button } from 'components/button';

interface Props {
  open: boolean;
  toggleOpen: VoidFunction;
}

export const SidebarCollapse: FC<Props> = ({ open, toggleOpen }) => (
  <Button className='link' onClick={toggleOpen} data-label={open ? 'Collapse' : 'Expand'}>
    <Icon name={`arrow-${open ? 'left' : 'right'}-line`} />
  </Button>
);
