import React from 'react';
import { RecordingsSort, VisitorsSort } from 'types/graphql';

type ComponentType = 
  'recordings' |
  'visitors';

interface UseSort<T> {
  sort: T;
  setSort: (sort: T) => void;
}

const getDefaultSort = (type: ComponentType) => {
  if (typeof sessionStorage !== 'undefined') {
    const existing = sessionStorage.getItem(`sort::${type}`);

    if (existing) {
      try {
        return JSON.parse(existing);
      } catch {}
    }
  }

  switch(type) {
    case 'recordings':
      return RecordingsSort.ConnectedAtDesc;
    case 'visitors':
      return VisitorsSort.LastActivityAtDesc;
  }
};

export const useSort =  <T>(type: ComponentType): UseSort<T> => {
  const [sort, setSort] = React.useState<T>(getDefaultSort(type));

  const handleSortChange = (sort: T) => {
    setSort(sort);
    sessionStorage.setItem(`sort::${type}`, JSON.stringify(sort));
  };

  return { sort, setSort: handleSortChange };
};
