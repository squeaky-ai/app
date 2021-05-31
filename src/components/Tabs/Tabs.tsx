import React from 'react';
import type { FC, ReactNode } from 'react';
import Text from 'components/Text';
import Button from 'components/Button';
import TabsContainer from './components/TabsContainer';
import TabsHeader from './components/TabsHeader';
import TabsHeaderItem from './components/TabsHeaderItem';
import TabsBody from './components/TabsBody';
import TabsBodyItem from './components/TabsBodyItem';

type TabHeader = {
  name: string;
  icon: string;
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
  const [activeTab, setActiveTab] = React.useState(tabs[0].header.path);

  return (
    <TabsContainer>
      <TabsHeader>
        {tabs.map(({ header }) => (
          <TabsHeaderItem key={header.name} active={activeTab === header.path}>
            <Button modNaked onClick={() => setActiveTab(header.path)}>
              <i className={header.icon} />
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
