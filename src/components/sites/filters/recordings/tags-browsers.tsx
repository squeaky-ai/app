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

export const TagsBrowsers: FC<Props> = ({ filters, updateFilters }) => {
  const onDeleteTag = (b: string) => {
    updateFilters('browsers', filters.browsers.filter(x => x !== b));
  };

  return (
    <>
      <Label>Browser</Label>

      {filters.browsers.map(b => (
        <Tag key={b} className='secondary' handleDelete={() => onDeleteTag(b)}>{b}</Tag>
      ))}
    </>
  );
};
