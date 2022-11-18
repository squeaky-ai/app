import React from 'react';
import type { FC } from 'react';
import { average } from 'lib/maths';
import { omit, groupBy } from 'lodash';
import { TooltipProps } from 'recharts';
import { ScaleType } from 'recharts/types/util/types';
import { formatChartData } from 'lib/charts';
import { Emoji } from 'components/emoji';
import { BASE_PATH } from 'data/common/constants';
import { Chart } from 'components/sites/chart';
import { useChartSettings } from 'hooks/use-chart-settings';
import { doNotAllowZero } from 'lib/charts-v2';
import type { FeedbackSentimentRating } from 'types/graphql';
import type { TimePeriod } from 'types/common';

interface Props {
  period: TimePeriod;
  ratings: FeedbackSentimentRating[];
}

interface FeedbackData {
  0: number;
  1: number;
  2: number;
  3: number;
  4: number;
}

const getAxisProps = (props: any) => omit(props, [
  'tickFormatter',
  'verticalAnchor',
  'visibleTicksCount',
]);

const avg = (nums: number[]) => Math.ceil(average(nums));

const groupScoreCounts = (scale: ScaleType, ratings: FeedbackSentimentRating[]): FeedbackData => {
  const groups = groupBy(ratings.map(r => r.score));

  const count = (num: number) => (groups[num] || []).length;

  return {
    0: doNotAllowZero(scale, count(0)),
    1: doNotAllowZero(scale, count(1)),
    2: doNotAllowZero(scale, count(2)),
    3: doNotAllowZero(scale, count(3)),
    4: doNotAllowZero(scale, count(4)),
  }
};

export const SentimentRatings: FC<Props> = ({ period, ratings }) => {
  const { scale, type } = useChartSettings('sentiment-ratings');
  const { data } = formatChartData<FeedbackSentimentRating>(period, ratings);

  const results = data.map(d => ({
    dataKey: d.key,
    score: doNotAllowZero(scale, avg(d.data.map(s => s.score))),
    ...groupScoreCounts(scale, d.data),
  }));

  const CustomTooltip: FC<TooltipProps<any, any>> = ({ active, payload }) => {
    if (!active || !payload?.length) return null;
  
    return (
      <div className='custom-tooltip'>
        <p>Ratings</p>
        <p><Emoji height={16} width={16} emoji='emoji-5' /> <span>{payload[0].payload[4] || 0}</span></p>
        <p><Emoji height={16} width={16} emoji='emoji-4' /> <span>{payload[0].payload[3] || 0}</span></p>
        <p><Emoji height={16} width={16} emoji='emoji-3' /> <span>{payload[0].payload[2] || 0}</span></p>
        <p><Emoji height={16} width={16} emoji='emoji-2' /> <span>{payload[0].payload[1] || 0}</span></p>
        <p><Emoji height={16} width={16} emoji='emoji-1' /> <span>{payload[0].payload[0] || 0}</span></p>
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
          fontSize: 20,
          tick: props => ( 
            <image 
              {...getAxisProps(props)} 
              href={`${BASE_PATH}/emojis/emoji-${props.payload.value + 1}.svg`}
              height={24} 
              width={24} 
              transform={
                props.payload.value === 4
                  ? 'translate(-24, -24)'
                  : 'translate(-24, -12)'
              }
            />
          )
        }}
        xAxisProps={{
          axisLine: false,
        }}
      />
    </div>
  );
};
