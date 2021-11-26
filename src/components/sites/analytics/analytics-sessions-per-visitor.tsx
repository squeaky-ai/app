import React from 'react';
import type { FC } from 'react';
import { Trend } from 'components/trend';
import { toTwoDecimalPlaces } from 'lib/maths';
import type { AnalyticsSessionsPerVisitor as SessionsPerVisitor } from 'types/graphql';

interface Props {
  sessionsPerVisitor: SessionsPerVisitor;
}

export const AnalyticsSessionsPerVisitor: FC<Props> = ({ sessionsPerVisitor }) => {
  const { trend, average } = sessionsPerVisitor;

  const direction = trend >= 0 ? 'up' : 'down';

  return (
    <>
      <h3>{toTwoDecimalPlaces(average)}</h3>
      <Trend direction={direction} value={trend.toFixed(2)} />
    </>
  );
};
