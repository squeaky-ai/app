import React from 'react';
import type { FC } from 'react';
import { EventCaptures } from 'components/sites/events/event-captures';
import { EventGroups } from 'components/sites/events/event-groups';
import { EventsGroupType } from 'types/events';
import { EventsCaptureSort, Team } from 'types/graphql';
import type { EventSelected } from 'types/events';
import type { Site, EventsCapture } from 'types/graphql';
import { NoResults } from '../no-results';

interface Props {
  tab: EventsGroupType;
  site: Site;
  events: EventsCapture;
  member?: Team;
  page: number;
  sort: EventsCaptureSort;
  selected: EventSelected[];
  setSort: (sort: EventsCaptureSort) => void;
  setPage: (page: number) => void;
  setSize: (page: number) => void;
  setSelected: (selected: EventSelected[]) => void;
}

export const EventList: FC<Props> = ({
  tab,
  site,
  events,
  member,
  page,
  sort,
  selected,
  setSort,
  setPage,
  setSize,
  setSelected
}) => {
  if (events.items.length === 0) {
    return <NoResults illustration='illustration-13' title='There are no events matching your selected filters.' />
  }

  return tab === 'all'
    ? (
      <EventCaptures 
        site={site}
        events={events}
        page={page}
        member={member}
        sort={sort}
        selected={selected}
        setPage={setPage}
        setSelected={setSelected}
        setSize={setSize}
        setSort={setSort}
      />
    )
    : (
      <EventGroups
        site={site}
        sort={sort}
        member={member}
        selected={selected}
        setSelected={setSelected}
        setSort={setSort}
      />
    )
};
