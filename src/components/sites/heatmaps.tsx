import React from 'react';
import classnames from 'classnames';
import type { FC } from 'react';
import { Button } from 'components/button';
import { Clickmap } from 'components/sites/clickmap';
import { HeatmapsClicks } from 'components/sites/heatmaps-clicks';
import { useHeatmaps } from 'hooks/use-heatmaps';
import type { HeatmapsDevice, HeatmapsType } from 'types/heatmaps';

interface Props {
  page: string;
}

export const Heatmaps: FC<Props> = ({ page }) => {
  const [type, setType] = React.useState<HeatmapsType>('Click');
  const [device, setDevice] = React.useState<HeatmapsDevice>('Desktop');

  const { heatmaps } = useHeatmaps({ page, device, type });

  return (
    <div className='heatmaps-grid'>
      <div className='options'>
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
      <div className='content'>
        {type === 'Click' && <Clickmap items={heatmaps.items} />}
      </div>
      <div className='data'>
        {type === 'Click' && <HeatmapsClicks items={heatmaps.items} />}

        {type === 'Scroll' && (
          <div className='scrolls-table'>
            <div className='head row'>
              <p>% scrolled</p>
              <p>Pixels scrolled</p>
              <p>Users</p>
            </div>
            <ul>
              {heatmaps.items.map((item, i) => (
                <li key={i} className='row'>
                  <p>x: {item.x}, y: {item.y}</p>
                  <p></p>
                  <p></p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
