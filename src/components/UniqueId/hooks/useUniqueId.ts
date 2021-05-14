import { useContext, useRef } from 'react';
import UniqueIdFactoryContext from '../contexts/UniqueIdFactoryContext';

/**
 * Returns a unique id that remains consistent across multiple re-renders of the same hook
 *
 * @param prefix Specify a prefix for the Id being generated. Usually you want to set this to the
 *   name of the component you're calling the hook within.
 * @param overrideId Specify a fixed value to use instead of the generated part of the ID.
 */
export default function useUniqueId(prefix = '', overrideId = ''): string {
  const idFactory = useContext(UniqueIdFactoryContext);

  /**
   * By using a ref to store the uniqueId for each invocation of the hook and checking that it is
   * not already used we ensure that we don't generate a new ID for every re-render of a component.
   */
  const uniqueIdRef = useRef<string | undefined>(undefined);

  if (!idFactory) {
    throw new Error('No UniqueIDFactory was provided. It is mandatory to use the Castor library.');
  }

  // early-termination if an override was provided
  if (overrideId) return overrideId;

  // if a unique ID has not yet been generated, then we get a new one
  if (!uniqueIdRef.current) uniqueIdRef.current = idFactory.nextId(prefix);

  return uniqueIdRef.current;
}
