import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import { Button } from 'components/button';
import { ErrorTab } from 'types/errors';

interface Props {
  tab: ErrorTab;
  setTab: (tab: ErrorTab) => void;
}

export const ErrorTabs: FC<Props> = ({ tab, setTab }) => (
  <div className='error-tabs'>
    <ul className='tab-header' role='navigation' aria-label='Error navigation'>
      <li className='tab'>
        <Button className={classnames('tab-button', { active: tab === ErrorTab.DETAILS })} onClick={() => setTab(ErrorTab.DETAILS)}>
          Error Details
        </Button>
      </li>
      <li className='tab'>
        <Button className={classnames('tab-button', { active: tab === ErrorTab.RECORDINGS })} onClick={() => setTab(ErrorTab.RECORDINGS)}>
          Recordings
        </Button>
      </li>
      <li className='tab'>
        <Button className={classnames('tab-button', { active: tab === ErrorTab.VISITORS })} onClick={() => setTab(ErrorTab.VISITORS)}>
          Visitors
        </Button>
      </li>
    </ul>
  </div>
);
