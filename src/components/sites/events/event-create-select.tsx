import React from 'react';
import type { FC } from 'react';
import { EventCard } from 'components/sites/events/event-card';
import { EventsCaptureType } from 'types/events';

interface Props {
  setType: (type: EventsCaptureType) => void;
}

export const EventCreateSelect: FC<Props> = ({ setType }) => {
  return (
    <div className='events-create-select'>
      <p>To proceed, please select the type of event you&apos;d like to track.</p>
      <p className='heading'><b>Autocapture</b></p>
      <EventCard type={EventsCaptureType.PageVisit} onClick={() => setType(EventsCaptureType.PageVisit)} />
      <EventCard type={EventsCaptureType.TextClick} onClick={() => setType(EventsCaptureType.TextClick)} />
      <EventCard type={EventsCaptureType.SelectorClick} onClick={() => setType(EventsCaptureType.SelectorClick)} />
      <EventCard type={EventsCaptureType.UtmParameters} onClick={() => setType(EventsCaptureType.UtmParameters)} />
      <EventCard type={EventsCaptureType.Error} onClick={() => setType(EventsCaptureType.Error)} />

      <p className='heading'><b>Custom</b></p>
      <EventCard type={EventsCaptureType.Custom} onClick={() => setType(EventsCaptureType.Custom)} />
    </div>
  );
};
