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
import { useHeatmapsItems } from 'hooks/use-heatmaps-items';
import { getDateRange } from 'lib/dates';
import { HeatmapsType } from 'types/heatmaps';
import { HeatmapsDevice, SitesPage } from 'types/graphql';
import type { TimePeriod } from 'types/common';
import type { HeatmapClickTarget } from 'types/heatmaps';

interface Props {
  type: HeatmapsType;
  page: string;
  pages: SitesPage[];
  period: TimePeriod;
  setPage: (page: string) => void;
  setPeriod: (page: TimePeriod) => void;
}

export const Heatmaps: FC<Props> = ({ type, page, pages, period, setPage, setPeriod }) => {
  const [device, setDevice] = React.useState<HeatmapsDevice>(HeatmapsDevice.Desktop);
  const [clickTarget, setClickTarget] = React.useState<HeatmapClickTarget>('all');
  const [selected, setSelected] = React.useState<string>(null);
  const [excludeRecordingIds, setExcludeRecordingIds] = React.useState<string[]>([]);

  const { loading, heatmaps } = useHeatmaps({ 
    page, 
    device, 
    excludeRecordingIds,
    range: getDateRange(period),
  });

  const { clickCounts, clickPositions, cursors, scrolls } = useHeatmapsItems({
    type,
    page,
    device,
    range: getDateRange(period),
  });

  const excludeRecording = () => {
    if (heatmaps.recording) {
      const excludedIds = uniq([...excludeRecordingIds, heatmaps.recording.id]);
      setExcludeRecordingIds(excludedIds);
    }
  };

  const hasData = !!heatmaps.recording;
  const hasHiddenSidebar = [HeatmapsType.ClickPosition, HeatmapsType.Cursor].includes(type);

  if (loading) {
    return <PageLoading />;
  }

  return (
    <div className={classnames('heatmaps-grid', { empty: !hasData, 'hide-sidebar': hasHiddenSidebar })}>
      <div className='options'>
        <div className='left'>
          <HeatmapsPages page={page} pages={pages} setPage={setPage} />
          {heatmaps.recording && (
            <Tooltip portalClassName='suffle-recording-tooltip' button={<><Icon name='shuffle-line' /> Shuffle Screenshot</>} buttonClassName='quaternary shuffle-recording' buttonOnClick={excludeRecording}>
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

          {type === HeatmapsType.ClickCount && (
            <HeatmapsDisplays
              clickTarget={clickTarget}
              setClickTarget={setClickTarget} 
            />
          )}
        </div>
      </div>
      {hasData && (
        <>
          <Card className='content'>
            <HeatmapsPage 
              type={type}
              device={device}
              clickTarget={clickTarget}
              page={page}
              heatmaps={heatmaps}
              clicksCounts={clickCounts}
              clickPositions={clickPositions}
              cursors={cursors}
              scrolls={scrolls}
            />
          </Card>
          {type === HeatmapsType.ClickCount && (
            <HeatmapsClicks 
              items={clickCounts}
              selected={selected} 
              clickTarget={clickTarget}
              setSelected={setSelected} 
            />
          )}

          {type === HeatmapsType.Scroll && (
            <HeatmapsScrolls items={scrolls} />
          )}
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
