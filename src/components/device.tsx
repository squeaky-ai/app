import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';

interface Props {
  deviceType: string;
}

export const deviceIcon = (deviceType: string) => deviceType === 'Computer'
  ? 'ri-computer-line' 
  : 'ri-smartphone-line';

export const Device: FC<Props> = ({ deviceType }) => (
  <i className={classnames('device', deviceIcon(deviceType))} />
);
