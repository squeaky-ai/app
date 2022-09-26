import React from 'react';
import type { FC } from 'react';
import { Dropdown } from 'components/dropdown';
import { Label } from 'components/label';
import { Icon } from 'components/icon';
import { Radio } from 'components/radio';
import { HeatmapsType } from 'types/graphql';
import { FeatureFlag } from 'lib/feature-flags';
import { useFeatureFlags } from 'hooks/use-feature-flags';
import type { HeatmapClickDisplay, HeatmapClickTarget } from 'types/heatmaps';

interface Props {
  type: HeatmapsType;
  clickTarget: HeatmapClickTarget;
  clickDisplay: HeatmapClickDisplay;
  setClickTarget: (clickTarget: HeatmapClickTarget) => void;
  setClickDisplay: (clickDisplay: HeatmapClickDisplay) => void;
}

export const HeatmapsDisplays: FC<Props> = ({
  type,
  clickTarget,
  clickDisplay,
  setClickTarget,
  setClickDisplay,
}) => {
  const { featureFlagEnabled } = useFeatureFlags();

  return (
    <Dropdown className='heatmaps-display' button={<Icon name='settings-3-line' />} buttonDisabled={type === HeatmapsType.Scroll}>
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
            <Radio name='clickDisplay' checked={clickDisplay === 'gradient'} onChange={() => setClickDisplay('gradient')}>
              Gradients
            </Radio>
            <Radio name='clickDisplay' checked={clickDisplay === 'counts'} onChange={() => setClickDisplay('counts')}>
              Click counts
            </Radio>
          </form>
        </>
      )}
    </Dropdown>
  );
};
