import { FC } from 'react';
import UniqueIdFactoryContext from './contexts/UniqueIdFactoryContext';
import globalIdGeneratorFactory from './factories/globalIdGeneratorFactory';
import UniqueIdFactory from './factories/UniqueIdFactory';
import { IdGeneratorFactory } from './types/IdGeneratorFactory';

const UniqueId: FC<UniqueIdProps> = ({ children, factory = globalIdGeneratorFactory }) => (
  <UniqueIdFactoryContext.Provider value={new UniqueIdFactory(factory)}>
    {children}
  </UniqueIdFactoryContext.Provider>
);

interface UniqueIdProps {
  /** Custom factory to generate unique IDs */
  factory?: IdGeneratorFactory;
}

export default UniqueId;
