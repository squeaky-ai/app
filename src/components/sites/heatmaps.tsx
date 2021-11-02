import React from 'react';
import classnames from 'classnames';
import type { FC } from 'react';
import { Button } from 'components/button';
import { Spinner } from 'components/spinner';
import { Clickmap } from 'components/sites/clickmap';
import { HeatmapsClicks } from 'components/sites/heatmaps-clicks';
import { HeatmapsScrolls } from 'components/sites/heatmaps-scrolls';
import { HeatmapsPages } from 'components/sites/heatmaps-pages';
import { HeatmapsPeriods } from 'components/sites/heatmaps-periods';
import { useHeatmaps } from 'hooks/use-heatmaps';
import { getDateRange, TimePeriod } from 'lib/dates';
import type { HeatmapsDevice, HeatmapsType } from 'types/heatmaps';
import type { Site } from 'types/site';

interface Props {
  site: Site;
  page: string;
  pages: string[];
  period: TimePeriod;
  setPage: (page: string) => void;
  setPeriod: (page: TimePeriod) => void;
}

export const Heatmaps: FC<Props> = ({ site, page, pages, period, setPage, setPeriod }) => {
  const [type, setType] = React.useState<HeatmapsType>('Click');
  const [device, setDevice] = React.useState<HeatmapsDevice>('Desktop');

  const { loading, heatmaps } = useHeatmaps({ page, device, type, range: getDateRange(period) });

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className='heatmaps-grid'>
      <div className='options'>
        <div className='left'>
          <HeatmapsPages page={page} pages={pages} setPage={setPage} />
          <HeatmapsPeriods period={period} setPeriod={setPeriod} />
        </div>

        <div className='right'>
          <div className='button-group'>
            <Button className={classnames(device === 'Desktop' ? 'primary' : 'blank')} onClick={() => setDevice('Desktop')}>
              <i className='ri-computer-line' />
              {heatmaps.desktopCount}
            </Button>
            <Button className={classnames(device === 'Mobile' ? 'primary' : 'blank')} onClick={() => setDevice('Mobile')}>
              <i className='ri-smartphone-line' />
              {heatmaps.mobileCount}
            </Button>
          </div>

          <div className='button-group'>
            <Button className={classnames(type === 'Click' ? 'primary' : 'blank')} onClick={() => setType('Click')}>
              Click
            </Button>
            <Button className={classnames(type === 'Scroll' ? 'primary' : 'blank')} onClick={() => setType('Scroll')}>
              Scroll
            </Button>
          </div>
        </div>
      </div>
      <div className='content'>
        {type === 'Click' && <Clickmap items={heatmaps.items} />}
        <div className='screenshot'>
          <img src={`https://cdn.squeaky.ai/screenshots/${site.id}/${btoa(page)}.jpeg`} />
          <div className='overlay' />
        </div>
      </div>
      <div className='data'>
        {type === 'Click' && <HeatmapsClicks items={heatmaps.items} />}
        {type === 'Scroll' && <HeatmapsScrolls items={heatmaps.items} />}
      </div>
    </div>
  );
};
