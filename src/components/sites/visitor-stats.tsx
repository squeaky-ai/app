import React from 'react';
import type { FC } from 'react';
import { Card } from 'components/card';
import { toMinutesAndSeconds } from 'lib/dates';
import type { Visitor } from 'types/visitor';

interface Props {
  visitor: Visitor;
}

export const VisitorStats: FC<Props> = ({ visitor }) => {
  const toTwoDecimalPlaces = (value: number) => {
    return Number(value.toFixed(2));
  };

  return (
    <div className='stats'>
      <Card className='session-duration'>
        <h3>Average Session Duration</h3>
        <h2>{toMinutesAndSeconds(visitor.averageSessionDuration || 0)}</h2>
      </Card>
      <Card className='per-session'>
        <h3>Pages Per Session</h3>
        <h2>{toTwoDecimalPlaces(visitor.pagesPerSession || 0)}</h2>
      </Card>
    </div>
  );
};
