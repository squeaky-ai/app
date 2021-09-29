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

export const TagsViewport: FC<Props> = ({ filters, updateFilters }) => {
  const onDeleteWidthTag = () => {
    updateFilters('viewport', { ...filters.viewport, minWidth: '', maxWidth: '' });
  };

  const onDeleteHeightTag = () => {
    updateFilters('viewport', { ...filters.viewport, minHeight: '', maxHeight: '' });
  };

  return (
    <>
      <Label>Viewport</Label>

      {(filters.viewport.minWidth || filters.viewport.maxWidth) && (
        <Tag className='secondary' handleDelete={onDeleteWidthTag}>
          <span>Width</span> {filters.viewport.minWidth || 'any'} - {filters.viewport.maxWidth || 'any'} pixels
        </Tag>
      )}

      {(filters.viewport.minHeight || filters.viewport.maxHeight) && (
        <Tag className='secondary' handleDelete={onDeleteHeightTag}>
          <span>Height</span> {filters.viewport.minHeight || 'any'} - {filters.viewport.maxHeight || 'any'} pixels
        </Tag>
      )}
    </>
  );
};
