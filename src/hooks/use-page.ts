import React from 'react';

type ComponentType = 
  'recordings';

interface UsePage {
  page: number;
  setPage: (page: number) => void;
}

const getDefaultPage = (type: ComponentType) => {
  if (typeof sessionStorage !== 'undefined') {
    const existing = sessionStorage.getItem(`page::${type}`);

    if (existing) {
      try {
        return Number(existing);
      } catch {}
    }
  }

  switch(type) {
    case 'recordings':
      return 1;
  }
};

export const usePage = (type: ComponentType): UsePage => {
  const [page, setPage] = React.useState<number>(getDefaultPage(type));

  const handlePageChange = (sort: number) => {
    setPage(sort);
    sessionStorage.setItem(`page::${type}`, sort.toString());
  };

  return { page, setPage: handlePageChange };
};
