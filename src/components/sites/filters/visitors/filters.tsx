import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import { Button } from 'components/button';
import { Dropdown } from 'components/dropdown';
import { Label } from 'components/label';
import { FiltersDate } from 'components/sites/filters/common/filters-date';
import { FiltersStatus } from 'components/sites/filters/common/filters-status';
import { FiltersLanguage } from 'components/sites/filters/common/filters-language';
import { FiltersRecordings } from 'components/sites/filters/visitors/filters-recordings';
import type { Filters as IFilters } from 'types/visitor';
import type { ValueOf } from 'types/common';

interface Props {
  filters: IFilters;
  updateFilters: (key: keyof IFilters, value: ValueOf<IFilters>) => void;
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
  Language
}

export const Filters: FC<Props> = ({ filters, updateFilters }) => {
  const [openFilter, setOpenFilter] = React.useState<FilterType | null>(null);

  const handleFilterChange = (filter: FilterType): void => {
    setOpenFilter(openFilter === filter ? null : filter);
  };

  const handleFilterClose = () => {
    setOpenFilter(null);
  };
  
  const handleUpdate = (key: keyof IFilters) => (value: ValueOf<IFilters>) => {
    updateFilters(key, value);
    setOpenFilter(null);
  };

  return ( 
    <div className='menu-item filters'>
      <Dropdown button={<><i className='ri-equalizer-line' /> Filters</>} dropdown-menu='down'>
        <Button onClick={() => handleFilterChange(FilterType.Status)} className={classnames({ open: openFilter === FilterType.Status})}>
          <i className='ri-arrow-drop-left-line' />
          Status
        </Button>
        <Button onClick={() => handleFilterChange(FilterType.Recordings)} className={classnames({ open: openFilter === FilterType.Recordings})}>
          <i className='ri-arrow-drop-left-line' />
          Recordings
        </Button>
        <Button onClick={() => handleFilterChange(FilterType.FirstVisited)} className={classnames({ open: openFilter === FilterType.FirstVisited})}>
          <i className='ri-arrow-drop-left-line' />
          First visited
        </Button>
        <Button onClick={() => handleFilterChange(FilterType.LastActivity)} className={classnames({ open: openFilter === FilterType.LastActivity})}>
          <i className='ri-arrow-drop-left-line' />
          Last activity
        </Button>
        <Button onClick={() => handleFilterChange(FilterType.Language)} className={classnames({ open: openFilter === FilterType.Language})}>
          <i className='ri-arrow-drop-left-line' />
          Language
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
              <Label>Recordings</Label>
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
        </div>
      </Dropdown>
    </div>
  );
};
