import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import { Button } from 'components/button';
import { Spinner } from 'components/spinner';
import { Container } from 'components/container';
import { Illustration } from 'components/illustration';
import { Card } from 'components/card';
import { HeatmapsClicks } from 'components/sites/heatmaps/heatmaps-clicks';
import { HeatmapsScrolls } from 'components/sites/heatmaps/heatmaps-scrolls';
import { HeatmapsPages } from 'components/sites/heatmaps/heatmaps-pages';
import { HeatmapsPeriods } from 'components/sites/heatmaps/heatmaps-periods';
import { HeatmapsPage } from 'components/sites/heatmaps/heatmaps-page';
import { useHeatmaps } from 'hooks/use-heatmaps';
import { getDateRange, TimePeriod } from 'lib/dates';
import { HeatmapsDevice, HeatmapsType } from 'types/graphql';

interface Props {
  page: string;
  pages: string[];
  period: TimePeriod;
  setPage: (page: string) => void;
  setPeriod: (page: TimePeriod) => void;
}

export const Heatmaps: FC<Props> = ({ page, pages, period, setPage, setPeriod }) => {
  const [type, setType] = React.useState<HeatmapsType>(HeatmapsType.Click);
  const [device, setDevice] = React.useState<HeatmapsDevice>(HeatmapsDevice.Desktop);

  const { loading, heatmaps } = useHeatmaps({ page, device, type, range: getDateRange(period) });

  const hasData = !!heatmaps.recordingId;

  if (loading && !hasData) {
    return <Spinner />;
  }

  return (
    <div className={classnames('heatmaps-grid', { empty: !hasData })}>
      <div className='options'>
        <div className='left'>
          <HeatmapsPages page={page} pages={pages} setPage={setPage} />
          <HeatmapsPeriods period={period} setPeriod={setPeriod} />
        </div>

        <div className='right'>
          <div className='button-group'>
            <Button className={classnames(device === HeatmapsDevice.Desktop ? 'primary' : 'blank')} onClick={() => setDevice(HeatmapsDevice.Desktop)}>
              <i className='ri-computer-line' />
              {heatmaps.desktopCount}
            </Button>
            <Button className={classnames(device === HeatmapsDevice.Tablet ? 'primary' : 'blank')} onClick={() => setDevice(HeatmapsDevice.Tablet)}>
              <i className='ri-tablet-line' />
              {heatmaps.tabletCount}
            </Button>
            <Button className={classnames(device === HeatmapsDevice.Mobile ? 'primary' : 'blank')} onClick={() => setDevice(HeatmapsDevice.Mobile)}>
              <i className='ri-smartphone-line' />
              {heatmaps.mobileCount}
            </Button>
          </div>

          <div className='button-group'>
            <Button className={classnames(type === 'Click' ? 'primary' : 'blank')} onClick={() => setType(HeatmapsType.Click)}>
              Click
            </Button>
            <Button className={classnames(type === 'Scroll' ? 'primary' : 'blank')} onClick={() => setType(HeatmapsType.Scroll)}>
              Scroll
            </Button>
          </div>
        </div>
      </div>
      {hasData && (
        <>
          <Card className='content'>
            <HeatmapsPage 
              type={type}
              device={device}
              page={page}
              recordingId={heatmaps.recordingId} 
              items={heatmaps.items} 
            />
          </Card>
          <Card className='data'>
            {type === 'Click' && <HeatmapsClicks items={heatmaps.items} />}
            {type === 'Scroll' && <HeatmapsScrolls items={heatmaps.items} />}
          </Card>
        </>
      )}
      {!hasData && (
        <Container className='sm centered empty-state show'>
          <div className='empty-state-contents'>
            <Illustration src='illustration-2' height={240} width={320} alt='Illustration to represent the empty recordings page' />
            <h4>There is no heatmap data available for your chosen page, period or device</h4>
          </div>
        </Container>
      )}
    </div>
  );
};
