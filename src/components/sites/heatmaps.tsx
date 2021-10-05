import React from 'react';
import classnames from 'classnames';
import type { FC } from 'react';
import { Button } from 'components/button';
import { useHeatmaps } from 'hooks/use-heatmaps';
import type { HeatmapsDevice, HeatmapsType } from 'types/heatmaps';

interface Props {
  page: string;
}

export const Heatmaps: FC<Props> = ({ page }) => {
  const [type, setType] = React.useState<HeatmapsType>('Click');
  const [device, setDevice] = React.useState<HeatmapsDevice>('Desktop');

  const { heatmaps } = useHeatmaps({ page, device, type })

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

      </div>
      <div className='data'>

      </div>
    </div>
  );
};
