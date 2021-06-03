import React from 'react';
import type { FC } from 'react';
import { RiWindowLine, RiCodeSSlashLine } from 'react-icons/ri';
import { TabsHeader, TabsHeaderItem } from 'components/Tabs';
import Button from 'components/Button';
import Text from 'components/Text';
import SiteHeaderContainer from './components/SiteHeaderContainer';

export enum Tab {
  DETAILS,
  TRACKING,
}

export interface SiteCreateHeaderProps {
  tab: Tab;
}

const SiteCreateHeader: FC<SiteCreateHeaderProps> = ({ tab }) => (
  <SiteHeaderContainer>
    <TabsHeader>
      <TabsHeaderItem active={tab === Tab.DETAILS}>
        <Button modNaked>
          <RiWindowLine />
          <Text>Site details</Text>
        </Button>
      </TabsHeaderItem>
      <TabsHeaderItem active={tab === Tab.TRACKING}>
        <Button modNaked>
          <RiCodeSSlashLine />
          <Text>Tracking code</Text>
        </Button>
      </TabsHeaderItem>
    </TabsHeader>
  </SiteHeaderContainer>
);

export default SiteCreateHeader;
