import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import { Icon } from 'components/icon';
import { Button } from 'components/button';
import { Dropdown } from 'components/dropdown';
import { Label } from 'components/label';
import { FiltersDate } from 'components/sites/filters/common/filters-date';
import { FiltersStatus } from 'components/sites/filters/common/filters-status';
import { FiltersLanguage } from 'components/sites/filters/common/filters-language';
import { FiltersRecordings } from 'components/sites/filters/visitors/filters-recordings';
import { FiltersPages } from 'components/sites/filters/common/filters-pages';
import { FiltersReferrers } from 'components/sites/filters/recordings/filters-referrers';
import { FiltersStarred } from 'components/sites/filters/common/filters-starred';
import { FiltersBrowsers } from 'components/sites/filters/common/filters-browsers';
import type { VisitorsFilters } from 'types/visitors';
import type { TimePeriod, ValueOf } from 'types/common';

interface Props {
  period: TimePeriod;
  filters: VisitorsFilters;
  updateFilters: (key: keyof VisitorsFilters, value: ValueOf<VisitorsFilters>) => void;
}

enum FilterType {
  Status,
  Recordings,
  FirstVisited,
  LastActivity,
  StartUrl,
  ExitUrl,
  VisitedPages,
  UnvisitedPages,
  Language,
  Referrer,
  Starred,
  Browser,
}

export const Filters: FC<Props> = ({ period, filters, updateFilters }) => {
  const [openFilter, setOpenFilter] = React.useState<FilterType | null>(null);

  const handleFilterChange = (filter: FilterType): void => {
    setOpenFilter(openFilter === filter ? null : filter);
  };

  const handleFilterClose = () => {
    setOpenFilter(null);
  };
  
  const handleUpdate = (key: keyof VisitorsFilters) => (value: ValueOf<VisitorsFilters>) => {
    updateFilters(key, value);
    setOpenFilter(null);
  };

  return ( 
    <div className='menu-item filters'>
      <Dropdown button={<><Icon name='equalizer-line' /> Filters</>} dropdown-menu='down'>
        <Button onClick={() => handleFilterChange(FilterType.Status)} className={classnames({ open: openFilter === FilterType.Status})}>
          <Icon name='arrow-drop-left-line' />
          Status
        </Button>
        <Button onClick={() => handleFilterChange(FilterType.Recordings)} className={classnames({ open: openFilter === FilterType.Recordings})}>
          <Icon name='arrow-drop-left-line' />
          Sessions
        </Button>
        <Button onClick={() => handleFilterChange(FilterType.FirstVisited)} className={classnames({ open: openFilter === FilterType.FirstVisited})}>
          <Icon name='arrow-drop-left-line' />
          First visited
        </Button>
        <Button onClick={() => handleFilterChange(FilterType.LastActivity)} className={classnames({ open: openFilter === FilterType.LastActivity})}>
          <Icon name='arrow-drop-left-line' />
          Last activity
        </Button>
        <Button onClick={() => handleFilterChange(FilterType.Language)} className={classnames({ open: openFilter === FilterType.Language})}>
          <Icon name='arrow-drop-left-line' />
          Language
        </Button>
        <Button onClick={() => handleFilterChange(FilterType.Browser)} className={classnames({ open: openFilter === FilterType.Browser})}>
          <Icon name='arrow-drop-left-line' />
          Browser
        </Button>
        <Button onClick={() => handleFilterChange(FilterType.VisitedPages)} className={classnames({ open: openFilter === FilterType.VisitedPages})}>
          <Icon name='arrow-drop-left-line' />
          Visited pages
        </Button>
        <Button onClick={() => handleFilterChange(FilterType.UnvisitedPages)} className={classnames({ open: openFilter === FilterType.UnvisitedPages})}>
          <Icon name='arrow-drop-left-line' />
          Unvisited pages
        </Button>
        <Button onClick={() => handleFilterChange(FilterType.Referrer)} className={classnames({ open: openFilter === FilterType.Referrer})}>
          <Icon name='arrow-drop-left-line' />
          Traffic source
        </Button>
        <Button onClick={() => handleFilterChange(FilterType.Starred)} className={classnames({ open: openFilter === FilterType.Starred})}>
          <Icon name='arrow-drop-left-line' />
          Starred
        </Button>

        <div className={classnames('popout filters', { open: openFilter !== null })}>
          {openFilter === FilterType.Status && (
            <>
              <Label>Status</Label>
              <FiltersStatus value={filters.status} onUpdate={handleUpdate('status')} onClose={handleFilterClose} />
            </>
          )}
          {openFilter === FilterType.Recordings && (
            <>
              <Label>Sessions</Label>
              <FiltersRecordings value={filters.recordings} onUpdate={handleUpdate('recordings')} onClose={handleFilterClose} />
            </>
          )}
          {openFilter === FilterType.FirstVisited && (
            <>
              <Label>First visited</Label>
              <FiltersDate value={filters.firstVisited} onUpdate={handleUpdate('firstVisited')} onClose={handleFilterClose} />
            </>
          )}
          {openFilter === FilterType.LastActivity && (
            <>
              <Label>Last activity</Label>
              <FiltersDate value={filters.lastActivity} onUpdate={handleUpdate('lastActivity')} onClose={handleFilterClose} />
            </>
          )}
          {openFilter === FilterType.Language && (
            <>
              <Label>Language</Label>
              <FiltersLanguage value={filters.languages} onUpdate={handleUpdate('languages')}  onClose={handleFilterClose} />
            </>
          )}
          {openFilter === FilterType.Browser && (
            <>
              <Label>Browser</Label>
              <FiltersBrowsers value={filters.browsers} onUpdate={handleUpdate('browsers')}  onClose={handleFilterClose} />
            </>
          )}
          {openFilter === FilterType.VisitedPages && (
            <>
              <FiltersPages label='Visited pages' value={filters.visitedPages} period={period} onUpdate={handleUpdate('visitedPages')}  onClose={handleFilterClose} />
            </>
          )}
          {openFilter === FilterType.UnvisitedPages && (
            <>
              <FiltersPages label='Unvisited pages' value={filters.unvisitedPages} period={period} onUpdate={handleUpdate('unvisitedPages')}  onClose={handleFilterClose} />
            </>
          )}
          {openFilter === FilterType.Referrer && (
            <>
              <Label>Traffic Source</Label>
              <FiltersReferrers value={filters.referrers} onUpdate={handleUpdate('referrers')}  onClose={handleFilterClose} />
            </>
          )}
          {openFilter === FilterType.Starred && (
            <>
              <Label>Starred</Label>
              <FiltersStarred value={filters.starred} onUpdate={handleUpdate('starred')}  onClose={handleFilterClose} />
            </>
          )}
        </div>
      </Dropdown>
    </div>
  );
};
