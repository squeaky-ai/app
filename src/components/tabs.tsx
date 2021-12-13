import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import { Icon } from 'components/icon';
import { Button } from 'components/button';

type Tab = {
  page: string;
  name: string;
  icon: string;
  body: React.ReactNode;
}

interface Props {
  tabs: Tab[];
}

export const Tabs: FC<Props> = ({ tabs }) => {
  const [page, setPage] = React.useState<Tab>(tabs[0]);

  return (
    <div className='tabs'>
      <ul className='tab-header'>
        {tabs.map(tab => (
          <li className='tab' key={tab.page}>
            <Button className={classnames('tab-button', { active: page.page === tab.page })} onClick={() => setPage(tab)}>
              <Icon name={tab.icon} />
              {tab.name}
            </Button>
          </li>
        ))}
      </ul>
      {tabs.map(tab => (
        <div key={tab.page} className={classnames('tab-body', { active: page.page === tab.page })}>
          {tab.body}
        </div>
      ))}
    </div>
  );
};
