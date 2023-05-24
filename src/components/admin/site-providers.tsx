import React from 'react';
import type { FC } from 'react';
import { clamp } from 'lodash';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { percentage } from 'lib/maths';
import { useResize } from 'hooks/use-resize';
import type { AdminSitesProvider } from 'types/graphql';

interface Props {
  providers: AdminSitesProvider[];
}

const MAX_PIE_SIZE = 256;

const COLORS = ['#A14259', '#FFA574'];

export const SiteProviders: FC<Props> = ({ providers }) => {
  useResize();

  const ref = React.useRef<HTMLDivElement>(null);

  const data = providers.map(provider => ({
    name: provider.providerName,
    value: provider.count,
  }));

  const total = data.reduce((acc, d) => acc += d.value, 0);

  const getPercentage = (count: number) => percentage(total, count);

  const pieContainerWidth = (() => {
    if (ref.current) {
      const { width } = ref.current.getBoundingClientRect();
      return width;
    }

    return MAX_PIE_SIZE;
  })();

  const outerRadius = clamp(pieContainerWidth / 2, 0, MAX_PIE_SIZE / 2);
  const innerRadius = outerRadius - 16;

  return (
    <div ref={ref} className='pie-wrapper'>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            dataKey='value'
            innerRadius={innerRadius}
            outerRadius={outerRadius}
          >
            {data.map((d, index) => (
              <Cell key={d.name} fill={COLORS[index]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      <div className='stats'>
        {data.map(d => (
          <React.Fragment key={d.name}>
            <p>{d.name}</p>
            <p className='stat'><b>{d.value.toLocaleString()}</b> <i>({getPercentage(d.value)}%)</i></p>  
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
