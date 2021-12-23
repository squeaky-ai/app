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

export const TagsReferrers: FC<Props> = ({ filters, updateFilters }) => {
  const onDeleteTag = (d: string) => {
    updateFilters('referrers', filters.referrers.filter(x => x !== d));
  };

  return (
    <>
      <Label>Traffic source</Label>

      {filters.referrers.map(d => (
        <Tag key={d} className='secondary' handleDelete={() => onDeleteTag(d)}>
          {d === 'none' ? 'Direct (none)' : d}
        </Tag>
      ))}
    </>
  );
};
