import React from 'react';
import type { FC } from 'react';
import { PieChart, Pie, Cell, Sector, ResponsiveContainer, SectorProps } from 'recharts';
import { Card } from 'components/card';
import { colorsPrimary } from 'lib/colors';
import { sortEventsStats } from 'lib/events';
import { EventStatsSort } from 'types/events';
import type { EventsStat } from 'types/graphql';

interface Props {
  sort: EventStatsSort;
  eventStats: EventsStat[];
}

type RenderActiveShapeProps = SectorProps & {
  midAngle: number;
  payload: { name: string, value: string };
  percent: number;
}

const renderActiveShape = (props: RenderActiveShapeProps) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent } = props;

  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path 
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill='none'
      />
      <circle 
        cx={ex}
        cy={ey}
        r={2}
        fill={fill}
        stroke='none'
      />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill='var(--gray-blue-800)' fontSize={12}>
        {payload.name}
      </text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill='var(--gray-500)' fontSize={12}>
        {payload.value} ({(percent * 100).toFixed(2)}%)
      </text>
    </g>
  );
};

export const EventStatsBreakdown: FC<Props> = ({ eventStats, sort }) => {
  const [activeIndex, setActiveIndex] = React.useState<number>(null);

  const data = sortEventsStats(eventStats, sort).map(stat => ({
    name: stat.name,
    value: stat.count,
  }));

  const total = eventStats.reduce((acc, stat) => acc + stat.count, 0);

  return (
    <Card className='event-stats-breakdown'>
      <ResponsiveContainer width='100%' height='100%'>
        <PieChart width={240} height={240}>
          <Pie
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            cx='50%'
            cy='50%'
            data={data}
            innerRadius={80}
            outerRadius={120}
            dataKey='value'
            onMouseEnter={(_, index) => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
          >
            {data.map((_, index) => (
              <Cell 
                key={`cell-${index}`}
                fill={colorsPrimary[index]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className='total'>
        <p><b>Total</b></p>
        <p>{total}</p>
      </div>
    </Card>
  );
};
