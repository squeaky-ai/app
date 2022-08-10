import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import Image from 'next/image';
import { Icon } from 'components/icon';
import type { EventName } from 'types/event';

import blurIcon from '../../../../public/icons/blur.svg';
import clickIcon from '../../../../public/icons/click.svg';
import focusIcon from '../../../../public/icons/focus.svg';
import hoverIcon from '../../../../public/icons/hover.svg';
import touchIcon from '../../../../public/icons/touch.svg';

interface Props {
  type: EventName;
  height?: number;
  width?: number;
  className?: string;
}

const getRemixIcon = (type: EventName): string => {
  switch(type) {
    case 'page_view':
      return 'file-line';
    case 'error':
      return 'error-warning-line';
    case 'custom':
      return 'flashlight-line';
    case 'scroll':
      return 'mouse-line';
    case 'unknown':
      return 'question-mark';
    default:
      return '';
  }
};

const getCustomSvg = (type: Omit<EventName, 'page_view' | 'error' | 'custom' | 'scroll'>) => {
  switch(type) {
    case 'click':
      return clickIcon;
    case 'blur':
      return blurIcon;
    case 'focus':
      return focusIcon;
    case 'hover':
      return hoverIcon;
    case 'touch':
      return touchIcon;
    default:
      throw new Error(`No image for event type ${type}`);
  }
};

export const EventIcon: FC<Props> = ({ type, className, height, width }) => {
  const usesRemixIcon = ['page_view', 'error', 'custom', 'scroll', 'unknown'].includes(type);

  return (
    <span className={classnames('event-icon', className, { 'uses-icon': usesRemixIcon })}>
      {usesRemixIcon
        ? <Icon name={getRemixIcon(type)} />
        : <Image src={getCustomSvg(type)} width={width || 16} height={height || 16} unoptimized alt={`${type} icon`} />
      }
    </span>
  );
};
