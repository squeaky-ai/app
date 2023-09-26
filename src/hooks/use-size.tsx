import React from 'react';

type ComponentType = 
  'recordings';

interface UsePage {
  size: number;
  setSize: (size: number) => void;
}

const getDefaultPage = (type: ComponentType) => {
  if (typeof sessionStorage !== 'undefined') {
    const existing = sessionStorage.getItem(`size::${type}`);

    if (existing) {
      try {
        return Number(existing);
      } catch {}
    }
  }

  switch(type) {
    case 'recordings':
      return 25;
  }
};

export const useSize = (type: ComponentType): UsePage => {
  const [size, setSize] = React.useState<number>(getDefaultPage(type));

  const handlePageChange = (size: number) => {
    setSize(size);
    sessionStorage.setItem(`size::${type}`, size.toString());
  };

  return { size, setSize: handlePageChange };
};
