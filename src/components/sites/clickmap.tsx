import React from 'react';
import type { FC } from 'react';
import type { HeatmapsItem } from 'types/heatmaps';

interface Props {
  items: HeatmapsItem[];
}

export const Clickmap: FC<Props> = ({ items }) => {
  return (
    <svg className='heatmap-overlay'>
      {items.map((item, i) => (
        <circle 
          key={i} 
          cx={item.x} 
          cy={item.y} 
          r={20}
          fill='var(--magenta-500)'
          opacity={.75}
        />
      ))}
    </svg>
  );
};
