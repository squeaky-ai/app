export enum EventsGroupType {
  All,
  Groups,
}

export enum EventsType {
  PageVisit = 0,
  TextClick = 1,
  SelectorClick = 2,
  Error = 3,
  Custom = 4,
}

export enum EventHistoryStatsSort {
  NameAsc = 'name__asc',
  NameDesc = 'name__desc',
  TypeAsc = 'type__asc',
  TypeDesc = 'type__desc',
  CountAsc = 'count__asc',
  CountDesc = 'count__desc',
  AverageEventsPerVisitorAsc = 'average_events_per_visitor__asc',
  AverageEventsPerVisitorDesc = 'average_events_per_visitor__desc',
}
