import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import { PlayerTab } from 'data/sites/enums';
import { Label } from 'components/label';
import { Button } from 'components/button';

interface Props {
  active: PlayerTab;
  setActive: (active: PlayerTab) => void;
}

export const PlayerSidebar: FC<Props> = ({ active, setActive }) => {
  const handleClose = () => {
    setActive(null);
  };

  return (
    <aside className={classnames('player-sidebar', { active: active !== null })}>
      <div className={classnames('sidebar info', { active: active === PlayerTab.INFO })}>
        <Label className='heading'>
          Session Info 
          <Button onClick={handleClose}><i className='ri-close-line' /></Button>
        </Label>
        <div className='contents'>

        </div>
      </div>
      <div className={classnames('sidebar notes', { active: active === PlayerTab.NOTES })}>
        <Label className='heading'>
          Notes 
          <Button onClick={handleClose}><i className='ri-close-line' /></Button>
        </Label>
        <div className='contents'>
          
        </div>
      </div>
      <div className={classnames('sidebar tags', { active: active === PlayerTab.TAGS })}>
        <Label className='heading'>
          Tags 
          <Button onClick={handleClose}><i className='ri-close-line' /></Button>
        </Label>
        <div className='contents'>
          
        </div>
      </div>
      <div className={classnames('sidebar activity', { active: active === PlayerTab.ACTIVITY })}>
        <Label className='heading'>
          Activity 
          <Button onClick={handleClose}><i className='ri-close-line' /></Button>
        </Label>
        <div className='contents'>
          
        </div>
      </div>
      <div className={classnames('sidebar pages', { active: active === PlayerTab.PAGES })}>
        <Label className='heading'>
          Pages 
          <Button onClick={handleClose}><i className='ri-close-line' /></Button>
        </Label>
        <div className='contents'>
          
        </div>
      </div>
    </aside>
  );
};
