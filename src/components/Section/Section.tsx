import React from 'react';
import type { FC } from 'react';
import SectionContext from './contexts/SectionContext';
import useSectionContext from './hooks/useSectionContext';

const Section: FC = ({ children }) => {
  const currentSectionLevel = useSectionContext();

  return (
    <SectionContext.Provider value={Math.min(currentSectionLevel + 1, 6)}>
      {children}
    </SectionContext.Provider>
  );
};

export default Section;
