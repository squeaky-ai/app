import React from 'react';
import type { FC } from 'react';
import { EventCard } from 'components/sites/events/event-card';
import { EventsType } from 'types/events';

interface Props {
  setType: (type: EventsType) => void;
}

export const EventCreateSelect: FC<Props> = ({ setType }) => {
  return (
    <div className='events-create-select'>
      <p>To proceed, please select the type of event you&apos;d like to track.</p>
      <p className='heading'><b>Autocapture</b></p>
      <EventCard type={EventsType.PageVisit} onClick={() => setType(EventsType.PageVisit)} />
      <EventCard type={EventsType.TextClick} onClick={() => setType(EventsType.TextClick)} />
      <EventCard type={EventsType.SelectorClick} onClick={() => setType(EventsType.SelectorClick)} />
      <EventCard type={EventsType.Error} onClick={() => setType(EventsType.Error)} />

      <p className='heading'><b>Custom</b></p>
      <EventCard type={EventsType.Custom} onClick={() => setType(EventsType.Custom)} />
    </div>
  );
};
