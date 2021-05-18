import { useContext } from 'react';
import SessionContext from '../contexts/SessionContext';
import type { SessionInfo } from '../types/SessionInfo';

export default function useSession(): SessionInfo | undefined {
  return useContext(SessionContext);
}
