import { createContext } from 'react';
import UniqueIdFactory from '../factories/UniqueIdFactory';

const UniqueIdFactoryContext = createContext<UniqueIdFactory | undefined>(undefined);

export default UniqueIdFactoryContext;
