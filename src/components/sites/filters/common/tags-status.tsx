import React from 'react';
import type { FC } from 'react';
import { Label } from 'components/label';
import { Tag } from 'components/tag';
import { FILTERS } from 'data/recordings/constants';
import type { ValueOf } from 'types/common';
import type { RecordingsFilters } from 'types/graphql';
import type { VisitorsFilters } from 'types/visitors';

type Filters = RecordingsFilters | VisitorsFilters;

interface Props {
  filters: Filters;
  updateFilters: (key: keyof Filters, value: ValueOf<Filters>) => void;
}

export const TagsStatus: FC<Props> = ({ filters, updateFilters }) => {
  const onDeleteTag = () => {
    updateFilters('status', FILTERS.status);
  };

  return (
    <>
      <Label>Status</Label>

      <Tag className='secondary' handleDelete={onDeleteTag}>{filters.status}</Tag>
    </>
  );
};
