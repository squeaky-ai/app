import React from 'react';
import { FILTERS as VISITORS_FILTERS } from 'data/visitors/constants';
import { FILTERS as RECORDINGS_FILTERS } from 'data/recordings/constants';
import { FILTERS as NPS_FILTERS } from 'data/nps/constants'; 
import { FILTERS as SENTIMENT_FILTERS } from 'data/sentiment/constants';
import { FILTERS as EVENTS_FILTERS } from 'data/events/constants';

type FiltersType = 'recordings' | 'visitors' | 'nps' | 'sentiment' | 'events';

interface UseVisitor<T> {
  filters: T;
  setFilters: (filters: T) => void;
}

const getDefaultFilters = <T>(type: FiltersType): T => {
  if (typeof sessionStorage !== 'undefined') {
    const existing = sessionStorage.getItem(`filters::${type}`);

    if (existing) {
      try {
        return JSON.parse(existing);
      } catch {}
    }
  }

  switch(type) {
    case 'recordings':
      return RECORDINGS_FILTERS as unknown as T;
    case 'visitors':
      return VISITORS_FILTERS as unknown as T;
    case 'nps':
      return NPS_FILTERS as unknown as T;
    case 'sentiment':
      return SENTIMENT_FILTERS as unknown as T;
    case 'events':
      return EVENTS_FILTERS as unknown as T;
  }
};

export const useFilters = <T>(type: FiltersType): UseVisitor<T> => {
  const [filters, setFilters] = React.useState<T>(getDefaultFilters<T>(type));

  const handleFilterChange = (filters: T) => {
    setFilters(filters);
    sessionStorage.setItem(`filters::${type}`, JSON.stringify(filters));
  };

  return { filters, setFilters: handleFilterChange };
};
