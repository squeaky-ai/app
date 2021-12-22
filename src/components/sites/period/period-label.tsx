import React from 'react';
import type { FC } from 'react';
import { Icon } from 'components/icon';
import { TIME_PERIODS } from 'data/common/constants';
import type { TimePeriod, RelativeTime } from 'types/common';

interface Props {
  period: TimePeriod
}

const isRelativePeriod = (period: TimePeriod): period is RelativeTime => {
  return !!TIME_PERIODS.find(t => t.key === period);
};

export const PeriodLabel: FC<Props> = ({ period }) => {
  const isRelative = isRelativePeriod(period);

  if (isRelative) {
    return <span>{TIME_PERIODS.find(t => t.key === period).name}</span>;
  }

  const { type, fromDate, betweenFromDate, betweenToDate } = period;

  if (type === 'Before') {
    return <span>{`Before ${fromDate}`}</span>;
  }

  if (type === 'After') {
    return <span>{`After ${fromDate}`}</span>;
  }

  return <span>{betweenFromDate} <Icon name='arrow-right-line' /> {betweenToDate}</span>;
};
