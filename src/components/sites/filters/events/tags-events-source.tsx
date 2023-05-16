import React from 'react';
import type { FC } from 'react';
import { Label } from 'components/label';
import { Tag } from 'components/tag';
import type { ValueOf } from 'types/common';
import type { EventsCaptureFilters } from 'types/graphql';

interface Props {
  filters: EventsCaptureFilters;
  updateFilters: (key: keyof EventsCaptureFilters, value: ValueOf<EventsCaptureFilters>) => void;
}

export const TagsEventsSource: FC<Props> = ({ filters, updateFilters }) => {
  const onDeleteTag = () => {
    updateFilters('source', null);
  };

  return (
    <div className='tag-group'>
      <Label>Event source</Label>

      <Tag className='secondary' handleDelete={onDeleteTag}>
        {filters.source === 'api' ? 'API' : 'WEB'}
      </Tag>
    </div>
  );
};
