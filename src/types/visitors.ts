import type { VisitorsFilters as Filters } from 'types/graphql';
import type { TimePeriod } from 'types/common';

export interface ExternalAttributes {
  id: string;
  name?: string;
  email?: string;
  [key: string]: string;
}

export interface VisitorsFilters extends Omit<Filters, 'firstVisited' | 'lastActivity'> {
  firstVisited: TimePeriod;
  lastActivity: TimePeriod;
}
