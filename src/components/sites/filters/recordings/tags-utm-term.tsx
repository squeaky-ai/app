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

export const TagsUtmTerm: FC<Props> = ({ filters, updateFilters }) => {
  const onDeleteTag = () => {
    updateFilters('utmTerm', null);
  };

  return (
    <>
      <Label>UTM Term</Label>

      <Tag className='secondary' handleDelete={onDeleteTag}>{filters.utmTerm}</Tag>
    </>
  );
};
