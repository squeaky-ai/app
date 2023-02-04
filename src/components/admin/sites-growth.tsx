import React from 'react';
import type { FC } from 'react';
import { range, sum } from 'lodash';
import { format, subMonths } from 'date-fns';
import { Label } from 'components/label';
import { Checkbox } from 'components/checkbox';
import { useResize } from 'hooks/use-resize';
import { DeviceWidths } from 'data/common/constants';
import { Chart } from 'components/sites/chart';
import { SitesGrowthChartTooltip } from 'components/admin/sites-growth-chart-tooltip';
import { ChartOptions } from 'components/sites/chart-options';
import { useChartSettings } from 'hooks/use-chart-settings';
import { useChartShow } from 'hooks/use-chart-show';
import { doNotAllowZero } from 'lib/charts-v2';
import type { AdminSitesStored } from 'types/graphql';

interface Props {
  count: number;
  sites: AdminSitesStored[];
}

interface Total {
  allCount: number;
  verifiedCount: number;
  unverifiedCount: number;
  dateKey: string;
}

export const SitesGrowth: FC<Props> = ({ count, sites }) => {
  const { show, setShow } = useChartShow('admin-sites-growth');
  const { scale, type, setScale, setType } = useChartSettings('admin-sites-growth');

  const { width } = useResize();

  const handleClick = (value: string) => {
    show.includes(value)
      ? setShow(show.filter(s => s !== value))
      : setShow([...show, value]);
  };

  const data = ((): Total[] => {
    const now = new Date();
  
    const results = range(0, 11).map(month => {
      const thisMonth = subMonths(now, month);
      const values = sites.filter(site => new Date(site.date) <= thisMonth);

      const allCount = show.includes('all') ? sum(values.map(v => v.allCount)) : 0;
      const verifiedCount = show.includes('verified') ? sum(values.map(v => v.verifiedCount)) : 0;
      const unverifiedCount = show.includes('unverified') ? sum(values.map(v => v.unverifiedCount)) : 0;
      
      return {
        dateKey: format(thisMonth, 'MMM yy'),
        allCount: doNotAllowZero(scale, allCount),
        verifiedCount: doNotAllowZero(scale, verifiedCount),
        unverifiedCount: doNotAllowZero(scale, unverifiedCount),
      };
    });
  
    return results.reverse();
  })();

  return (
    <>
      <div className='chart-heading'>
        <div className='numbered-title'>
          <h5>Total Sites</h5>
          <h3>{count}</h3>
        </div>
        <div className='options'>
          <Label>Show:</Label>
          <Checkbox checked={show.includes('all')} onChange={() => handleClick('all')} className='rose'>All</Checkbox>
          <Checkbox checked={show.includes('verified')} onChange={() => handleClick('verified')} className='mauve'>Verified</Checkbox>
          <Checkbox checked={show.includes('unverified')} onChange={() => handleClick('unverified')} className='peach'>Unverified</Checkbox>
          <ChartOptions
            scale={scale} 
            setScale={setScale} 
            chartType={type}
            setChartType={setType}
          />
        </div>
      </div>
      <div className='chart-wrapper'>
        <Chart
          admin
          data={data}
          tooltip={props => <SitesGrowthChartTooltip {...props} show={show} />}
          scale={scale}
          chartType={type}
          items={[{ dataKey: 'allCount' }, { dataKey: 'verifiedCount' }, { dataKey: 'unverifiedCount' }]}
          xAxisProps={{
            interval: width > DeviceWidths.DESKTOP ? 0 : 'preserveStartEnd',
          }}
        />
      </div>
    </>
  );
};
