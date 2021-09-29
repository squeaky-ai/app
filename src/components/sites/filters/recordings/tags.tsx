import React from 'react';
import type { FC } from 'react';
import { Label } from 'components/label';
import { Tag } from 'components/tag';
import type { Filters } from 'types/recording';
import { Button } from 'components/button';

interface Props {
  filters: Filters;
  clearFilters: VoidFunction;
}

export const Tags: FC<Props> = ({ filters, clearFilters }) => {
  const hasFilters = filters.date.dateRangeType ||
    filters.status ||
    filters.duration.durationRangeType ||
    filters.startUrl ||
    filters.exitUrl ||
    filters.visitedPages.length > 0 ||
    filters.unvisitedPages.length > 0 ||
    filters.devices.length > 0 ||
    filters.browsers.length > 0 ||
    (filters.viewport.minWidth || filters.viewport.maxWidth) ||
    (filters.viewport.minHeight || filters.viewport.maxHeight) ||
    filters.languages.length > 0;

  if (!hasFilters) return null;

  return (
    <div className='filter-tags'>
      {filters.date.dateRangeType && (
        <>
          <Label>Date</Label>
          {filters.date.dateRangeType === 'Between' && (
            <Tag className='secondary' handleDelete={console.log}>
              <span>Between</span> {filters.date.betweenFromDate} <span>and</span> {filters.date.betweenToDate}
            </Tag>
          )}
          {filters.date.dateRangeType === 'From' && (
            <Tag className='secondary' handleDelete={console.log}>
              <span>From</span> {filters.date.fromDate}
            </Tag>
          )}
        </>
      )}

      {filters.status && (
        <>
          <Label>Status</Label>
          <Tag className='secondary' handleDelete={console.log}>{filters.status}</Tag>
        </>
      )}

      {filters.duration.durationRangeType && (
        <>
          <Label>Duration</Label>
          {filters.duration.durationRangeType === 'Between' && (
            <Tag className='secondary' handleDelete={console.log}>
              <span>Between</span> {filters.duration.betweenFromDuration} <span>and</span> {filters.duration.betweenToDuration}
            </Tag>
          )}
          {filters.duration.durationRangeType === 'From' && (
            <Tag className='secondary' handleDelete={console.log}>
              <span>From</span> {filters.duration.fromDuration}
            </Tag>
          )}
        </>
      )}

      {filters.startUrl && (
        <>
          <Label>Start URL</Label>
          <Tag className='secondary' handleDelete={console.log}>{filters.startUrl}</Tag>
        </>
      )}

      {filters.exitUrl && (
        <>
          <Label>Exit URL</Label>
          <Tag className='secondary' handleDelete={console.log}>{filters.exitUrl}</Tag>
        </>
      )}

      {filters.visitedPages.length > 0 && (
        <>
          <Label>Visited pages</Label>
          {filters.visitedPages.map(v => (
            <Tag key={v} className='secondary' handleDelete={console.log}>{v}</Tag>
          ))}
        </>
      )}

      {filters.unvisitedPages.length > 0 && (
        <>
          <Label>Unvisited pages</Label>
          {filters.unvisitedPages.map(u => (
            <Tag key={u} className='secondary' handleDelete={console.log}>{u}</Tag>
          ))}
        </>
      )}

      {filters.devices.length > 0 && (
        <>
          <Label>Devices</Label>
          {filters.devices.map(d => (
            <Tag key={d} className='secondary' handleDelete={console.log}>{d}</Tag>
          ))}
        </>
      )}

      {filters.browsers.length > 0 && (
        <>
          <Label>Browser</Label>
          {filters.browsers.map(b => (
            <Tag key={b} className='secondary' handleDelete={console.log}>{b}</Tag>
          ))}
        </>
      )}

      {((filters.viewport.minWidth || filters.viewport.maxWidth) || (filters.viewport.minHeight || filters.viewport.maxHeight)) && (
        <>
          <Label>Viewport</Label>
          {(filters.viewport.minWidth || filters.viewport.maxWidth) && (
            <Tag className='secondary' handleDelete={console.log}>
              <span>Width</span> {filters.viewport.minWidth || 'any'} - {filters.viewport.maxWidth || 'any'} pixels
            </Tag>
          )}
          {(filters.viewport.minHeight || filters.viewport.maxHeight) && (
            <Tag className='secondary' handleDelete={console.log}>
              <span>Height</span> {filters.viewport.minHeight || 'any'} - {filters.viewport.maxHeight || 'any'} pixels
            </Tag>
          )}
        </>
      )}

      {filters.languages.length > 0 && (
        <>
          <Label>Languages</Label>
          {filters.languages.map(l => (
            <Tag key={l} className='secondary' handleDelete={console.log}>{l}</Tag>
          ))}
        </>
      )}

      <Button className='link clear-filters' onClick={clearFilters}>
        <i className='ri-close-line' />
        Clear Filters
      </Button>
    </div>
  );
};
