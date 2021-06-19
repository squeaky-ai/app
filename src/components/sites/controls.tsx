import React from 'react';
import type { FC } from 'react';
import { Button } from '../button';

export const Controls: FC = () => (
  <aside className='controls'>
    <div className='control-group'>
      <Button className='control'>
        <i className='ri-zoom-out-line' />
      </Button>
      <p className='zoom-level'>100%</p>
      <Button className='control'>
        <i className='ri-zoom-in-line' />
      </Button>
    </div>
    <div className='control-group'>
      
    </div>
    <div className='control-group'>
      <Button className='control'>
        <i className='ri-information-line' />
      </Button>
      <Button className='control'>
        <i className='ri-sticky-note-line' />
      </Button>
      <Button className='control'>
        <i className='ri-price-tag-3-line' />
      </Button>
      <Button className='control'>
        <i className='ri-time-line' />
      </Button>
      <Button className='control'>
        <i className='ri-file-copy-line' />
      </Button>
    </div>
  </aside>
);
 