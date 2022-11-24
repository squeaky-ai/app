import React from 'react';
import type { FC } from 'react';
import { ScaleType } from 'recharts/types/util/types';
import { formatChartData } from 'lib/charts';
import { Chart } from 'components/sites/chart';
import { NpsRepliesChartTooltip } from 'components/sites/feedback/nps-replies-chart-tooltip';
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

  return (
    <div className='chart-wrapper'>
      <Chart
        data={results}
        tooltip={props => <NpsRepliesChartTooltip {...props} period={period} />}
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
