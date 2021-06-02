import type { NextPage } from 'next';
import React from 'react';
import { RiWindowLine, RiCodeSSlashLine } from 'react-icons/ri';
import SqueakyPage, { PageHeading } from 'components/SqueakyPage';
import Wrapper from 'components/Wrapper';
import Tabs from 'components/Tabs';

const SitesNew: NextPage = () => {
  const tabs = [
    {
      header: {
        name: 'Site details',
        icon: RiWindowLine,
        path: 'site-details',
      },
      body: <h3>Site details</h3>
    },
    {
      header: {
        name: 'Tracking code',
        icon: RiCodeSSlashLine,
        path: 'tracking-code',
      },
      body: <h3>Tracking code</h3>
    }
  ];

  return (
    <SqueakyPage>
      <Wrapper size='lg'>
        <PageHeading>Add Site</PageHeading>

        <Tabs tabs={tabs} />
      </Wrapper>
    </SqueakyPage>
  );
};

export default SitesNew;
