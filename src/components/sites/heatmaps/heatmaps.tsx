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
import { getDateRange } from 'lib/dates';
import { HeatmapsType, HeatmapsDevice, SitesPage } from 'types/graphql';
import type { TimePeriod } from 'types/common';
import type { HeatmapClickTarget } from 'types/heatmaps';
import { Error } from 'components/error';

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
  const [excludeRecordingIds, setExcludeRecordingIds] = React.useState<string[]>(['63', '64', '68', '75']);

  const { loading, error, heatmaps } = useHeatmaps({ 
    page, 
    device, 
    type,
    excludeRecordingIds,
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

  if (error) {
    return <Error />;
  }

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

          {type !== HeatmapsType.Cursor && (
            <ButtonGroup>
              <Button className={classnames(device === HeatmapsDevice.Desktop ? 'primary' : 'blank')} onClick={() => setDevice(HeatmapsDevice.Desktop)}>
                <Icon name='computer-line' />
                {heatmaps.counts.desktop.toLocaleString()}
              </Button>
              <Button className={classnames(device === HeatmapsDevice.Tablet ? 'primary' : 'blank')} onClick={() => setDevice(HeatmapsDevice.Tablet)}>
                <Icon name='tablet-line' />
                {heatmaps.counts.tablet.toLocaleString()}
              </Button>
              <Button className={classnames(device === HeatmapsDevice.Mobile ? 'primary' : 'blank')} onClick={() => setDevice(HeatmapsDevice.Mobile)}>
                <Icon name='smartphone-line' />
                {heatmaps.counts.mobile.toLocaleString()}
              </Button>
            </ButtonGroup>
          )}

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
              selected={selected} 
              page={page}
              heatmaps={heatmaps}
            />
          </Card>
          {type === HeatmapsType.ClickCount && (
            <HeatmapsClicks 
              heatmaps={heatmaps}
              selected={selected} 
              clickTarget={clickTarget}
              setSelected={setSelected} 
            />
          )}

          {type === HeatmapsType.Scroll && (
            <HeatmapsScrolls heatmaps={heatmaps} />
          )}
        </>
      )}
      {!hasData && (
        <Container className='sm centered empty-state show content'>
          <div className='empty-state-contents'>
            <Illustration illustration='illustration-2' height={240} width={320} alt='Illustration to represent the empty recordings page' />
            <h4>There is no heatmap data available for your chosen page, period or device</h4>
          </div>
        </Container>
      )}
    </div>
  );
};
