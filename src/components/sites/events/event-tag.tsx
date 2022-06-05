import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import { Icon } from 'components/icon';
import { Tag } from 'components/tag'
import type { EventsType } from 'types/events';;

interface Props {
  type: EventsType;
}

const getText = (type: EventsType) => {
  switch(type) {
    case 'page-view':
      return 'Page View';
    case 'text-click':
      return 'Text Click';
    case 'css-selector':
      return 'CSS Selector Click';
    case 'error':
      return 'JavaScript Error';
    case 'custom':
      return 'Custom Event';
  }
};

const getIcon = (type: EventsType) => {
  switch(type) {
    case 'page-view':
      return 'file-line';
    case 'text-click':
    case 'css-selector':
      return 'cursor-line';
    case 'error':
      return 'error-warning-line';
    case 'custom':
      return 'flashlight-line';
  }
};

export const EventTag: FC<Props> = ({ type }) => (
  <Tag className={classnames('event-tag', type)}>
    <Icon name={getIcon(type)} />
    {getText(type)}
  </Tag>
);
