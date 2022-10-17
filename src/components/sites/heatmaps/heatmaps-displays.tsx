import React from 'react';
import type { FC } from 'react';
import { Dropdown } from 'components/dropdown';
import { Label } from 'components/label';
import { Icon } from 'components/icon';
import { Radio } from 'components/radio';
import type { HeatmapClickTarget } from 'types/heatmaps';

interface Props {
  clickTarget: HeatmapClickTarget;
  setClickTarget: (clickTarget: HeatmapClickTarget) => void;
}

export const HeatmapsDisplays: FC<Props> = ({ clickTarget, setClickTarget }) => (
  <Dropdown className='heatmaps-display' button={<Icon name='settings-3-line' />}>
    <Label>Click targets</Label>
    <form className='radio-group'>
      <Radio name='clickTarget' checked={clickTarget === 'all'} onChange={() => setClickTarget('all')}>
        All elements
      </Radio>
      <Radio name='clickTarget' checked={clickTarget === 'anchors'} onChange={() => setClickTarget('anchors')}>
        Only links
      </Radio>
    </form>
  </Dropdown>
);
