import React from 'react';
import type { FC } from 'react';
import { Icon } from 'components/icon';

interface Props {
  deviceType: string;
}

export const deviceIcon = (deviceType: string) => deviceType === 'Computer'
  ? 'computer-line' 
  : 'smartphone-line';

export const Device: FC<Props> = ({ deviceType }) => (
  <Icon name={deviceIcon(deviceType)} className='device' />
);
