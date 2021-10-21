import React from 'react';
import { defaultFilters as defaultVisitorsFilters } from 'lib/visitors';
import { defaultFilters as defaultRecordingsFilters } from 'lib/recordings';

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
      ? defaultRecordingsFilters
      : defaultVisitorsFilters
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
