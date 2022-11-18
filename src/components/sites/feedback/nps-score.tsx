import React from 'react';
import type { FC } from 'react';
import { TooltipProps } from 'recharts';
import { percentage } from 'lib/maths';
import { formatChartData } from 'lib/charts';
import { Chart } from 'components/sites/chart';
import { useChartSettings } from 'hooks/use-chart-settings';
import { doNotAllowZero } from 'lib/charts-v2';
import type { FeedbackNpsScores, FeedbackNpsScore } from 'types/graphql';
import type { TimePeriod } from 'types/common';

interface Props {
  scores: FeedbackNpsScores;
  period: TimePeriod;
}

const getNps = (scores: FeedbackNpsScore[]) => {
  const promoters = scores.filter(s => s.score >= 9).length;
  const detractors = scores.filter(s => s.score <= 6).length;
  
  return percentage(scores.length, promoters) - percentage(scores.length, detractors);
};

export const NpsScore: FC<Props> = ({ period, scores }) => {
  const { scale, type } = useChartSettings('nps-score');
  const { data } = formatChartData<FeedbackNpsScore>(period, scores.responses);

  const results = data.map(d => ({
    dataKey: d.key,
    score: doNotAllowZero(scale, getNps(d.data)),
  }));

  const CustomTooltip: FC<TooltipProps<any, any>> = ({ active, payload }) => {
    if (!active || !payload?.length) return null;
  
    return (
      <div className='custom-tooltip'>
        <p>Score</p>
        <p className='score'>{payload[0].payload.score || 0}</p>
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
        items={[{ dataKey: 'score' }]}
        yAxisProps={{
          axisLine: false,
          domain: [-100, 100],
          interval: 0,
        }}
        xAxisProps={{
          axisLine: false,
        }}
      />
    </div>
  );
};
