import React from 'react';
import type { FC } from 'react';
import { EventCaptures } from 'components/sites/events/event-captures';
import { EventsGroupType } from 'types/events';
import { EventsCaptureSort } from 'types/graphql';
import type { Site, EventsCapture } from 'types/graphql';

interface Props {
  type: EventsGroupType;
  site: Site;
  events: EventsCapture;
  page: number;
  sort: EventsCaptureSort;
  selected: string[];
  setSort: (sort: EventsCaptureSort) => void;
  setPage: (page: number) => void;
  setSize: (page: number) => void;
  setSelected: (selected: string[]) => void;
}

export const EventList: FC<Props> = ({
  type,
  site,
  events,
  page,
  sort,
  selected,
  setSort,
  setPage,
  setSize,
  setSelected
}) => {
  return type === EventsGroupType.All
    ? (
      <EventCaptures 
        site={site}
        events={events}
        page={page}
        sort={sort}
        selected={selected}
        setPage={setPage}
        setSelected={setSelected}
        setSize={setSize}
        setSort={setSort}
      />
    )
    : null
};
