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

export const TagsReferrers: FC<Props> = ({ filters, updateFilters }) => {
  const onDeleteTag = (d: string) => {
    updateFilters('referrers', filters.referrers.filter(x => x !== d));
  };

  return (
    <div className='tag-group'>
      <Label>Traffic source</Label>

      {filters.referrers.map(d => (
        <Tag key={d} className='secondary' handleDelete={() => onDeleteTag(d)}>
          {d === 'none' ? 'Direct (none)' : d}
        </Tag>
      ))}
    </div>
  );
};
