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

export const TagsVisitedPages: FC<Props> = ({ filters, updateFilters }) => {
  const onDeleteTag = (v: string) => {
    updateFilters('visitedPages', filters.visitedPages.filter(x => x !== v));
  };

  return (
    <>
      <Label>Visited pages</Label>

      {filters.visitedPages.map(v => (
        <Tag key={v} className='secondary' handleDelete={() => onDeleteTag(v)}>{v}</Tag>
      ))}
    </>
  );
};
