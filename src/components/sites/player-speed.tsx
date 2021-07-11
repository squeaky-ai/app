import React from 'react';
import type { FC } from 'react';
import { Dropdown } from 'components/dropdown';
import { Label } from 'components/label';
import { Radio } from 'components/radio';

interface Props {
  playbackSpeed: number;
  handlePlaybackSpeed: (speed: number) => void;
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

export const PlayerSpeed: FC<Props> = ({ playbackSpeed, handlePlaybackSpeed }) => {
  const { short } = speeds.find(s => s.value === playbackSpeed);

  return (
    <Dropdown button={short} buttonClassName='speed' direction='up'>
      <Label>Playback Speed</Label>

      {speeds.map(speed => (
        <Radio key={speed.value} checked={playbackSpeed === speed.value} onChange={() => handlePlaybackSpeed(speed.value)}>
          {speed.name}
        </Radio>
      ))}
    </Dropdown>
  );
};
