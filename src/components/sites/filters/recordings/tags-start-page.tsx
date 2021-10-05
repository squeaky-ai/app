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

export const TagsStartUrl: FC<Props> = ({ filters, updateFilters }) => {
  const onDeleteTag = () => {
    updateFilters('startUrl', null);
  };

  return (
    <>
      <Label>Start URL</Label>

      <Tag className='secondary' handleDelete={onDeleteTag}>{filters.startUrl}</Tag>
    </>
  );
};
