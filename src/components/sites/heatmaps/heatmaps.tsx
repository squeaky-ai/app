import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import { uniq } from 'lodash';
import { Icon } from 'components/icon';
import { Button } from 'components/button';
import { ButtonGroup } from 'components/button-group';
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
import { getDateRange } from 'lib/dates';
import { FeatureFlag } from 'lib/feature-flags';
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
    if (heatmaps.recording) {
      const excludedIds = uniq([...excludeRecordingIds, heatmaps.recording.id]);
      setExcludeRecordingIds(excludedIds);
    }
  };

  const hasData = !!heatmaps.recording;

  if (loading) {
    return <PageLoading />;
  }

  return (
    <div className={classnames('heatmaps-grid', { empty: !hasData, 'hide-sidebar': type === 'Cursor' })}>
      <div className='options'>
        <div className='left'>
          <HeatmapsPages page={page} pages={pages} setPage={setPage} />
          {heatmaps.recording && (
            <Tooltip portalClassName='suffle-recording-tooltip' button={<Icon name='shuffle-line' />} buttonClassName='quaternary shuffle-recording' buttonOnClick={excludeRecording}>
              Squeaky shows you a random snapshot of your selected page from within the time period you have defined. If the snapshot is corrupted click the shuffle button and we&apos;ll find an alternative view of your page
            </Tooltip>
          )}
        </div>

        <div className='right'>
          <Period period={period} onChange={setPeriod} />

          <ButtonGroup>
            <Button className={classnames(device === HeatmapsDevice.Desktop ? 'primary' : 'blank')} onClick={() => setDevice(HeatmapsDevice.Desktop)}>
              <Icon name='computer-line' />
              {heatmaps.counts.desktop}
            </Button>
            <Button className={classnames(device === HeatmapsDevice.Tablet ? 'primary' : 'blank')} onClick={() => setDevice(HeatmapsDevice.Tablet)}>
              <Icon name='tablet-line' />
              {heatmaps.counts.tablet}
            </Button>
            <Button className={classnames(device === HeatmapsDevice.Mobile ? 'primary' : 'blank')} onClick={() => setDevice(HeatmapsDevice.Mobile)}>
              <Icon name='smartphone-line' />
              {heatmaps.counts.mobile}
            </Button>
          </ButtonGroup>

          <ButtonGroup>
            <Button className={classnames(type === 'Click' ? 'primary' : 'blank')} onClick={() => setType(HeatmapsType.Click)}>
              {device === HeatmapsDevice.Desktop ? 'Clicks' : 'Taps'}
            </Button>
            {featureFlagEnabled(FeatureFlag.HEATMAPS_CURSORS) && (
              <Button className={classnames(type === 'Cursor' ? 'primary' : 'blank')} onClick={() => setType(HeatmapsType.Cursor)}>
                Cursors
              </Button>
            )}
            <Button className={classnames(type === 'Scroll' ? 'primary' : 'blank')} onClick={() => setType(HeatmapsType.Scroll)}>
              Scroll
            </Button>
          </ButtonGroup>

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
              heatmaps={heatmaps}
            />
          </Card>
          <Card className='data'>
            {type === 'Click' && (
              <HeatmapsClicks 
                heatmaps={heatmaps} 
                selected={selected} 
                display={display}
                setSelected={setSelected} 
              />
            )}

            {type === 'Scroll' && (
              <HeatmapsScrolls heatmaps={heatmaps} />
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
