import React from 'react';
import type { FC } from 'react';
import { Label } from 'components/label';
import { Tag } from 'components/tag';
import { defaultFilters } from 'lib/visitors';
import type { ValueOf } from 'types/common';
import type { VisitorsFilters } from 'types/graphql';

interface Props {
  name: 'firstVisited' | 'lastActivity';
  filters: VisitorsFilters;
  updateFilters: (key: keyof VisitorsFilters, value: ValueOf<VisitorsFilters>) => void;
}

export const TagsDate: FC<Props> = ({ name, filters, updateFilters }) => {
  const onDeleteTag = () => {
    updateFilters(name, defaultFilters[name]);
  };

  return (
    <>
      <Label>Date</Label>

      {filters[name].rangeType === 'Between' && (
        <Tag className='secondary' handleDelete={onDeleteTag}>
          <span>Between</span> {filters[name].betweenFromDate} <span>and</span> {filters[name].betweenToDate}
        </Tag>
      )}

      {filters[name].rangeType === 'From' && (
        <Tag className='secondary' handleDelete={onDeleteTag}>
          <span>From</span> {filters[name].fromDate}
        </Tag>
      )}
    </>
  );
};
