import React from 'react';
import type { FC } from 'react';
import { Label } from 'components/label';
import { Tag } from 'components/tag';
import type { ValueOf } from 'types/common';
import type { Filters as RecordingsFilters } from 'types/recording';
import type { Filters as VisitorFilters } from 'types/visitor';

type Filters = RecordingsFilters | VisitorFilters;

interface Props {
  filters: Filters;
  updateFilters: (key: keyof Filters, value: ValueOf<Filters>) => void;
}

export const TagsLanguages: FC<Props> = ({ filters, updateFilters }) => {
  const onDeleteTag = (l: string) => {
    updateFilters('languages', filters.languages.filter(x => x !== l));
  };

  return (
    <>
      <Label>Languages</Label>

      {filters.languages.map(l => (
        <Tag key={l} className='secondary' handleDelete={() => onDeleteTag(l)}>{l}</Tag>
      ))}
    </>
  );
};
