import React from 'react';
import type { FC } from 'react';
import Image from 'next/image';
import classnames from 'classnames';
import { Button } from 'components/button';
import { Spinner } from 'components/spinner';
import { Container } from 'components/container';
import { HeatmapsClicks } from 'components/sites/heatmaps-clicks';
import { HeatmapsScrolls } from 'components/sites/heatmaps-scrolls';
import { HeatmapsPages } from 'components/sites/heatmaps-pages';
import { HeatmapsPeriods } from 'components/sites/heatmaps-periods';
import { HeatmapsPage } from 'components/sites/heatmaps-page';
import { useHeatmaps } from 'hooks/use-heatmaps';
import { getDateRange, TimePeriod } from 'lib/dates';
import { BASE_PATH } from 'data/common/constants';
import { HeatmapsDevice, HeatmapsType } from 'types/heatmaps';

interface Props {
  page: string;
  pages: string[];
  period: TimePeriod;
  setPage: (page: string) => void;
  setPeriod: (page: TimePeriod) => void;
}

export const Heatmaps: FC<Props> = ({ page, pages, period, setPage, setPeriod }) => {
  const [type, setType] = React.useState<HeatmapsType>(HeatmapsType.CLICK);
  const [device, setDevice] = React.useState<HeatmapsDevice>(HeatmapsDevice.DESKTOP);

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
            <Button className={classnames(device === HeatmapsDevice.DESKTOP ? 'primary' : 'blank')} onClick={() => setDevice(HeatmapsDevice.DESKTOP)}>
              <i className='ri-computer-line' />
              {heatmaps.desktopCount}
            </Button>
            <Button className={classnames(device === HeatmapsDevice.TABLET ? 'primary' : 'blank')} onClick={() => setDevice(HeatmapsDevice.TABLET)}>
              <i className='ri-tablet-line' />
              {heatmaps.tabletCount}
            </Button>
            <Button className={classnames(device === HeatmapsDevice.MOBILE ? 'primary' : 'blank')} onClick={() => setDevice(HeatmapsDevice.MOBILE)}>
              <i className='ri-smartphone-line' />
              {heatmaps.mobileCount}
            </Button>
          </div>

          <div className='button-group'>
            <Button className={classnames(type === 'Click' ? 'primary' : 'blank')} onClick={() => setType(HeatmapsType.CLICK)}>
              Click
            </Button>
            <Button className={classnames(type === 'Scroll' ? 'primary' : 'blank')} onClick={() => setType(HeatmapsType.SCROLL)}>
              Scroll
            </Button>
          </div>
        </div>
      </div>
      {hasData && (
        <>
          <div className='content'>
            <HeatmapsPage 
              type={type}
              device={device}
              page={page}
              recordingId={heatmaps.recordingId} 
              items={heatmaps.items} 
            />
          </div>
          <div className='data'>
            {type === 'Click' && <HeatmapsClicks items={heatmaps.items} />}
            {type === 'Scroll' && <HeatmapsScrolls items={heatmaps.items} />}
          </div>
        </>
      )}
      {!hasData && (
        <Container className='xl centered empty-state show'>
          <div className='empty-state-contents'>
            <Image src={`${BASE_PATH}/empty-state-2.svg`} height={240} width={320} alt='Illustration to represent the empty recordings page' />
            <h4>There is no heatmap data available for your chosen page, period or device</h4>
          </div>
        </Container>
      )}
    </div>
  );
};
