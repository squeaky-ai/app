import React from 'react';
import type { FC } from 'react';
import { Label } from 'components/label';
import { Tag } from 'components/tag';
import type { ValueOf } from 'types/common';
import type { RecordingsFilters } from 'types/graphql';

interface Props {
  filters: RecordingsFilters;
  updateFilters: (key: keyof RecordingsFilters, value: ValueOf<RecordingsFilters>) => void;
}

export const TagsStarred: FC<Props> = ({ filters, updateFilters }) => {
  const onDeleteTag = () => {
    updateFilters('starred', null);
  };

  return (
    <>
      <Label>Starred</Label>

      <Tag className='secondary' handleDelete={onDeleteTag}>{filters.starred ? 'Yes' : 'No'}</Tag>
    </>
  );
};
