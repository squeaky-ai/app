import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import { Icon } from 'components/icon';
import { Tag } from 'components/tag'
import { EventsType } from 'types/events';;

interface Props {
  type: EventsType;
}

const getText = (type: EventsType) => {
  switch(type) {
    case EventsType.PageVisit:
      return 'Page View';
    case EventsType.TextClick:
      return 'Text Click';
    case EventsType.SelectorClick:
      return 'CSS Selector Click';
    case EventsType.Error:
      return 'JavaScript Error';
    case EventsType.Custom:
      return 'Custom Event';
  }
};

const getIcon = (type: EventsType) => {
  switch(type) {
    case EventsType.PageVisit:
      return 'file-line';
    case EventsType.TextClick:
    case EventsType.SelectorClick:
      return 'cursor-line';
    case EventsType.Error:
      return 'error-warning-line';
    case EventsType.Custom:
      return 'flashlight-line';
  }
};

const getClassName = (type: EventsType) => {
  switch(type) {
    case EventsType.PageVisit:
      return 'page-view';
    case EventsType.TextClick:
      return 'text-click';
    case EventsType.SelectorClick:
      return 'css-selector';
    case EventsType.Error:
      return 'error';
    case EventsType.Custom:
      return 'custom';
  }
};

export const EventTag: FC<Props> = ({ type }) => (
  <Tag className={classnames('event-tag', getClassName(type))}>
    <Icon name={getIcon(type)} />
    {getText(type)}
  </Tag>
);
