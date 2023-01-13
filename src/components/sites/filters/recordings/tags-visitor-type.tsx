import React from 'react';
import type { FC } from 'react';
import { Label } from 'components/label';
import { Tag } from 'components/tag';
import { FILTERS } from 'data/recordings/constants';
import type { ValueOf } from 'types/common';
import type { RecordingsFilters } from 'types/graphql';

type Filters = RecordingsFilters;

interface Props {
  filters: Filters;
  updateFilters: (key: keyof Filters, value: ValueOf<Filters>) => void;
}

export const TagsVisitorType: FC<Props> = ({ filters, updateFilters }) => {
  const onDeleteTag = () => {
    updateFilters('visitorType', FILTERS.visitorType);
  };

  return (
    <div className='tag-group'>
      <Label>Visitor type</Label>

      <Tag className='secondary' handleDelete={onDeleteTag}>{filters.visitorType}</Tag>
    </div>
  );
};
