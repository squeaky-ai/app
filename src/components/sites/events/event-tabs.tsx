import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import { Button } from 'components/button';

export type TabsType = 'stats' | 'feed';

interface Props {
  active: TabsType;
  onChange: (tab: TabsType) => void;
}

export const EventTabs: FC<Props> = ({ active, onChange }) => (
  <div className='event-tabs'>
    <ul className='tab-header' role='navigation' aria-label='Event stats'>
      <li className='tab'>
        <Button className={classnames('button tab-button', { active: active === 'stats' })} onClick={() => onChange('stats')}>
          Stats
        </Button>
      </li>
      <li className='tab'>
        <Button className={classnames('button tab-button', { active: active === 'feed' })} onClick={() => onChange('feed')}>
          Event Feed
        </Button>
      </li>
    </ul>
  </div>
);
