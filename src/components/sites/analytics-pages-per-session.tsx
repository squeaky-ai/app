import React from 'react';
import type { FC } from 'react';
import { Trend } from 'components/trend';
import { toTwoDecimalPlaces } from 'lib/maths';
import type { PagesPerSession } from 'types/analytics';

interface Props {
  pagesPerSession: PagesPerSession;
}

export const AnalyticsPagesPerSession: FC<Props> = ({ pagesPerSession }) => {
  const { trend, average } = pagesPerSession;

  const direction = trend >= 0 ? 'up' : 'down';

  return (
    <>
      <h3>{toTwoDecimalPlaces(average)}</h3>
      <Trend direction={direction} value={average.toFixed(2)} />
    </>
  );
};
