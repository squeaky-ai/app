import React from 'react';
import type { FC } from 'react';
import { RiWindowLine, RiCodeSSlashLine } from 'react-icons/ri';
import Link from 'next/link';
import { TabsHeader, TabsHeaderItem } from 'components/Tabs';
import Text from 'components/Text';
import SiteHeaderContainer from './components/SiteHeaderContainer';

const SiteCreateHeader: FC = () => {
  return (
    <SiteHeaderContainer>
      <TabsHeader>
        <TabsHeaderItem active={true}>
          <Link href={'/'}>
            <a>
              <RiWindowLine />
              <Text>Recordings</Text>
            </a>
          </Link>
        </TabsHeaderItem>
        <TabsHeaderItem active={false}>
          <Link href={'/'}>
            <a>
              <RiCodeSSlashLine />
              <Text>Tracking code</Text>
            </a>
          </Link>
        </TabsHeaderItem>
      </TabsHeader>
    </SiteHeaderContainer>
  );
};

export default SiteCreateHeader;
