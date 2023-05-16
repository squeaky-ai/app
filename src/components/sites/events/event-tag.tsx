import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import { Icon } from 'components/icon';
import { Tag } from 'components/tag'
import { getEventCaptureText } from 'lib/events';
import { EventsCaptureType } from 'types/events';

interface Props {
  type: EventsCaptureType;
}

const getIcon = (type: EventsCaptureType) => {
  switch(type) {
    case EventsCaptureType.PageVisit:
      return 'file-line';
    case EventsCaptureType.TextClick:
    case EventsCaptureType.SelectorClick:
      return 'cursor-line';
    case EventsCaptureType.UtmParameters:
      return 'equalizer-line';
    case EventsCaptureType.Error:
      return 'error-warning-line';
    case EventsCaptureType.Custom:
      return 'flashlight-line';
  }
};

const getClassName = (type: EventsCaptureType) => {
  switch(type) {
    case EventsCaptureType.PageVisit:
      return 'page-view';
    case EventsCaptureType.TextClick:
      return 'text-click';
    case EventsCaptureType.SelectorClick:
      return 'css-selector';
    case EventsCaptureType.UtmParameters:
      return 'utm-parameters'
    case EventsCaptureType.Error:
      return 'error';
    case EventsCaptureType.Custom:
      return 'custom';
  }
};

export const EventTag: FC<Props> = ({ type }) => (
  <Tag className={classnames('event-tag', getClassName(type))}>
    <Icon name={getIcon(type)} />
    {getEventCaptureText(type)}
  </Tag>
);
