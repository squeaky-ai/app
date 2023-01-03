import React from 'react';
import type { FC } from 'react';
import { Icon } from 'components/icon';
import { toHyphenedDate } from 'lib/dates';
import { TIME_PERIODS } from 'data/common/constants';
import type { TimePeriod, RelativeTime } from 'types/common';

interface Props {
  period: TimePeriod
}

const isRelativePeriod = (period: TimePeriod): period is RelativeTime => (
  !!TIME_PERIODS.find(t => t.key === period)
);

export const PeriodLabel: FC<Props> = ({ period }) => {
  const isRelative = isRelativePeriod(period);

  if (isRelative) {
    return <span>{TIME_PERIODS.find(t => t.key === period).name}</span>;
  }

  const { fromType, fromDate, betweenFromDate, betweenToDate } = period;

  if (fromType === 'Before') {
    return <span>{`Before ${toHyphenedDate(fromDate)}`}</span>;
  }

  if (fromType === 'After') {
    return <span>{`After ${toHyphenedDate(fromDate)}`}</span>;
  }

  return <span>{toHyphenedDate(betweenFromDate)} <Icon name='arrow-right-line' /> {toHyphenedDate(betweenToDate)}</span>;
};
