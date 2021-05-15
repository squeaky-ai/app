import { createContext } from 'react';
import type UniqueIdFactory from '../factories/UniqueIdFactory';

const UniqueIdFactoryContext = createContext<UniqueIdFactory | undefined>(undefined);

export default UniqueIdFactoryContext;
