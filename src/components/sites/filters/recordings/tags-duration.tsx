import React from 'react';
import type { FC } from 'react';
import { Label } from 'components/label';
import { Tag } from 'components/tag';
import { defaultFilters } from 'lib/recordings';
import { toTimeString } from 'lib/dates';
import type { ValueOf } from 'types/common';
import type { RecordingsFilters } from 'types/graphql';

interface Props {
  filters: RecordingsFilters;
  updateFilters: (key: keyof RecordingsFilters, value: ValueOf<RecordingsFilters>) => void;
}

export const TagsDuration: FC<Props> = ({ filters, updateFilters }) => {
  const formatTimeString = (value: number) => toTimeString(value).slice(3);

  const onDeleteTag = () => {
    updateFilters('duration', defaultFilters.duration);
  };

  return (
    <>
      <Label>Duration</Label>
    
      {filters.duration.rangeType === 'Between' && (
        <Tag className='secondary' handleDelete={onDeleteTag}>
          <span>Between</span> {formatTimeString(filters.duration.betweenFromDuration)} <span>and</span> {formatTimeString(filters.duration.betweenToDuration)}
        </Tag>
      )}

      {filters.duration.rangeType === 'From' && (
        <Tag className='secondary' handleDelete={onDeleteTag}>
          <span>From</span> {formatTimeString(filters.duration.fromDuration)}
        </Tag>
      )}
    </>
  );
};
