import React from 'react';
import type { FC } from 'react';
import { Card } from 'components/card';
import { Input } from 'components/input';
import { debounce } from 'lodash';

interface Props {
  cluster: number;
  setCluster: (cluster: number) => void;
}

const steps: Record<number, number> = {
  0: 1,
  1: 2,
  2: 4,
  3: 8,
  4: 12,
  5: 16,
  6: 20, 
  7: 24,
  8: 32,
  9: 36,
  10: 40,
};

export const HeatmapsGradients: FC<Props> = ({ cluster, setCluster }) => {
  const handleChange = debounce((event: React.ChangeEvent<HTMLInputElement>) => {
    const value = steps[Number(event.target.value)];
    setCluster(value);
  }, 1000);

  const value = Object.entries(steps).find(([_, v]) => v === cluster)[0];

  return (
    <Card className='gradient-settings'>
      <h5>Gradient Settings</h5>
      <p><b>Clustering</b></p>
      <p>By default we hover coordinates within a certain distance of one another, you can adjust the grouping using the slider below:</p>
      <Input 
        type='range'
        min={0}
        max={10}
        step={1}
        defaultValue={value}
        onChange={handleChange}
      />
    </Card>
  );
};
