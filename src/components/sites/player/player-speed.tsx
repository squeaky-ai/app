import React from 'react';
import type { FC } from 'react';
import { Icon } from 'components/icon';
import { Dropdown } from 'components/dropdown';
import { Label } from 'components/label';
import { Radio } from 'components/radio';
import { Divider } from 'components/divider';
import { Checkbox } from 'components/checkbox';
import type { Recording } from 'types/graphql';

interface Props {
  recording: Recording;
  playbackSpeed: number;
  skipInactivity: boolean;
  handlePlaybackSpeed: (speed: number) => void;
  handleSkipInactivity: (skip: boolean) => void;
}

const speeds = [
  {
    name: '0.5 x',
    value: .5,
    short: '0.5x'
  },
  {
    name: 'Normal',
    value: 1,
    short: '1x'
  },
  {
    name: '1.5 x',
    value: 1.5,
    short: '1.5x'
  },
  {
    name: '2 x',
    value: 2,
    short: '2x'
  },
  {
    name: '5 x',
    value: 5,
    short: '5x'
  }
];

export const PlayerSpeed: FC<Props> = ({ 
  recording,
  playbackSpeed,
  skipInactivity,
  handlePlaybackSpeed,
  handleSkipInactivity
}) => {
  const name = playbackSpeed > 5 
    ? <Icon name='speed-line skip' /> 
    : `${playbackSpeed.toString()}x`;

  const handleSkipChange = () => handleSkipInactivity(!skipInactivity);

  return (
    <Dropdown button={name} buttonClassName='speed' buttonDisabled={!recording} menuClassName='playback-speed-menu' direction='up'>
      <Label>Playback Speed</Label>

      {speeds.map(speed => (
        <Radio key={speed.value} checked={playbackSpeed === speed.value} onChange={() => handlePlaybackSpeed(speed.value)}>
          {speed.name}
        </Radio>
      ))}

      <Divider />

      <Checkbox checked={skipInactivity} onChange={handleSkipChange}>
        Skip inactivity
      </Checkbox>
    </Dropdown>
  );
};
