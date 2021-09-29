import React from 'react';
import type { FC } from 'react';
import { Label } from 'components/label';
import { Tag } from 'components/tag';
import { defaultFilters } from 'lib/recordings';
import type { ValueOf } from 'types/common';
import type { Filters } from 'types/recording';

interface Props {
  filters: Filters;
  updateFilters: (key: keyof Filters, value: ValueOf<Filters>) => void;
}

export const TagsDuration: FC<Props> = ({ filters, updateFilters }) => {
  const onDeleteTag = () => {
    updateFilters('duration', defaultFilters.duration);
  };

  return (
    <>
      <Label>Duration</Label>
    
      {filters.duration.durationRangeType === 'Between' && (
        <Tag className='secondary' handleDelete={onDeleteTag}>
          <span>Between</span> {filters.duration.betweenFromDuration} <span>and</span> {filters.duration.betweenToDuration}
        </Tag>
      )}

      {filters.duration.durationRangeType === 'From' && (
        <Tag className='secondary' handleDelete={onDeleteTag}>
          <span>From</span> {filters.duration.fromDuration}
        </Tag>
      )}
    </>
  );
};
