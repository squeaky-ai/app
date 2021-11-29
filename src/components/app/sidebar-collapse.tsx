import React from 'react';
import type { FC } from 'react';
import { Button } from 'components/button';

interface Props {
  open: boolean;
  toggleOpen: VoidFunction;
}

export const SidebarCollapse: FC<Props> = ({ open, toggleOpen }) => (
  <Button className='link' onClick={toggleOpen} data-label={open ? 'Collapse' : 'Expand'}>
    <i className={`ri-arrow-${open ? 'left' : 'right'}-line`} />
  </Button>
);
