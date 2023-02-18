import type { EventsType } from 'types/graphql';

export enum EventsGroupType {
  All,
  Groups,
}

export enum EventsCaptureType {
  PageVisit = 0,
  TextClick = 1,
  SelectorClick = 2,
  Error = 3,
  Custom = 4,
}

export enum EventStatsSort {
  NameAsc = 'name__asc',
  NameDesc = 'name__desc',
  TypeAsc = 'type__asc',
  TypeDesc = 'type__desc',
  CountAsc = 'count__asc',
  CountDesc = 'count__desc',
  UniqueTriggersAsc = 'unique_triggers__asc',
  UniqueTriggersDesc = 'unique_triggers__desc',
  AverageEventsPerVisitorAsc = 'average_events_per_visitor__asc',
  AverageEventsPerVisitorDesc = 'average_events_per_visitor__desc',
}

export type EventSelected = {
  id: string;
  type: EventsType;
}
