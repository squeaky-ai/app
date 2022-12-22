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

export const TagsExitUrl: FC<Props> = ({ filters, updateFilters }) => {
  const onDeleteTag = () => {
    updateFilters('exitUrl', null);
  };

  return (
    <div className='tag-group'>
      <Label>Exit URL</Label>

      <Tag className='secondary' handleDelete={onDeleteTag}>{filters.exitUrl}</Tag>
    </div>
  );
};
