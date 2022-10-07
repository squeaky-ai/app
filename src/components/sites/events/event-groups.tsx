import React from 'react';
import type { FC } from 'react';
import { useEventGroups } from 'hooks/use-event-groups';
import { EventGroup } from 'components/sites/events/event-group';
import { PageLoading } from 'components/sites/page-loading';
import { Error } from 'components/error';
import type { EventSelected } from 'types/events';
import type { Site, EventsCaptureSort, Team } from 'types/graphql';

interface Props {
  site: Site;
  member?: Team;
  selected: EventSelected[];
  sort: EventsCaptureSort;
  setSelected: (selected: EventSelected[]) => void;
  setSort: (sort: EventsCaptureSort) => void;
}

export const EventGroups: FC<Props> = ({ 
  site,
  member,
  sort,
  selected,
  setSort,
  setSelected
}) => {
  const { groups, loading, error } = useEventGroups();

  if (loading) {
    return <PageLoading />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <div className='event-groups'>
      {groups.length === 0 && (
        <p>No groups</p>
      )}

      {groups.map(group => (
        <EventGroup
          key={group.id}
          site={site}
          group={group}
          member={member}
          sort={sort}
          selected={selected}
          setSort={setSort}
          setSelected={setSelected}
        />
      ))}
    </div>
  );
};
