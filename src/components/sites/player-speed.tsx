import React from 'react';
import type { FC } from 'react';
import { Dropdown } from 'components/dropdown';
import { Label } from 'components/label';
import { Radio } from 'components/radio';
import { Divider } from 'components/divider';
import { Checkbox } from 'components/checkbox';

interface Props {
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
  }
];

export const PlayerSpeed: FC<Props> = ({ 
  playbackSpeed,
  skipInactivity,
  handlePlaybackSpeed,
  handleSkipInactivity
}) => {
  const name = playbackSpeed > 2 
    ? <i className='ri-speed-line skip' /> 
    : `${playbackSpeed.toString()}x`;

  const handleSkipChange = () => handleSkipInactivity(!skipInactivity);

  return (
    <Dropdown button={name} buttonClassName='speed' direction='up'>
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
