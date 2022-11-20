import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import { TooltipProps } from 'recharts';

export type ChartTooltipProps = TooltipProps<any, any>;

export type ChildProps = {
  label: string;
  data: Record<string, string | number>;
}

interface Props extends ChartTooltipProps{
  className?: string;
  children: (chartProps: ChildProps) => React.ReactElement;
}

const areEqual = (prevProps: Props, nextProps: Props): boolean => {
  return prevProps.active === nextProps.active &&
         prevProps.label === nextProps.label;
};

export const ChartTooltip: FC<Props> = React.memo(({
  children,
  className,
  active,
  payload,
  label, 
}) => {
  if (!active || !payload?.length) return null;

  return (
    <div className={classnames('chart-tooltip', className)}>
      {children({ data: payload[0].payload, label })}
    </div>
  );
}, areEqual);

export const Label: FC<{ children: React.ReactNode}> = ({ children }) => (
  <p className='label'>
    {children}
  </p>
);

export const Value: FC<{ children: React.ReactNode, color?: string }> = ({ children, color }) => (
  <p className='value' style={{ color: color === 'var(--blue-500)' ? 'var(--blue-300)' : color }}>
    {children}
  </p>
);

ChartTooltip.displayName = 'ChartTooltip';
