import { useContext } from 'react';
import SectionContext from '../contexts/SectionContext';

export default function useSectionContext(): number {
  return useContext(SectionContext) ?? 0;
}
