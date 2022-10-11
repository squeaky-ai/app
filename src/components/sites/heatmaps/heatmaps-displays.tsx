import React from 'react';
import type { FC } from 'react';
import { Dropdown } from 'components/dropdown';
import { Label } from 'components/label';
import { Icon } from 'components/icon';
import { Radio } from 'components/radio';
import { FeatureFlag } from 'lib/feature-flags';
import { useFeatureFlags } from 'hooks/use-feature-flags';
import { HeatmapsType } from 'types/heatmaps';
import type { HeatmapClickTarget } from 'types/heatmaps';

interface Props {
  type: HeatmapsType;
  clickTarget: HeatmapClickTarget;
  setType: (type: HeatmapsType) => void;
  setClickTarget: (clickTarget: HeatmapClickTarget) => void;
}

export const HeatmapsDisplays: FC<Props> = ({
  type,
  clickTarget,
  setType,
  setClickTarget,
}) => {
  const { featureFlagEnabled } = useFeatureFlags();

  return (
    <Dropdown className='heatmaps-display' button={<Icon name='settings-3-line' />} buttonDisabled={![HeatmapsType.ClickCount, HeatmapsType.ClickPosition].includes(type)}>
      <Label>Click targets</Label>
      <form className='radio-group'>
        <Radio name='clickTarget' checked={clickTarget === 'all'} onChange={() => setClickTarget('all')}>
          All elements
        </Radio>
        <Radio name='clickTarget' checked={clickTarget === 'anchors'} onChange={() => setClickTarget('anchors')}>
          Only links
        </Radio>
      </form>
      {featureFlagEnabled(FeatureFlag.HEATMAP_FLAMEGRAPH) && (
        <>
          <Label>Click display</Label>
          <form className='radio-group'>
            <Radio name='clickDisplay' checked={type === HeatmapsType.ClickPosition} onChange={() => setType(HeatmapsType.ClickPosition)}>
              Gradients
            </Radio>
            <Radio name='clickDisplay' checked={type === HeatmapsType.ClickCount} onChange={() => setType(HeatmapsType.ClickCount)}>
              Click counts
            </Radio>
          </form>
        </>
      )}
    </Dropdown>
  );
};
