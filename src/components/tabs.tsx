import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import { useRouter } from 'next/router';
import { Icon } from 'components/icon';
import { Button } from 'components/button';

type Tab = {
  page: string;
  name: string;
  icon?: string;
  body: React.ReactNode;
}

interface Props {
  tabs: Tab[];
}

export const Tabs: FC<Props> = ({ tabs }) => {
  const router = useRouter();

  const [page, setPage] = React.useState<Tab>(tabs[0]);

  const updateTab = () => {
    const params = new URLSearchParams(location.search);
    const tabName = params.get('tab');

    const tab = tabs.find(t => t.page === tabName);

    if (tab?.page !== page.page) {
      setPage(tab || tabs[0]);
    }
  };

  React.useEffect(() => {
    updateTab();
  }, [router.asPath]);

  const handleTabChange = (tab: Tab) => () => {
    setPage(tab);
    // Update the ?tab= in the url silently
    router.push({ pathname: router.asPath.split('?')[0], query: { tab: tab.page } });
  };

  return (
    <div className='tabs'>
      <ul className='tab-header'>
        {tabs.map(tab => (
          <li className='tab' key={tab.page}>
            <Button className={classnames('tab-button', { active: page.page === tab.page })} onClick={handleTabChange(tab)}>
              {tab.icon ? <Icon name={tab.icon} /> : null}
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
