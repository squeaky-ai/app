import React from 'react';
import type { FC } from 'react';
import { Label } from 'components/label';
import { Tag } from 'components/tag';
import { defaultFilters } from 'lib/visitors';
import type { ValueOf } from 'types/common';
import type { VisitorsFilters } from 'types/graphql';

interface Props {
  filters: VisitorsFilters;
  updateFilters: (key: keyof VisitorsFilters, value: ValueOf<VisitorsFilters>) => void;
}

export const TagsRecordings: FC<Props> = ({ filters, updateFilters }) => {
  const onDeleteTag = () => {
    updateFilters('recordings', defaultFilters.recordings);
  };

  return (
    <>
      <Label>Recordings</Label>

      <Tag className='secondary' handleDelete={onDeleteTag}>
        <span>{filters.recordings.rangeType === 'GreaterThan' ? 'More' : 'Less' } than </span> {filters.recordings.count}
      </Tag>
    </>
  );
};
