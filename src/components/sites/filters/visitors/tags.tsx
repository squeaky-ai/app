import React from 'react';
import type { FC } from 'react';
import { Icon } from 'components/icon';
import { Button } from 'components/button';
import { TagsStatus } from 'components/sites/filters/common/tags-status';
import { TagsDate } from 'components/sites/filters/visitors/tags-date';
import { TagsLanguages } from 'components/sites/filters/common/tags-languages';
import { TagsRecordings } from 'components/sites/filters/visitors/tags-recordings';
import type { VisitorsFilters } from 'types/graphql';
import type { ValueOf } from 'types/common';

interface Props {
  filters: VisitorsFilters;
  updateFilters: (key: keyof VisitorsFilters, value: ValueOf<VisitorsFilters>) => void;
  clearFilters: VoidFunction;
}

export const Tags: FC<Props> = ({ filters, updateFilters, clearFilters }) => {
  const hasStatus = filters.status !== null;
  const hasRecordings = filters.recordings.count !== null;
  const hasFirstVisited = filters.firstVisited.rangeType !== null;
  const hasLastActivity = filters.lastActivity.rangeType !== null;
  const hasLanguages = filters.languages.length > 0;

  const hasFilters = (
    hasStatus ||
    hasRecordings ||
    hasFirstVisited ||
    hasLastActivity ||
    hasLanguages
  );

  if (!hasFilters) return null;

  return (
    <div className='filter-tags'>
      {hasStatus && (
        <TagsStatus filters={filters} updateFilters={updateFilters} />
      )}

      {hasRecordings && (
        <TagsRecordings filters={filters} updateFilters={updateFilters} />
      )}

      {hasFirstVisited && (
        <TagsDate filters={filters} updateFilters={updateFilters} name='firstVisited' />
      )}

      {hasLastActivity && (
        <TagsDate filters={filters} updateFilters={updateFilters} name='lastActivity' />
      )}

      {hasLanguages && (
        <TagsLanguages filters={filters} updateFilters={updateFilters} />
      )}

      <Button className='link clear-filters' onClick={clearFilters}>
        <Icon name='close-line' />
        Clear Filters
      </Button>
    </div>
  );
};
