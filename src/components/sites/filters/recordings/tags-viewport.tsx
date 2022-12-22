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

export const TagsViewport: FC<Props> = ({ filters, updateFilters }) => {
  const onDeleteWidthTag = () => {
    updateFilters('viewport', { ...filters.viewport, minWidth: null, maxWidth: null });
  };

  const onDeleteHeightTag = () => {
    updateFilters('viewport', { ...filters.viewport, minHeight: null, maxHeight: null });
  };

  return (
    <>
      <Label>Viewport</Label>

      {(filters.viewport.minWidth || filters.viewport.maxWidth) && (
        <Tag className='secondary' handleDelete={onDeleteWidthTag}>
          <span>Width</span> {filters.viewport.minWidth || 'Any'} - {filters.viewport.maxWidth || 'Any'} pixels
        </Tag>
      )}

      {(filters.viewport.minHeight || filters.viewport.maxHeight) && (
        <Tag className='secondary' handleDelete={onDeleteHeightTag}>
          <span>Height</span> {filters.viewport.minHeight || 'Any'} - {filters.viewport.maxHeight || 'Any'} pixels
        </Tag>
      )}
    </>
  );
};
