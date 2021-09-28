import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import { Button } from 'components/button';
import { Dropdown } from 'components/dropdown';
import { Label } from 'components/label';
import { FiltersDate } from 'components/sites/filters/recordings/filters-date';
import { FiltersStatus } from 'components/sites/filters/recordings/filters-status';
import { FiltersDuration } from 'components/sites/filters/recordings/filters-duration';
import { FiltersPages } from 'components/sites/filters/recordings/filters-pages';
import { FiltersDevice } from 'components/sites/filters/recordings/filters-device';
import { FiltersBrowsers } from 'components/sites/filters/recordings/filters-browsers';
import { FiltersViewport } from 'components/sites/filters/recordings/filters-viewport';
import { FiltersLanguage } from 'components/sites/filters/recordings/filters-language';

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

export const Filters: FC = () => {
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

        <div className={classnames('popout filters', { open: openFilter !== null })}>
          {openFilter === FilterType.Date && (
            <>
              <Label>Date</Label>
              <FiltersDate />
            </>
          )}
          {openFilter === FilterType.Status && (
            <>
              <Label>Status</Label>
              <FiltersStatus />
            </>
          )}
          {openFilter === FilterType.Duration && (
            <>
              <Label>Duration</Label>
              <FiltersDuration />
            </>
          )}
          {openFilter === FilterType.StartUrl && (
            <>
              <Label>Start URL</Label>
              <FiltersPages />
            </>
          )}
          {openFilter === FilterType.ExitUrl && (
            <>
              <Label>Exit URL</Label>
              <FiltersPages />
            </>
          )}
          {openFilter === FilterType.VisitedPages && (
            <>
              <Label>Visited pages</Label>
              <FiltersPages />
            </>
          )}
          {openFilter === FilterType.UnvisitedPages && (
            <>
              <Label>Unvisited pages</Label>
              <FiltersPages />
            </>
          )}
          {openFilter === FilterType.Device && (
            <>
              <Label>Device</Label>
              <FiltersDevice />
            </>
          )}
          {openFilter === FilterType.Browser && (
            <>
              <Label>Browser</Label>
              <FiltersBrowsers />
            </>
          )}
          {openFilter === FilterType.Viewport && (
            <>
              <Label>Viewport</Label>
              <FiltersViewport />
            </>
          )}
          {openFilter === FilterType.Language && (
            <>
              <Label>Language</Label>
              <FiltersLanguage />
            </>
          )}

          <div className='actions'>
            <Button className='primary'>Apply</Button>
            <Button className='quaternary' onClick={() => setOpenFilter(null)}>Cancel</Button>
          </div>
        </div>
      </Dropdown>
    </div>
  );
};
