import React from 'react';
import type { FC } from 'react';
import { Dropdown } from 'components/dropdown';
import { Label } from 'components/label';
import { Icon } from 'components/icon';
import { Radio } from 'components/radio';
import type { HeatmapsDisplay } from 'types/heatmaps';

interface Props {
  display: HeatmapsDisplay;
  setDisplay: (display: HeatmapsDisplay) => void;
}

export const HeatmapsDisplays: FC<Props> = ({ display, setDisplay }) => (
  <Dropdown className='heatmaps-display' button={<Icon name='settings-3-line' />}>
    <Label>Click/Tap Display</Label>
    <form className='radio-group'>
      <Radio name='dispaly' checked={display === 'all'} onChange={() => setDisplay('all')}>
        All elements
      </Radio>
      <Radio name='dispaly' checked={display === 'anchors'} onChange={() => setDisplay('anchors')}>
        Only links
      </Radio>
    </form>
  </Dropdown>
);
