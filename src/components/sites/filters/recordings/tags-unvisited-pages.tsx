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

export const TagsUnvisitedPages: FC<Props> = ({ filters, updateFilters }) => {
  const onDeleteTag = (v: string) => {
    updateFilters('unvisitedPages', filters.unvisitedPages.filter(x => x !== v));
  };

  return (
    <>
      <Label>Unvisited pages</Label>

      {filters.unvisitedPages.map(v => (
        <Tag key={v} className='secondary' handleDelete={() => onDeleteTag(v)}>{v}</Tag>
      ))}
    </>
  );
};
