import React from 'react';
import type { FC } from 'react';
import { Label } from 'components/label';
import { Tag } from 'components/tag';
import type { ValueOf } from 'types/common';
import type { RecordingsFilters } from 'types/graphql';
import type { VisitorsFilters } from 'types/visitors';

type Filters = RecordingsFilters | VisitorsFilters;

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
