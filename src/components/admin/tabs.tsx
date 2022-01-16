import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import { Button } from 'components/button';
import type { AdminTab } from 'types/admin';

interface Props {
  tab: AdminTab;
  setTab: (tab: AdminTab) => void;
}

export const Tabs: FC<Props> = ({ tab, setTab }) => {
  return (
    <div className='admin-tabs'>
      <ul className='tab-header' role='navigation' aria-label='Account navigation'>
        <li className='tab'>
          <Button className={classnames('tab-button', { active: tab === 'users' })} onClick={() => setTab('users')}>
            Users
          </Button>
        </li>
        <li className='tab'>
          <Button className={classnames('tab-button', { active: tab === 'sites' })} onClick={() => setTab('sites')}>
            Sites
          </Button>
        </li>
      </ul>
    </div>
  );
};
