import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import { Icon } from 'components/icon';
import { Button } from 'components/button';
import { Label } from 'components/label';
import { Dropdown } from 'components/dropdown';
import { FiltersEventSource } from 'components/sites/filters/events/filters-events-source';
import { FiltersEventsType } from 'components/sites/filters/events/filters-events-type';
import type { ValueOf } from 'types/common';
import type { EventsCaptureFilters } from 'types/graphql';

interface Props {
  filters: EventsCaptureFilters;
  updateFilters: (key: keyof EventsCaptureFilters, value: ValueOf<EventsCaptureFilters>) => void;
}

enum FilterType {
  Type,
  Source
}

export const EventsFilters: FC<Props> = ({ filters, updateFilters }) => {
  const [openFilter, setOpenFilter] = React.useState<FilterType | null>(null);

  const handleFilterChange = (filter: FilterType): void => {
    setOpenFilter(openFilter === filter ? null : filter);
  };

  const handleFilterClose = () => {
    setOpenFilter(null);
  };
  
  const handleUpdate = (key: keyof EventsCaptureFilters) => (value: ValueOf<EventsCaptureFilters>) => {
    updateFilters(key, value);
    setOpenFilter(null);
  };

  return ( 
    <div className='menu-item filters'>
      <Dropdown button={<><Icon name='equalizer-line' /> Filters</>} dropdown-menu='down'>
        <Button onClick={() => handleFilterChange(FilterType.Type)} className={classnames({ open: openFilter === FilterType.Type })}>
          <Icon name='arrow-drop-left-line' />
          Type
        </Button>
        <Button onClick={() => handleFilterChange(FilterType.Source)} className={classnames({ open: openFilter === FilterType.Source })}>
          <Icon name='arrow-drop-left-line' />
          Source
        </Button>

        <div className={classnames('popout filters', { open: openFilter !== null })}>
          {openFilter === FilterType.Type && (
            <>
              <Label>Event types</Label>
              <FiltersEventsType
                value={filters.eventType}
                onClose={handleFilterClose}
                onUpdate={handleUpdate('eventType')}
              />
            </>
          )}
          {openFilter === FilterType.Source && (
            <>
              <Label>Event source</Label>
              <FiltersEventSource 
                value={filters.source}
                onClose={handleFilterClose}
                onUpdate={handleUpdate('source')}
              />
            </>
          )}
        </div>
      </Dropdown>
    </div>
  );
};
