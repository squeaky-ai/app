import React from 'react';
import type { FC } from 'react';
import { Icon } from 'components/icon';
import { Button } from 'components/button';
import { EventTag } from 'components/sites/events/event-tag';
import { EventsCaptureType } from 'types/events';

interface Props {
  type: EventsCaptureType;
  onClick?: (type: EventsCaptureType) => void;
}

const getText = (type: EventsCaptureType): string | React.ReactNode => {
  switch(type) {
    case EventsCaptureType.PageVisit:
      return 'The page view event is triggered each time a visitor loads a particular page within your website or web app.';
    case EventsCaptureType.TextClick:
      return 'The text click event is triggered when a visitor clicks on a button or link with a specific text string on your site.';
    case EventsCaptureType.SelectorClick:
      return 'The CSS selector click event is triggered when a visitor clicks on a specific element on your site via a CSS selector.';
    case EventsCaptureType.Error:
      return 'Javascript error events help you to track the prevelance of specific Javascript Errors we have recorded on your site.';
    case EventsCaptureType.Custom:
      return <span>Manually define and track any event <i>(technical expertise required)</i> that takes place on your site.</span>
  }
};

export const EventCard: FC<Props> = ({ type, onClick }) => {
  const handleClick = () => {
    if (onClick) onClick(type);
  };

  return (
    <Button className='event-card' onClick={handleClick}>
      <EventTag type={type} />
      {getText(type)}
      <Icon name='arrow-right-line' className='arrow' />
    </Button>
  );
};
