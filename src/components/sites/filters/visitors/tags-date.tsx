import React from 'react';
import type { FC } from 'react';
import { Label } from 'components/label';
import { Tag } from 'components/tag';
import { FILTERS } from 'data/visitors/constants';
import { toHyphenedDate } from 'lib/dates';
import { TIME_PERIODS } from 'data/common/constants';
import type { ValueOf } from 'types/common';
import type { VisitorsFilters } from 'types/visitors';

interface Props {
  name: 'firstVisited' | 'lastActivity';
  filters: VisitorsFilters;
  updateFilters: (key: keyof VisitorsFilters, value: ValueOf<VisitorsFilters>) => void;
}

export const TagsDate: FC<Props> = ({ name, filters, updateFilters }) => {
  const onDeleteTag = () => {
    updateFilters(name, FILTERS[name]);
  };

  const value = filters[name];
  const label = name === 'firstVisited' ? 'First Visited' : 'Last Activity';

  if (value === null) return null;

  const isRealtivePeriod = typeof value === 'string';
  const relativePeriod = TIME_PERIODS.find(p => p.key === value);

  return (
    <div className='tag-group'>
      <Label>{label}</Label>

      {relativePeriod && (
        <Tag className='secondary' handleDelete={onDeleteTag}>
          {relativePeriod.name}
        </Tag>
      )}

      {!isRealtivePeriod && value.fromType === 'Before' && (
        <Tag className='secondary' handleDelete={onDeleteTag}>
          <span>Before</span> {toHyphenedDate(value.fromDate)}
        </Tag>
      )}

      {!isRealtivePeriod && value.fromType === 'After' && (
        <Tag className='secondary' handleDelete={onDeleteTag}>
          <span>After</span> {toHyphenedDate(value.fromDate)}
        </Tag>
      )}

      {!isRealtivePeriod && value.fromType === 'Between' && (
        <Tag className='secondary' handleDelete={onDeleteTag}>
          <span>Between</span> {toHyphenedDate(value.betweenFromDate)} and {toHyphenedDate(value.betweenToDate)}
        </Tag>
      )}
    </div>
  );
};
