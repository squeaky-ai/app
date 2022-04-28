import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import { uniq } from 'lodash';
import { Icon } from 'components/icon';
import { Button } from 'components/button';
import { PageLoading } from 'components/sites/page-loading';
import { Container } from 'components/container';
import { Illustration } from 'components/illustration';
import { Card } from 'components/card';
import { Period } from 'components/sites/period/period';
import { Tooltip } from 'components/tooltip';
import { HeatmapsClicks } from 'components/sites/heatmaps/heatmaps-clicks';
import { HeatmapsScrolls } from 'components/sites/heatmaps/heatmaps-scrolls';
import { HeatmapsPages } from 'components/sites/heatmaps/heatmaps-pages';
import { HeatmapsPage } from 'components/sites/heatmaps/heatmaps-page';
import { HeatmapsDisplays } from 'components/sites/heatmaps/heatmaps-displays';
import { useHeatmaps } from 'hooks/use-heatmaps';
import { useFeatureFlags } from 'hooks/use-feature-flags';
import { FeatureFlag } from 'lib/feature-flags';
import { getDateRange } from 'lib/dates';
import { HeatmapsDevice, HeatmapsType } from 'types/graphql';
import type { TimePeriod } from 'types/common';
import type { HeatmapsDisplay } from 'types/heatmaps';

interface Props {
  page: string;
  pages: string[];
  period: TimePeriod;
  setPage: (page: string) => void;
  setPeriod: (page: TimePeriod) => void;
}

export const Heatmaps: FC<Props> = ({ page, pages, period, setPage, setPeriod }) => {
  const { featureFlagEnabled } = useFeatureFlags();

  const [type, setType] = React.useState<HeatmapsType>(HeatmapsType.Click);
  const [device, setDevice] = React.useState<HeatmapsDevice>(HeatmapsDevice.Desktop);
  const [display, setDisplay] = React.useState<HeatmapsDisplay>('all');
  const [selected, setSelected] = React.useState<string>(null);
  const [excludeRecordingIds, setExcludeRecordingIds] = React.useState<string[]>([]);

  const { loading, heatmaps } = useHeatmaps({ 
    page, 
    device, 
    type,
    excludeRecordingIds,
    range: getDateRange(period) 
  });

  const excludeRecording = () => {
    if (heatmaps.recordingId) {
      const excludedIds = uniq([...excludeRecordingIds, heatmaps.recordingId]);
      setExcludeRecordingIds(excludedIds);
    }
  };

  const hasData = !!heatmaps.recordingId;

  if (loading) {
    return <PageLoading />;
  }

  return (
    <div className={classnames('heatmaps-grid', { empty: !hasData })}>
      <div className='options'>
        <div className='left'>
          <HeatmapsPages page={page} pages={pages} setPage={setPage} />
          <Period period={period} onChange={setPeriod} />
        </div>

        <div className='right'>
          {heatmaps.recordingId && featureFlagEnabled(FeatureFlag.SHUFFLE_HEATMAPS) && (
            <div className='button-group'>
              <Tooltip fluid button={<Icon name='shuffle-line' />} buttonClassName='quaternary shuffle-recording' buttonOnClick={excludeRecording}>
                Pick another session to use for the heatmaps page
              </Tooltip>
            </div>
          )}

          <div className='button-group'>
            <Button className={classnames(device === HeatmapsDevice.Desktop ? 'primary' : 'blank')} onClick={() => setDevice(HeatmapsDevice.Desktop)}>
              <Icon name='computer-line' />
              {heatmaps.desktopCount}
            </Button>
            <Button className={classnames(device === HeatmapsDevice.Tablet ? 'primary' : 'blank')} onClick={() => setDevice(HeatmapsDevice.Tablet)}>
              <Icon name='tablet-line' />
              {heatmaps.tabletCount}
            </Button>
            <Button className={classnames(device === HeatmapsDevice.Mobile ? 'primary' : 'blank')} onClick={() => setDevice(HeatmapsDevice.Mobile)}>
              <Icon name='smartphone-line' />
              {heatmaps.mobileCount}
            </Button>
          </div>

          <div className='button-group'>
            <Button className={classnames(type === 'Click' ? 'primary' : 'blank')} onClick={() => setType(HeatmapsType.Click)}>
              {device === HeatmapsDevice.Desktop ? 'Clicks' : 'Taps'}
            </Button>
            <Button className={classnames(type === 'Scroll' ? 'primary' : 'blank')} onClick={() => setType(HeatmapsType.Scroll)}>
              Scroll
            </Button>
          </div>

          <HeatmapsDisplays display={display} setDisplay={setDisplay} />
        </div>
      </div>
      {hasData && (
        <>
          <Card className='content'>
            <HeatmapsPage 
              type={type}
              device={device}
              display={display}
              page={page}
              recordingId={heatmaps.recordingId} 
              items={heatmaps.items} 
            />
          </Card>
          <Card className='data'>
            {type === 'Click' && (
              <HeatmapsClicks 
                items={heatmaps.items} 
                selected={selected} 
                display={display}
                setSelected={setSelected} 
              />
            )}

            {type === 'Scroll' && (
              <HeatmapsScrolls items={heatmaps.items} />
            )}
          </Card>
        </>
      )}
      {!hasData && (
        <Container className='sm centered empty-state show'>
          <div className='empty-state-contents'>
            <Illustration illustration='illustration-2' height={240} width={320} alt='Illustration to represent the empty recordings page' />
            <h4>There is no heatmap data available for your chosen page, period or device</h4>
          </div>
        </Container>
      )}
    </div>
  );
};
