import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import { Button } from 'components/button';

interface Props {
  name: string;
  icon: string;
  expanded: boolean;
  expand: VoidFunction;
  collapse: VoidFunction;
}

export const SidebarNested: FC<Props> = ({ 
  name,
  icon,
  expanded, 
  expand, 
  collapse, 
  children 
}) => {
  const toggleExpanded = () => expanded 
    ? collapse() 
    : expand();

  return (
    <div className={classnames('link nested', { open: expanded })} data-label='Account'>
      <Button onClick={toggleExpanded}>
        <i className={icon} />
        <span>{name}</span>
        <i className='arrow ri-arrow-drop-down-line' />
      </Button>
      <div className='items'>
        {children}
      </div>
    </div>
  );
};
