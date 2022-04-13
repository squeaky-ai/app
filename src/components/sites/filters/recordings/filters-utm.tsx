import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import { Icon } from 'components/icon';
import { Button } from 'components/button';
import { Label } from 'components/label';
import { FiltersUtmSources } from 'components/sites/filters/recordings/filters-utm-sources';
import { FiltersUtmCampaigns } from 'components/sites/filters/recordings/filters-utm-campaigns';
import { FiltersUtmTerms } from 'components/sites/filters/recordings/filters-utm-terms';
import { FiltersUtmContents } from 'components/sites/filters/recordings/filters-utm-contents';
import { FiltersUtmMediums } from 'components/sites/filters/recordings/filters-utm-mediums';
import type { RecordingsFilters } from 'types/graphql';
import type { ValueOf } from 'types/common';

interface Props {
  filters: RecordingsFilters;
  onClose: VoidFunction;
  onUpdate: (key: keyof RecordingsFilters) => (value: ValueOf<RecordingsFilters>) => void;
}

enum FilterType {
  UtmSource,
  UtmCampaign,
  UtmTerm,
  UtmContent,
  UtmMedium,
}

export const FiltersUtm: FC<Props> = ({ filters, onClose, onUpdate }) => {
  const [openFilter, setOpenFilter] = React.useState<FilterType | null>(null);

  const handleFilterChange = (filter: FilterType): void => {
    setOpenFilter(openFilter === filter ? null : filter);
  };

  const handleUpdate = (key: keyof RecordingsFilters) => (value: ValueOf<RecordingsFilters>) => {
    onClose();
    onUpdate(key)(value);
  };

  const handleClose = () => {
    setOpenFilter(null);
    onClose();
  };

  return (
    <div className='dropdown-menu sub-menu'>
      <Button onClick={() => handleFilterChange(FilterType.UtmSource)} className={classnames({ open: openFilter === FilterType.UtmSource })}>
        <Icon name='arrow-drop-left-line' />
        UTM Source
      </Button>
      <Button onClick={() => handleFilterChange(FilterType.UtmCampaign)} className={classnames({ open: openFilter === FilterType.UtmCampaign })}>
        <Icon name='arrow-drop-left-line' />
        UTM Campaign
      </Button>
      <Button onClick={() => handleFilterChange(FilterType.UtmTerm)} className={classnames({ open: openFilter === FilterType.UtmTerm })}>
        <Icon name='arrow-drop-left-line' />
        UTM Term
      </Button>
      <Button onClick={() => handleFilterChange(FilterType.UtmContent)} className={classnames({ open: openFilter === FilterType.UtmContent })}>
        <Icon name='arrow-drop-left-line' />
        UTM Content
      </Button>
      <Button onClick={() => handleFilterChange(FilterType.UtmMedium)} className={classnames({ open: openFilter === FilterType.UtmMedium })}>
        <Icon name='arrow-drop-left-line' />
        UTM Medium
      </Button>

      <div className={classnames('popout filters', { open: openFilter !== null })}>
        {openFilter === FilterType.UtmSource && (
          <>
            <Label>UTM Source</Label>
            <FiltersUtmSources value={filters.utmSource} onClose={handleClose} onUpdate={handleUpdate('utmSource')} />
          </>
        )}
        {openFilter === FilterType.UtmCampaign && (
          <>
            <Label>UTM Campaign</Label>
            <FiltersUtmCampaigns value={filters.utmCampaign} onClose={handleClose} onUpdate={handleUpdate('utmCampaign')} />
          </>
        )}
        {openFilter === FilterType.UtmTerm && (
          <>
            <Label>UTM Term</Label>
            <FiltersUtmTerms value={filters.utmTerm} onClose={handleClose} onUpdate={handleUpdate('utmTerm')} />
          </>
        )}
        {openFilter === FilterType.UtmContent && (
          <>
            <Label>UTM Content</Label>
            <FiltersUtmContents value={filters.utmContent} onClose={handleClose} onUpdate={handleUpdate('utmContent')} />
          </>
        )}
        {openFilter === FilterType.UtmMedium && (
          <>
            <Label>UTM Medium</Label>
            <FiltersUtmMediums value={filters.utmMedium} onClose={handleClose} onUpdate={handleUpdate('utmMedium')} />
          </>
        )}
      </div>
    </div>
  );
};
