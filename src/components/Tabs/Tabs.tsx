import React from 'react';
import type { FC, ReactNode } from 'react';
import type { IconType } from 'react-icons';
import { useRouter } from 'next/router';
import Text from 'components/Text';
import Button from 'components/Button';
import TabsContainer from './components/TabsContainer';
import TabsHeader from './components/TabsHeader';
import TabsHeaderItem from './components/TabsHeaderItem';
import TabsBody from './components/TabsBody';
import TabsBodyItem from './components/TabsBodyItem';

type TabHeader = {
  name: string;
  icon: IconType;
  path: string;
}

type Tab = {
  header: TabHeader;
  body: ReactNode;
}

export interface TabProps {
  tabs: Tab[];
}

const Wrapper: FC<TabProps> = ({ tabs }) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = React.useState(tabs[0].header.path);

  React.useEffect(() => {
    setActiveTab(router.query.tab as string || tabs[0].header.path);
  }, []);

  const onTabChange = (tab: string) => () => {
    const params = new URLSearchParams(location.search);
    params.set('tab', tab);

    const url = `${location.origin}${location.pathname}?${params.toString()}`;
    history.replaceState({}, document.title, url); 

    setActiveTab(tab);
  };

  return (
    <TabsContainer>
      <TabsHeader>
        {tabs.map(({ header }) => (
          <TabsHeaderItem key={header.name} active={activeTab === header.path}>
            <Button modNaked onClick={onTabChange(header.path)}>
              <header.icon />
              <Text>{header.name}</Text>
            </Button>
          </TabsHeaderItem>
        ))}
      </TabsHeader>

      <TabsBody>
        {tabs.map(({ header, body }) => (
          <TabsBodyItem key={header.name} active={activeTab === header.path}>
            {body}
          </TabsBodyItem>
        ))}
      </TabsBody>
    </TabsContainer>
  );
};

export default Wrapper;
