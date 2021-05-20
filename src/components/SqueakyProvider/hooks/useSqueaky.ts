import { useContext } from 'react';
import type SqueakySdk from 'services/SqueakySdk';
import SqueakyContext from '../contexts/SqueakyContext';

export default function useSqueaky(): SqueakySdk {
  const squeakyApi = useContext(SqueakyContext);

  if (!squeakyApi) {
    throw new Error('This action requires a context to be set.');
  }

  return squeakyApi;
}
