import React from 'react';
import type { FC } from 'react';
import { Icon } from 'components/icon';
import { Button } from 'components/button';
import { EventTag } from 'components/sites/events/event-tag';
import type { EventsType } from 'types/events';

interface Props {
  type: EventsType;
}

const getText = (type: EventsType) => {
  switch(type) {
    case 'page-view':
      return 'The page view event is triggered each time a visitor loads a particular page within your website or web app.';
    case 'text-click':
      return 'The text click event is triggered when a visitors clicks on a button or link with a specific text string on your site.';
    case 'css-selector':
      return 'The CSS selector click event is triggered when a visitors clicks on a specific element on your site via a CSS selector.';
    case 'error':
      return '-';
    case 'custom':
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
