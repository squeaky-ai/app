import React from 'react';
import type { FC } from 'react';
import { range, sum } from 'lodash';
import { format, subMonths } from 'date-fns';
import { Chart } from 'components/sites/chart';
import { ScaleType } from 'recharts/types/util/types';
import { useResize } from 'hooks/use-resize';
import { UsersGrowthChartTooltip } from 'components/admin/users-growth-chart-tooltip';
import { ChartOptions } from 'components/sites/chart-options';
import { DeviceWidths } from 'data/common/constants';
import { useChartSettings } from 'hooks/use-chart-settings';
import { doNotAllowZero } from 'lib/charts-v2';
import type { AdminUsersStored } from 'types/graphql';

interface Props {
  count: number;
  users: AdminUsersStored[];
}

interface Total {
  count: number;
  dateKey: string;
}

const getAccumulatingTotal = (scale: ScaleType, users: AdminUsersStored[]): Total[] => {
  const now = new Date();

  const results = range(0, 11).map(month => {
    const thisMonth = subMonths(now, month);
    const values = users.filter(user => new Date(user.date) <= thisMonth);
    const count = sum(values.map(v => v.count));
    
    return {
      dateKey: format(thisMonth, 'MMM yy'),
      count: doNotAllowZero(scale, count),
    }
  });

  return results.reverse();
};

export const UsersGrowth: FC<Props> = ({ count, users }) => {
  const { scale, type, setScale, setType } = useChartSettings('admin-users-growth');

  const data = getAccumulatingTotal(scale, users);

  const { width } = useResize();

  return (
    <>
      <div className='chart-heading'>
        <div className='numbered-title'>
          <h5>Total Users</h5>
          <h3>{count}</h3>
        </div>
        <ChartOptions
          scale={scale} 
          setScale={setScale} 
          chartType={type}
          setChartType={setType}
        />
      </div>
      <div className='chart-wrapper'>
        <Chart
          admin
          data={data}
          tooltip={UsersGrowthChartTooltip}
          scale={scale}
          chartType={type}
          items={[{ dataKey: 'count' }]}
          xAxisProps={{
            interval: width > DeviceWidths.DESKTOP ? 0 : 'preserveStartEnd',
          }}
        />
      </div>
    </>
  );
};
