import React from 'react';
import type { FC } from 'react';
import { Icon } from 'components/icon';
import { Button } from 'components/button';
import { TagsDuration } from 'components/sites/filters/recordings/tags-duration';
import { TagsStatus } from 'components/sites/filters/common/tags-status';
import { TagsStartUrl } from 'components/sites/filters/recordings/tags-start-page';
import { TagsExitUrl } from 'components/sites/filters/recordings/tags-exit-url';
import { TagsVisitedPages } from 'components/sites/filters/common/tags-visited-pages';
import { TagsUnvisitedPages } from 'components/sites/filters/common/tags-unvisited-pages';
import { TagsDevices } from 'components/sites/filters/recordings/tags-devices';
import { TagsBrowsers } from 'components/sites/filters/common/tags-browsers';
import { TagsLanguages } from 'components/sites/filters/common/tags-languages';
import { TagsViewport } from 'components/sites/filters/recordings/tags-viewport';
import { TagsBookmarked } from 'components/sites/filters/recordings/tags-bookmarked';
import { TagsReferrers } from 'components/sites/filters/common/tags-referrers';
import { TagsStarred } from 'components/sites/filters/common/tags-starred';
import { TagsTags } from 'components/sites/filters/recordings/tags-tags';
import { TagsUtmCampaign } from 'components/sites/filters/recordings/tags-utm-campaign';
import { TagsUtmContent } from 'components/sites/filters/recordings/tags-utm-content';
import { TagsUtmMedium } from 'components/sites/filters/recordings/tags-utm-medium';
import { TagsUtmSource } from 'components/sites/filters/recordings/tags-utm-source';
import { TagsUtmTerm } from 'components/sites/filters/recordings/tags-utm-term';
import { TagsVisitorType } from 'components/sites/filters/recordings/tags-visitor-type';
import type { RecordingsFilters } from 'types/graphql';
import type { ValueOf } from 'types/common';

interface Props {
  filters: RecordingsFilters;
  updateFilters: (key: keyof RecordingsFilters, value: ValueOf<RecordingsFilters>) => void;
  clearFilters: VoidFunction;
}

export const Tags: FC<Props> = ({ filters, updateFilters, clearFilters }) => {
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
  const hasBookmarked = filters.bookmarked !== null;
  const hasReferrers = filters.referrers.length > 0;
  const hasStarred = filters.starred !== null;
  const hasTags = filters.tags.length > 0;
  const hasUtmCampaign = filters.utmCampaign !== null;
  const hasUtmContent = filters.utmContent !== null;
  const hasUtmMedium = filters.utmMedium !== null;
  const hasUtmSource = filters.utmSource !== null;
  const hasUtmTerm = filters.utmTerm !== null;
  const hasVisitorType = filters.visitorType !== null;

  const hasFilters = (
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
    hasLanguages ||
    hasBookmarked ||
    hasReferrers ||
    hasStarred ||
    hasTags ||
    hasUtmCampaign ||
    hasUtmContent ||
    hasUtmSource ||
    hasUtmMedium ||
    hasUtmTerm ||
    hasVisitorType
  );

  if (!hasFilters) return null;

  return (
    <div className='filter-tags'>
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

      {hasBookmarked && (
        <TagsBookmarked filters={filters} updateFilters={updateFilters} />
      )}

      {hasReferrers && (
        <TagsReferrers filters={filters} updateFilters={updateFilters} />
      )}

      {hasStarred && (
        <TagsStarred filters={filters} updateFilters={updateFilters} />
      )}

      {hasTags && (
        <TagsTags filters={filters} updateFilters={updateFilters} />
      )}

      {hasUtmCampaign && (
        <TagsUtmCampaign filters={filters} updateFilters={updateFilters} />
      )}

      {hasUtmContent && (
        <TagsUtmContent filters={filters} updateFilters={updateFilters} />
      )}

      {hasUtmMedium && (
        <TagsUtmMedium filters={filters} updateFilters={updateFilters} />
      )}

      {hasUtmSource && (
        <TagsUtmSource filters={filters} updateFilters={updateFilters} />
      )}

      {hasUtmTerm && (
        <TagsUtmTerm filters={filters} updateFilters={updateFilters} />
      )}

      {hasVisitorType && (
        <TagsVisitorType filters={filters} updateFilters={updateFilters} />
      )}

      <Button className='link clear-filters' onClick={clearFilters}>
        <Icon name='close-line' />
        Clear Filters
      </Button>
    </div>
  );
};
