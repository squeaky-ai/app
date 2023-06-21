import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import { Icon } from 'components/icon';
import { Button } from 'components/button';

interface Props {
  name: string;
  icon: string;
  expanded: boolean;
  warning?: boolean;
  children: React.ReactNode;
  className?: string;
  counter?: number;
  expand: VoidFunction;
  collapse: VoidFunction;
}

export const SidebarNested: FC<Props> = ({ 
  name,
  icon,
  expanded, 
  expand, 
  collapse, 
  warning,
  className,
  counter,
  children,
}) => {
  const toggleExpanded = () => expanded 
    ? collapse() 
    : expand();

  const showWarning = !expanded && warning;
  const showCounter = counter > 0;

  return (
    <div className={classnames('link nested', className, { open: expanded })} data-label={name}>
      <Button onClick={toggleExpanded}>
        <Icon className='sidebar-icon' name={icon} />
        {showWarning && (
          <span className='warning closed' /> 
        )}
        {showCounter && (
          <span className='counter'>{counter}</span>
        )}
        <span>
          {name}
          {showWarning
            ? <Icon name='error-warning-fill' className='warning' /> 
            : null}
        </span>
        <Icon className='arrow' name='arrow-drop-down-line' />
      </Button>
      <div className='items'>
        {children}
      </div>
    </div>
  );
};
