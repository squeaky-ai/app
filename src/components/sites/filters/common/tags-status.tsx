import React from 'react';
import type { FC } from 'react';
import { Label } from 'components/label';
import { Tag } from 'components/tag';
import { defaultFilters } from 'lib/recordings';
import type { ValueOf } from 'types/common';
import type { Filters as RecordingsFilters } from 'types/recording';
import type { Filters as VisitorFilters } from 'types/visitor';

type Filters = RecordingsFilters | VisitorFilters;

interface Props {
  filters: Filters;
  updateFilters: (key: keyof Filters, value: ValueOf<Filters>) => void;
}

export const TagsStatus: FC<Props> = ({ filters, updateFilters }) => {
  const onDeleteTag = () => {
    updateFilters('status', defaultFilters.status);
  };

  return (
    <>
      <Label>Status</Label>

      <Tag className='secondary' handleDelete={onDeleteTag}>{filters.status}</Tag>
    </>
  );
};
