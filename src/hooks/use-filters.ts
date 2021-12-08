import React from 'react';
import { FILTERS as VISITORS_FILTERS } from 'data/visitors/constants';
import { FILTERS as RECORDINGS_FILTERS } from 'data/recordings/constants';

type FiltersType = 'recordings' | 'visitors';

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

  return (
    type === 'recordings' 
      ? RECORDINGS_FILTERS
      : VISITORS_FILTERS
  ) as unknown as T;
};

export const useFilters = <T>(type: FiltersType): UseVisitor<T> => {
  const [filters, setFilters] = React.useState<T>(getDefaultFilters<T>(type));

  const handleFilterChange = (filters: T) => {
    setFilters(filters);
    sessionStorage.setItem(`filters::${type}`, JSON.stringify(filters));
  };

  return { filters, setFilters: handleFilterChange };
};
