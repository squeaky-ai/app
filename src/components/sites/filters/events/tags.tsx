import React from 'react';
import type { FC } from 'react';
import { Icon } from 'components/icon';
import { Button } from 'components/button';
import { TagsEventsSource } from 'components/sites/filters/events/tags-events-source';
import { TagsEventsType } from 'components/sites/filters/events/tags-events-type';
import type { ValueOf } from 'types/common';
import { EventsCaptureFilters } from 'types/graphql';

interface Props {
  filters: EventsCaptureFilters;
  updateFilters: (key: keyof EventsCaptureFilters, value: ValueOf<EventsCaptureFilters>) => void;
  clearFilters: VoidFunction;
}

export const Tags: FC<Props> = ({ filters, updateFilters, clearFilters }) => {
  const hasType = filters.eventType?.length > 0;
  const hasSource = filters.source !== null;

  const hasFilters = (
    hasType ||
    hasSource
  );

  if (!hasFilters) return null;

  return (
    <div className='filter-tags'>
      {hasType && (
        <TagsEventsType filters={filters} updateFilters={updateFilters} />
      )}

      {hasSource && (
        <TagsEventsSource filters={filters} updateFilters={updateFilters} />
      )}

      <Button className='link clear-filters' onClick={clearFilters}>
        <Icon name='close-line' />
        Clear Filters
      </Button>
    </div>
  );
};
