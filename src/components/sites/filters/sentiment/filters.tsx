import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import { Icon } from 'components/icon';
import { Button } from 'components/button';
import { Label } from 'components/label';
import { Dropdown } from 'components/dropdown';
import { FiltersRating } from 'components/sites/filters/sentiment/filters-rating';
import { FiltersFollowup } from 'components/sites/filters/sentiment/filters-followup';
import type { ValueOf } from 'types/common';
import type { FeedbackSentimentResponseFilters } from 'types/graphql';

interface Props {
  filters: FeedbackSentimentResponseFilters;
  updateFilters: (key: keyof FeedbackSentimentResponseFilters, value: ValueOf<FeedbackSentimentResponseFilters>) => void;
}

enum FilterType {
  Rating,
  FollowUp
}

export const SentimentFilters: FC<Props> = ({ filters, updateFilters }) => {
  const [openFilter, setOpenFilter] = React.useState<FilterType | null>(null);

  const handleFilterChange = (filter: FilterType): void => {
    setOpenFilter(openFilter === filter ? null : filter);
  };

  const handleFilterClose = () => {
    setOpenFilter(null);
  };
  
  const handleUpdate = (key: keyof FeedbackSentimentResponseFilters) => (value: ValueOf<FeedbackSentimentResponseFilters>) => {
    updateFilters(key, value);
    setOpenFilter(null);
  };

  return ( 
    <div className='menu-item filters'>
      <Dropdown button={<><Icon name='equalizer-line' /> Filters</>} dropdown-menu='down'>
        <Button onClick={() => handleFilterChange(FilterType.Rating)} className={classnames({ open: openFilter === FilterType.Rating })}>
          <Icon name='arrow-drop-left-line' />
          Rating
        </Button>
        <Button onClick={() => handleFilterChange(FilterType.FollowUp)} className={classnames({ open: openFilter === FilterType.FollowUp })}>
          <Icon name='arrow-drop-left-line' />
          Follow-up
        </Button>

        <div className={classnames('popout filters', { open: openFilter !== null })}>
          {openFilter === FilterType.Rating && (
            <>
              <Label>Rating</Label>
              <FiltersRating
                value={filters.rating}
                onClose={handleFilterClose}
                onUpdate={handleUpdate('rating')}
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
