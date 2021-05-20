import { createContext } from 'react';
import type SqueakySdk from 'services/SqueakySdk';

const SqueakyContext = createContext<SqueakySdk>(null);

export default SqueakyContext;
