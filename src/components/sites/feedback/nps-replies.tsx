import React from 'react';
import type { FC } from 'react';
import { TooltipProps } from 'recharts';
import { ScaleType } from 'recharts/types/util/types';
import { formatChartData } from 'lib/charts';
import { Chart } from 'components/sites/chart';
import { useChartSettings } from 'hooks/use-chart-settings';
import { doNotAllowZero } from 'lib/charts-v2';
import type { FeedbackNpsReplies, FeedbackNpsReply } from 'types/graphql';
import type { TimePeriod } from 'types/common';

interface Props {
  replies: FeedbackNpsReplies; 
  period: TimePeriod;
}

interface NpsCounts {
  promoters: number;
  passives: number;
  detractors: number;
}

const getNpsCounts = (scale: ScaleType, replies: FeedbackNpsReply[]): NpsCounts => ({
  promoters: doNotAllowZero(scale, replies.filter(r => r.score >= 9).length),
  passives: doNotAllowZero(scale, replies.filter(r => [7, 8].includes(r.score)).length),
  detractors: doNotAllowZero(scale, replies.filter(r => r.score <= 6).length),
});

export const NpsReplies: FC<Props> = ({ period, replies }) => {
  const { scale, type } = useChartSettings('nps-replies');
  const { data } = formatChartData<FeedbackNpsReply>(period, replies.responses);

  const results = data.map(d => ({
    dateKey: d.key,
    count: d.data.length,
    ...getNpsCounts(scale, d.data),
  }));

  // The graph looks crap if there's only a handful 
  // of results. So grab the max count, and dynamically
  // change the interval of the graph
  const max = Math.max(...results.map(d => d.count));

  const CustomTooltip: FC<TooltipProps<any, any>> = ({ active, payload }) => {
    if (!active || !payload?.length) return null;
  
    return (
      <div className='custom-tooltip'>
        <p>Outcome type</p>
        <p className='promoters'>{payload[0].payload.promoters || 0} Promoters</p>
        <p className='passives'>{payload[0].payload.passives || 0} Passives</p>
        <p className='detractors'>{payload[0].payload.detractors || 0} Detractors</p>
      </div>
    );
  };

  return (
    <div className='chart-wrapper'>
      <Chart
        data={results}
        tooltip={CustomTooltip}
        scale={scale}
        chartType={type}
        items={[{ dataKey: 'count' }]}
        yAxisProps={{
          axisLine: false,
          interval: max < 5 ? 0 : 'preserveEnd',
        }}
        xAxisProps={{
          axisLine: false,
        }}
      />
    </div>
  );
};
