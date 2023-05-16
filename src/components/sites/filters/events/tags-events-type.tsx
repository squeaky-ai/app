import React from 'react';
import type { FC } from 'react';
import { Label } from 'components/label';
import { Tag } from 'components/tag';
import { getEventCaptureText } from 'lib/events';
import { EventsCaptureType } from 'types/events';
import type { ValueOf } from 'types/common';
import type { EventsCaptureFilters } from 'types/graphql';

interface Props {
  filters: EventsCaptureFilters;
  updateFilters: (key: keyof EventsCaptureFilters, value: ValueOf<EventsCaptureFilters>) => void;
}

export const TagsEventsType: FC<Props> = ({ filters, updateFilters }) => {
  const onDeleteTag = (type: EventsCaptureType) => () => {
    const types = filters.eventType.filter(e => e !== type);
    updateFilters('eventType', types);
  };

  return (
    <div className='tag-group'>
      <Label>Event source</Label>

      {filters.eventType.map(type => (
        <Tag className='secondary' key={type} handleDelete={onDeleteTag(type)}>
          {getEventCaptureText(type)}
        </Tag>
      ))}
    </div>
  );
};
