import React from 'react';
import type { FC } from 'react';
import SqueakySdk from 'services/SqueakySdk';
import SqueakyContext from './contexts/SqueakyContext';

const SqueakyProvider: FC = ({ children }) => {
  const SqueakyApi = new SqueakySdk();

  return <SqueakyContext.Provider value={SqueakyApi}>{children}</SqueakyContext.Provider>;
};

export default SqueakyProvider;
