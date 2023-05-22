import React from 'react';
import type { FC } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { ChartTooltip, Label, Value } from 'components/sites/chart-tooltip';
import { colorsPrimary } from 'lib/colors';
import { sortEventsStats } from 'lib/events';
import { EventStatsSort } from 'types/events';
import type { EventsStat } from 'types/graphql';

interface Props {
  sort: EventStatsSort;
  eventStats: EventsStat[];
}

export const EventStatsBreakdown: FC<Props> = ({ eventStats, sort }) => {
  const [activeIndex, setActiveIndex] = React.useState<number>(null);

  const data = sortEventsStats(eventStats, sort).map(stat => ({
    name: stat.name,
    value: stat.count,
  }));

  const total = eventStats.reduce((acc, stat) => acc + stat.count, 0);

  return (
    <div className='event-stats-breakdown'>
      <ResponsiveContainer width='100%' height='100%'>
        <PieChart width={240} height={240}>
          <Pie
            activeIndex={activeIndex}
            cx='50%'
            cy='50%'
            data={data}
            innerRadius={56}
            outerRadius={80}
            dataKey='value'
            onMouseEnter={(_, index) => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
          >
            {data.map((_, index) => (
              <Cell 
                key={`cell-${index}`}
                fill={colorsPrimary[index]?.fill}
                stroke={colorsPrimary[index]?.stroke}
              />
            ))}
          </Pie>
          <Tooltip content={(props) => (
            <ChartTooltip {...props} className='fluid'>
              {() => (
                <>
                  <Label>{data[activeIndex]?.name}</Label>
                  <Value color={colorsPrimary[activeIndex]?.stroke}>{(data[activeIndex]?.value || 0).toLocaleString()}</Value>
                </>
              )}
            </ChartTooltip>
          )} />
        </PieChart>
      </ResponsiveContainer>
      <div className='total'>
        <p><b>Total</b></p>
        <p>{total.toLocaleString()}</p>
      </div>
    </div>
  );
};
