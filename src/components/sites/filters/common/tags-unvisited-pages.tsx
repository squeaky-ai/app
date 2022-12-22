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

export const TagsUnvisitedPages: FC<Props> = ({ filters, updateFilters }) => {
  const onDeleteTag = (v: string) => {
    updateFilters('unvisitedPages', filters.unvisitedPages.filter(x => x !== v));
  };

  return (
    <div className='tag-group'>
      <Label>Unvisited pages</Label>

      {filters.unvisitedPages.map(v => (
        <Tag key={v} className='secondary' handleDelete={() => onDeleteTag(v)}>{v}</Tag>
      ))}
    </div>
  );
};
