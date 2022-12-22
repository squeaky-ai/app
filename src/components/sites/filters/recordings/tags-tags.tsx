import React from 'react';
import type { FC } from 'react';
import { Label } from 'components/label';
import { Tag } from 'components/tag';
import { useTags } from 'hooks/use-tags';
import type { ValueOf } from 'types/common';
import type { RecordingsFilters } from 'types/graphql';

interface Props {
  filters: RecordingsFilters;
  updateFilters: (key: keyof RecordingsFilters, value: ValueOf<RecordingsFilters>) => void;
}

export const TagsTags: FC<Props> = ({ filters, updateFilters }) => {
  const { tags } = useTags();

  const onDeleteTag = (d: number) => {
    updateFilters('tags', filters.tags.filter(x => x !== d));
  };

  const getTagName = (id: number) => tags.find(t => t.id === id.toString())?.name || id;

  return (
    <div className='tag-group'>
      <Label>Tags</Label>

      {filters.tags.map(d => (
        <Tag key={d} className='secondary' handleDelete={() => onDeleteTag(d)}>
          {getTagName(d)}
        </Tag>
      ))}
    </div>
  );
};
