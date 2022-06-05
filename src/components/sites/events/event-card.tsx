import React from 'react';
import type { FC } from 'react';
import { Icon } from 'components/icon';
import { Button } from 'components/button';
import { EventTag } from 'components/sites/events/event-tag';
import { EventsType } from 'types/events';

interface Props {
  type: EventsType;
}

const getText = (type: EventsType) => {
  switch(type) {
    case EventsType.PageVisit:
      return 'The page view event is triggered each time a visitor loads a particular page within your website or web app.';
    case EventsType.TextClick:
      return 'The text click event is triggered when a visitors clicks on a button or link with a specific text string on your site.';
    case EventsType.SelectorClick:
      return 'The CSS selector click event is triggered when a visitors clicks on a specific element on your site via a CSS selector.';
    case EventsType.Error:
      return '-';
    case EventsType.Custom:
      return '-'
  }
};

export const EventCard: FC<Props> = ({ type }) => {
  return (
    <Button className='event-card'>
      <EventTag type={type} />
      {getText(type)}
      <Icon name='arrow-right-line' className='arrow' />
    </Button>
  );
};
