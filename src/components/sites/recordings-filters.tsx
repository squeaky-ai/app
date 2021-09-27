import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import { Button } from 'components/button';
import { Dropdown } from 'components/dropdown';
import { Label } from 'components/label';

enum FilterType {
  Date,
  Status,
  Duration,
  StartUrl,
  ExitUrl,
  VisitedPages,
  UnvisitedPages,
  Device,
  Browser,
  Viewport,
  Language
}

export const RecordingsFilters: FC = () => {
  const [openFilter, setOpenFilter] = React.useState<FilterType | null>(null);

  const handleFilterChange = (filter: FilterType): void => {
    setOpenFilter(openFilter === filter ? null : filter);
  };

  return (
    <div className='menu-item'>
      <Dropdown button={<><i className='ri-equalizer-line' /> Filters</>} dropdown-menu='down'>
        <Button onClick={() => handleFilterChange(FilterType.Date)} className={classnames({ open: openFilter === FilterType.Date})}>
          <i className='ri-arrow-drop-left-line' />
          Date
        </Button>
        <Button onClick={() => handleFilterChange(FilterType.Status)} className={classnames({ open: openFilter === FilterType.Status})}>
          <i className='ri-arrow-drop-left-line' />
          Status
        </Button>
        <Button onClick={() => handleFilterChange(FilterType.Duration)} className={classnames({ open: openFilter === FilterType.Duration})}>
          <i className='ri-arrow-drop-left-line' />
          Duration
        </Button>
        <Button onClick={() => handleFilterChange(FilterType.StartUrl)} className={classnames({ open: openFilter === FilterType.StartUrl})}>
          <i className='ri-arrow-drop-left-line' />
          Start URL
        </Button>
        <Button onClick={() => handleFilterChange(FilterType.ExitUrl)} className={classnames({ open: openFilter === FilterType.ExitUrl})}>
          <i className='ri-arrow-drop-left-line' />
          Exit URL
        </Button>
        <Button onClick={() => handleFilterChange(FilterType.VisitedPages)} className={classnames({ open: openFilter === FilterType.VisitedPages})}>
          <i className='ri-arrow-drop-left-line' />
          Visited pages
        </Button>
        <Button onClick={() => handleFilterChange(FilterType.UnvisitedPages)} className={classnames({ open: openFilter === FilterType.UnvisitedPages})}>
          <i className='ri-arrow-drop-left-line' />
          Unvisited pages
        </Button>
        <Button onClick={() => handleFilterChange(FilterType.Device)} className={classnames({ open: openFilter === FilterType.Device})}>
          <i className='ri-arrow-drop-left-line' />
          Device
        </Button>
        <Button onClick={() => handleFilterChange(FilterType.Browser)} className={classnames({ open: openFilter === FilterType.Browser})}>
          <i className='ri-arrow-drop-left-line' />
          Browser
        </Button>
        <Button onClick={() => handleFilterChange(FilterType.Viewport)} className={classnames({ open: openFilter === FilterType.Viewport})}>
          <i className='ri-arrow-drop-left-line' />
          Viewport
        </Button>
        <Button onClick={() => handleFilterChange(FilterType.Language)} className={classnames({ open: openFilter === FilterType.Language})}>
          <i className='ri-arrow-drop-left-line' />
          Language
        </Button>

        <div className={classnames('popout', { open: openFilter !== null })}>
          {openFilter === FilterType.Date && (
            <>
              <Label>Date</Label>
            </>
          )}
          {openFilter === FilterType.Status && (
            <>
              <Label>Status</Label>
            </>
          )}
          {openFilter === FilterType.Duration && (
            <>
              <Label>Duration</Label>
            </>
          )}
          {openFilter === FilterType.StartUrl && (
            <>
              <Label>Start URL</Label>
            </>
          )}
          {openFilter === FilterType.ExitUrl && (
            <>
              <Label>Exit URL</Label>
            </>
          )}
          {openFilter === FilterType.VisitedPages && (
            <>
              <Label>Visited pages</Label>
            </>
          )}
          {openFilter === FilterType.UnvisitedPages && (
            <>
              <Label>Unvisited pages</Label>
            </>
          )}
          {openFilter === FilterType.Device && (
            <>
              <Label>Device</Label>
            </>
          )}
          {openFilter === FilterType.Browser && (
            <>
              <Label>Browser</Label>
            </>
          )}
          {openFilter === FilterType.Viewport && (
            <>
              <Label>Viewport</Label>
            </>
          )}
          {openFilter === FilterType.Language && (
            <>
              <Label>Language</Label>
            </>
          )}

          <div className='actions'>
            <Button className='primary'>Apply</Button>
            <Button className='quaternary'>Cancel</Button>
          </div>
        </div>
      </Dropdown>
    </div>
  );
};
