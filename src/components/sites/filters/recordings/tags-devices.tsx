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

export const TagsDevices: FC<Props> = ({ filters, updateFilters }) => {
  const onDeleteTag = (d: string) => {
    updateFilters('devices', filters.devices.filter(x => x !== d));
  };

  return (
    <div className='tag-group'>
      <Label>Devices</Label>

      {filters.devices.map(d => (
        <Tag key={d} className='secondary' handleDelete={() => onDeleteTag(d)}>{d}</Tag>
      ))}
    </div>
  );
};
