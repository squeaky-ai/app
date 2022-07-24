import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import { Icon } from 'components/icon';
import { Button } from 'components/button';
import { Label } from 'components/label';
import { Dropdown } from 'components/dropdown';
import { FiltersOutcomeType } from 'components/sites/filters/nps/filters-outcome-type';
import { FiltersFollowup } from 'components/sites/filters/nps/filters-followup';
import type { ValueOf } from 'types/common';
import type { FeedbackNpsResponseFilters } from 'types/graphql';

interface Props {
  filters: FeedbackNpsResponseFilters;
  updateFilters: (key: keyof FeedbackNpsResponseFilters, value: ValueOf<FeedbackNpsResponseFilters>) => void;
}

enum FilterType {
  OutcomeType,
  FollowUp
}

export const NpsFilters: FC<Props> = ({ filters, updateFilters }) => {
  const [openFilter, setOpenFilter] = React.useState<FilterType | null>(null);

  const handleFilterChange = (filter: FilterType): void => {
    setOpenFilter(openFilter === filter ? null : filter);
  };

  const handleFilterClose = () => {
    setOpenFilter(null);
  };
  
  const handleUpdate = (key: keyof FeedbackNpsResponseFilters) => (value: ValueOf<FeedbackNpsResponseFilters>) => {
    updateFilters(key, value);
    setOpenFilter(null);
  };

  return ( 
    <div className='menu-item filters'>
      <Dropdown button={<><Icon name='equalizer-line' /> Filters</>} dropdown-menu='down'>
        <Button onClick={() => handleFilterChange(FilterType.OutcomeType)} className={classnames({ open: openFilter === FilterType.OutcomeType })}>
          <Icon name='arrow-drop-left-line' />
          Outcome type
        </Button>
        <Button onClick={() => handleFilterChange(FilterType.FollowUp)} className={classnames({ open: openFilter === FilterType.FollowUp })}>
          <Icon name='arrow-drop-left-line' />
          Follow-up
        </Button>

        <div className={classnames('popout filters', { open: openFilter !== null })}>
          {openFilter === FilterType.OutcomeType && (
            <>
              <Label>Outcome type</Label>
              <FiltersOutcomeType
                value={filters.outcomeType}
                onClose={handleFilterClose}
                onUpdate={handleUpdate('outcomeType')}
              />
            </>
          )}
          {openFilter === FilterType.FollowUp && (
            <>
              <Label>Follow-up</Label>
              <FiltersFollowup
                value={filters.followUpComment}
                onClose={handleFilterClose}
                onUpdate={handleUpdate('followUpComment')}
              />
            </>
          )}
        </div>
      </Dropdown>
    </div>
  );
};
