import React from 'react';
import type { FC } from 'react';
import { Label } from 'components/label';
import { Tag } from 'components/tag';
import { FILTERS } from 'data/recordings/constants';
import type { ValueOf } from 'types/common';
import type { RecordingsFilters } from 'types/graphql';

interface Props {
  filters: RecordingsFilters;
  updateFilters: (key: keyof RecordingsFilters, value: ValueOf<RecordingsFilters>) => void;
}

export const TagsDate: FC<Props> = ({ filters, updateFilters }) => {
  const onDeleteTag = () => {
    updateFilters('date', FILTERS.date);
  };

  return (
    <>
      <Label>Date</Label>

      {filters.date.rangeType === 'Between' && (
        <Tag className='secondary' handleDelete={onDeleteTag}>
          <span>Between</span> {filters.date.betweenFromDate} <span>and</span> {filters.date.betweenToDate}
        </Tag>
      )}

      {filters.date.rangeType === 'From' && (
        <Tag className='secondary' handleDelete={onDeleteTag}>
          <span>From</span> {filters.date.fromDate}
        </Tag>
      )}
    </>
  );
};
