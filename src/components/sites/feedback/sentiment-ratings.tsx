import React from 'react';
import type { FC } from 'react';
import { average } from 'lib/maths';
import { omit, groupBy } from 'lodash';
import { ScaleType } from 'recharts/types/util/types';
import { formatChartData } from 'lib/charts';
import { SentimentRatingsChartTooltip } from 'components/sites/feedback/sentiment-ratings-chart-tooltip';
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
    dateKey: d.key,
    score: doNotAllowZero(scale, avg(d.data.map(s => s.score))),
    ...groupScoreCounts(scale, d.data),
  }));

  return (
    <div className='chart-wrapper'>
      <Chart
        data={results}
        tooltip={props => <SentimentRatingsChartTooltip {...props} period={period} />}
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
