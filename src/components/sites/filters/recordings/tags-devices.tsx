import React from 'react';
import type { FC } from 'react';
import { Label } from 'components/label';
import { Tag } from 'components/tag';
import type { ValueOf } from 'types/common';
import type { Filters } from 'types/recording';

interface Props {
  filters: Filters;
  updateFilters: (key: keyof Filters, value: ValueOf<Filters>) => void;
}

export const TagsDevices: FC<Props> = ({ filters, updateFilters }) => {
  const onDeleteTag = (d: string) => {
    updateFilters('devices', filters.devices.filter(x => x !== d));
  };

  return (
    <>
      <Label>Devices</Label>

      {filters.devices.map(d => (
        <Tag key={d} className='secondary' handleDelete={() => onDeleteTag(d)}>{d}</Tag>
      ))}
    </>
  );
};
