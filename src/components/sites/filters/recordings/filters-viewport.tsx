import React from 'react';
import type { FC } from 'react';
import { Input } from 'components/input';
import { Label } from 'components/label';

export const FiltersViewport: FC = () => {
  return (
    <form className='filters-viewport'>
      <div className='row'>
        <div className='column'>
          <Label>Min. Width</Label>
          <Input />
          <p>px</p>
        </div>
        <div className='column'>
          <Label>Max. Width</Label>
          <Input />
          <p>px</p>
        </div>
      </div>
      <div className='row'>
        <div className='column'>
          <Label>Min. Height</Label>
          <Input />
          <p>px</p>
        </div>
        <div className='column'>
          <Label>Max. Height</Label>
          <Input />
          <p>px</p>
        </div>
      </div>
    </form>
  );
};
