import React from 'react';
import classnames from 'classnames';
import type { FC } from 'react';
import type { Site } from 'types/site';
import { Button } from 'components/button';

interface Props {
  site: Site;
}

export const Heatmaps: FC<Props> = () => {
  const [device, setDevice] = React.useState<string>('desktop');
  const [heatmapType, setHeatmapType] = React.useState<string>('click');

  return (
    <div className='heatmaps-grid'>
      <div className='options'>
        <div className='button-group'>
          <Button className={classnames(device === 'desktop' ? 'primary' : 'blank')} onClick={() => setDevice('desktop')}>
            <i className='ri-computer-line' />
            0
          </Button>
          <Button className={classnames(device === 'mobile' ? 'primary' : 'blank')} onClick={() => setDevice('mobile')}>
            <i className='ri-smartphone-line' />
            0
          </Button>
        </div>

        <div className='button-group'>
          <Button className={classnames(heatmapType === 'click' ? 'primary' : 'blank')} onClick={() => setHeatmapType('click')}>
            Click
          </Button>
          <Button className={classnames(heatmapType === 'scroll' ? 'primary' : 'blank')} onClick={() => setHeatmapType('scroll')}>
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
