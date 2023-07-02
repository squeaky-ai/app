import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import { Icon } from 'components/icon';
import { Button } from 'components/button';
import { Dropdown } from 'components/dropdown';
import { Label } from 'components/label';
import { FiltersStatus } from 'components/sites/filters/common/filters-status';
import { FiltersDuration } from 'components/sites/filters/recordings/filters-duration';
import { FiltersPage } from 'components/sites/filters/common/filters-page';
import { FiltersPages } from 'components/sites/filters/common/filters-pages';
import { FiltersDevice } from 'components/sites/filters/recordings/filters-device';
import { FiltersBrowsers } from 'components/sites/filters/common/filters-browsers';
import { FiltersViewport } from 'components/sites/filters/recordings/filters-viewport';
import { FiltersLanguage } from 'components/sites/filters/common/filters-language';
import { FiltersBookmarked } from 'components/sites/filters/recordings/filters-bookmarked';
import { FiltersReferrers } from 'components/sites/filters/recordings/filters-referrers';
import { FiltersUtm } from  'components/sites/filters/recordings/filters-utm';
import { FiltersRageClicked } from 'components/sites/filters/recordings/filters-rage-clicked';
import { FiltersUTurned } from 'components/sites/filters/recordings/filters-u-turned';
import { FiltersTags } from 'components/sites/filters/recordings/filters-tags';
import { FiltersStarred } from 'components/sites/filters/common/filters-starred';
import { FiltersVisitorType } from 'components/sites/filters/recordings/filters-visitor-type';
import type { RecordingsFilters } from 'types/graphql';
import type { TimePeriod, ValueOf } from 'types/common';

interface Props {
  period: TimePeriod;
  filters: RecordingsFilters;
  updateFilters: (key: keyof RecordingsFilters, value: ValueOf<RecordingsFilters>) => void;
}

enum FilterType {
  Status,
  VisitorType,
  Duration,
  Referrer,
  StartUrl,
  ExitUrl,
  VisitedPages,
  UnvisitedPages,
  Device,
  Browser,
  Viewport,
  Tags,
  Bookmarked,
  Starred,
  Language,
  Utm,
  RageClicked,
  UTurned,
}

