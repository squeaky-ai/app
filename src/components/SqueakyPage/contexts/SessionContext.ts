import { createContext } from 'react';
import type { SessionInfo } from '../types/SessionInfo';

const SessionContext = createContext<SessionInfo | undefined>(undefined);

export default SessionContext;
