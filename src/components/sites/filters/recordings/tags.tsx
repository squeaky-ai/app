import React from 'react';
import type { FC } from 'react';
import { Button } from 'components/button';
import { TagsDate } from 'components/sites/filters/recordings/tags-date';
import { TagsDuration } from 'components/sites/filters/recordings/tags-duration';
import { TagsStatus } from 'components/sites/filters/common/tags-status';
import { TagsStartUrl } from 'components/sites/filters/common/tags-start-page';
import { TagsExitUrl } from 'components/sites/filters/common/tags-exit-url';
import { TagsVisitedPages } from 'components/sites/filters/common/tags-visited-pages';
import { TagsUnvisitedPages } from 'components/sites/filters/common/tags-unvisited-pages';
import { TagsDevices } from 'components/sites/filters/recordings/tags-devices';
import { TagsBrowsers } from 'components/sites/filters/recordings/tags-browsers';
import { TagsLanguages } from 'components/sites/filters/common/tags-languages';
import { TagsViewport } from 'components/sites/filters/recordings/tags-viewport';
import type { Filters } from 'types/recording';
import type { ValueOf } from 'types/common';

interface Props {
  filters: Filters;
  updateFilters: (key: keyof Filters, value: ValueOf<Filters>) => void;
  clearFilters: VoidFunction;
}

export const Tags: FC<Props> = ({ filters, updateFilters, clearFilters }) => {
  const hasDateRange = filters.date.rangeType !== null;
  const hasStatus = filters.status !== null;
  const hasDuration = filters.duration.rangeType !== null;
  const hasStartUrl = filters.startUrl !== null;
  const hasExitUrl = filters.exitUrl !== null;
  const hasVisitedPages = filters.visitedPages.length > 0;
  const hasUnvisitedPages = filters.unvisitedPages.length > 0;
  const hasDevices = filters.devices.length > 0;
  const hasBrowsers = filters.browsers.length > 0;
  const hasViewportWidth = !!(filters.viewport.minWidth || filters.viewport.maxWidth);
  const hasViewportHeight = !!(filters.viewport.minHeight || filters.viewport.maxHeight);
  const hasLanguages = filters.languages.length > 0;

  const hasFilters = (
    hasDateRange ||
    hasStatus ||
    hasDuration ||
    hasStartUrl ||
    hasExitUrl ||
    hasVisitedPages ||
    hasUnvisitedPages ||
    hasDevices ||
    hasBrowsers ||
    hasViewportWidth ||
    hasViewportHeight ||
    hasLanguages
  );

  if (!hasFilters) return null;

  return (
    <div className='filter-tags'>
      {hasDateRange && (
        <TagsDate filters={filters} updateFilters={updateFilters} />
      )}

      {hasStatus && (
        <TagsStatus filters={filters} updateFilters={updateFilters} />
      )}

      {hasDuration && (
        <TagsDuration filters={filters} updateFilters={updateFilters} />
      )}

      {hasStartUrl && (
        <TagsStartUrl filters={filters} updateFilters={updateFilters} />
      )}

      {hasExitUrl && (
        <TagsExitUrl filters={filters} updateFilters={updateFilters} />
      )}

      {hasVisitedPages && (
        <TagsVisitedPages filters={filters} updateFilters={updateFilters} />
      )}

      {hasUnvisitedPages && (
        <TagsUnvisitedPages filters={filters} updateFilters={updateFilters} />
      )}

      {hasDevices && (
        <TagsDevices filters={filters} updateFilters={updateFilters} />
      )}

      {hasBrowsers && (
        <TagsBrowsers filters={filters} updateFilters={updateFilters} />
      )}

      {(hasViewportWidth || hasViewportHeight) && (
        <TagsViewport filters={filters} updateFilters={updateFilters} />
      )}

      {hasLanguages && (
        <TagsLanguages filters={filters} updateFilters={updateFilters} />
      )}

      <Button className='link clear-filters' onClick={clearFilters}>
        <i className='ri-close-line' />
        Clear Filters
      </Button>
    </div>
  );
};