export const Filters: FC<Props> = ({ period, filters, updateFilters }) => {
  const [openFilter, setOpenFilter] = React.useState<FilterType | null>(null);

  const handleFilterChange = (filter: FilterType): void => {
    setOpenFilter(openFilter === filter ? null : filter);
  };

  const handleFilterClose = () => {
    setOpenFilter(null);
  };
  
  const handleUpdate = (key: keyof RecordingsFilters) => (value: ValueOf<RecordingsFilters>) => {
    updateFilters(key, value);
    setOpenFilter(null);
  };

  return ( 
    <div className='menu-item filters'>
      <Dropdown button={<><Icon name='equalizer-line' /> Filters</>} dropdown-menu='down'>
        <Button onClick={() => handleFilterChange(FilterType.Status)} className={classnames({ open: openFilter === FilterType.Status })}>
          <Icon name='arrow-drop-left-line' />
          Status
        </Button>
        <Button onClick={() => handleFilterChange(FilterType.VisitorType)} className={classnames({ open: openFilter === FilterType.VisitorType })}>
          <Icon name='arrow-drop-left-line' />
          Visitor type
        </Button>
        <Button onClick={() => handleFilterChange(FilterType.Duration)} className={classnames({ open: openFilter === FilterType.Duration })}>
          <Icon name='arrow-drop-left-line' />
          Duration
        </Button>
        <Button onClick={() => handleFilterChange(FilterType.Referrer)} className={classnames({ open: openFilter === FilterType.Referrer })}>
          <Icon name='arrow-drop-left-line' />
          Traffic source
        </Button>
        <Button onClick={() => handleFilterChange(FilterType.StartUrl)} className={classnames({ open: openFilter === FilterType.StartUrl })}>
          <Icon name='arrow-drop-left-line' />
          Start URL
        </Button>
        <Button onClick={() => handleFilterChange(FilterType.ExitUrl)} className={classnames({ open: openFilter === FilterType.ExitUrl })}>
          <Icon name='arrow-drop-left-line' />
          Exit URL
        </Button>
        <Button onClick={() => handleFilterChange(FilterType.VisitedPages)} className={classnames({ open: openFilter === FilterType.VisitedPages })}>
          <Icon name='arrow-drop-left-line' />
          Visited pages
        </Button>
        <Button onClick={() => handleFilterChange(FilterType.UnvisitedPages)} className={classnames({ open: openFilter === FilterType.UnvisitedPages })}>
          <Icon name='arrow-drop-left-line' />
          Unvisited pages
        </Button>
        <Button onClick={() => handleFilterChange(FilterType.Device)} className={classnames({ open: openFilter === FilterType.Device })}>
          <Icon name='arrow-drop-left-line' />
          Device
        </Button>
        <Button onClick={() => handleFilterChange(FilterType.Browser)} className={classnames({ open: openFilter === FilterType.Browser })}>
          <Icon name='arrow-drop-left-line' />
          Browser
        </Button>
        <Button onClick={() => handleFilterChange(FilterType.Viewport)} className={classnames({ open: openFilter === FilterType.Viewport })}>
          <Icon name='arrow-drop-left-line' />
          Viewport
        </Button>
        <Button onClick={() => handleFilterChange(FilterType.Tags)} className={classnames({ open: openFilter === FilterType.Tags })}>
          <Icon name='arrow-drop-left-line' />
          Tags
        </Button>
        <Button onClick={() => handleFilterChange(FilterType.Bookmarked)} className={classnames({ open: openFilter === FilterType.Bookmarked })}>
          <Icon name='arrow-drop-left-line' />
          Bookmarked
        </Button>
        <Button onClick={() => handleFilterChange(FilterType.Starred)} className={classnames({ open: openFilter === FilterType.Starred })}>
          <Icon name='arrow-drop-left-line' />
          Starred
        </Button>
        <Button onClick={() => handleFilterChange(FilterType.Language)} className={classnames({ open: openFilter === FilterType.Language })}>
          <Icon name='arrow-drop-left-line' />
          Language
        </Button>
        <Button onClick={() => handleFilterChange(FilterType.Utm)} className={classnames({ open: openFilter === FilterType.Utm })}>
          <Icon name='arrow-drop-left-line' />
          UTM
        </Button>
        <Button onClick={() => handleFilterChange(FilterType.RageClicked)} className={classnames({ open: openFilter === FilterType.RageClicked })}>
          <Icon name='arrow-drop-left-line' />
          Rage clicks
        </Button>
        <Button onClick={() => handleFilterChange(FilterType.UTurned)} className={classnames({ open: openFilter === FilterType.UTurned })}>
          <Icon name='arrow-drop-left-line' />
          U-turns
        </Button>

        <div className={classnames('popout filters', { open: openFilter !== null, 'has-sub-menu': [FilterType.Utm].includes(openFilter) })}>
          {openFilter === FilterType.Status && (
            <>
              <Label>Status</Label>
              <FiltersStatus value={filters.status} onUpdate={handleUpdate('status')} onClose={handleFilterClose} />
            </>
          )}
           {openFilter === FilterType.VisitorType && (
            <>
              <Label>Visitor type</Label>
              <FiltersVisitorType value={filters.visitorType} onUpdate={handleUpdate('visitorType')} onClose={handleFilterClose} />
            </>
          )}
          {openFilter === FilterType.Duration && (
            <>
              <Label>Duration</Label>
              <FiltersDuration value={filters.duration} onUpdate={handleUpdate('duration')} onClose={handleFilterClose} />
            </>
          )}
          {openFilter === FilterType.Referrer && (
            <>
              <Label>Traffic Source</Label>
              <FiltersReferrers value={filters.referrers} onUpdate={handleUpdate('referrers')} onClose={handleFilterClose} />
            </>
          )}
          {openFilter === FilterType.StartUrl && (
            <>
              <FiltersPage label='Start URL' value={filters.startUrl} period={period} onUpdate={handleUpdate('startUrl')} onClose={handleFilterClose} />
            </>
          )}
          {openFilter === FilterType.ExitUrl && (
            <>
              <FiltersPage label='Exit URL' value={filters.exitUrl} period={period} onUpdate={handleUpdate('exitUrl')} onClose={handleFilterClose} />
            </>
          )}
          {openFilter === FilterType.VisitedPages && (
            <>
              <FiltersPages label='Visited pages' value={filters.visitedPages} period={period} onUpdate={handleUpdate('visitedPages')} onClose={handleFilterClose} />
            </>
          )}
          {openFilter === FilterType.UnvisitedPages && (
            <>
              <FiltersPages label='Unvisited pages' value={filters.unvisitedPages} period={period} onUpdate={handleUpdate('unvisitedPages')} onClose={handleFilterClose} />
            </>
          )}
          {openFilter === FilterType.Device && (
            <>
              <Label>Device</Label>
              <FiltersDevice value={filters.devices} onUpdate={handleUpdate('devices')} onClose={handleFilterClose} />
            </>
          )}
          {openFilter === FilterType.Browser && (
            <>
              <Label>Browser</Label>
              <FiltersBrowsers value={filters.browsers} onUpdate={handleUpdate('browsers')} onClose={handleFilterClose} />
            </>
          )}
          {openFilter === FilterType.Viewport && (
            <>
              <Label>Viewport</Label>
              <FiltersViewport value={filters.viewport} onUpdate={handleUpdate('viewport')} onClose={handleFilterClose} />
            </>
          )}
          {openFilter === FilterType.Tags && (
            <>
              <Label>Tags</Label>
              <FiltersTags value={filters.tags} onUpdate={handleUpdate('tags')} onClose={handleFilterClose} />
            </>
          )}
          {openFilter === FilterType.Bookmarked && (
            <>
              <Label>Bookmarked Status</Label>
              <FiltersBookmarked value={filters.bookmarked} onUpdate={handleUpdate('bookmarked')} onClose={handleFilterClose} />
            </>
          )}
          {openFilter === FilterType.Starred && (
            <>
              <Label>Starred Status</Label>
              <FiltersStarred value={filters.starred} onUpdate={handleUpdate('starred')} onClose={handleFilterClose} />
            </>
          )}
          {openFilter === FilterType.Language && (
            <>
              <Label>Language</Label>
              <FiltersLanguage value={filters.languages} onUpdate={handleUpdate('languages')} onClose={handleFilterClose} />
            </>
          )}
          {openFilter === FilterType.Utm && (
            <>
              <Label>UTM</Label>
              <FiltersUtm filters={filters} onUpdate={handleUpdate} onClose={handleFilterClose} />
            </>
          )}
          {openFilter === FilterType.RageClicked && (
            <>
              <Label>Contains Rage Click</Label>
              <FiltersRageClicked value={filters.rageClicked} onUpdate={handleUpdate('rageClicked')} onClose={handleFilterClose} />
            </>
          )}
          {openFilter === FilterType.UTurned && (
            <>
              <Label>Contains U-Turn</Label>
              <FiltersUTurned value={filters.uTurned} onUpdate={handleUpdate('uTurned')} onClose={handleFilterClose} />
            </>
          )}
        </div>
      </Dropdown>
    </div>
  );
};
