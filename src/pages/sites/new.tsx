import React from 'react';
import type { NextPage } from 'next';
import { RiWindowLine, RiCodeSSlashLine } from 'react-icons/ri';
import SqueakyPage, { PageHeading } from 'components/SqueakyPage';
import Wrapper from 'components/Wrapper';
import Tabs from 'components/Tabs';
import { SiteDetails, SiteTrackingCode } from 'components/SiteCreate';
import { Site } from 'data/sites/types';

const SitesNew: NextPage = () => {
  const [site, setSite] = React.useState<Site>(null);

  const tabs = [
    {
      header: {
        name: 'Site details',
        icon: RiWindowLine,
        path: 'site-details',
      },
      body: <SiteDetails site={site} />
    },
    {
      header: {
        name: 'Tracking code',
        icon: RiCodeSSlashLine,
        path: 'tracking-code',
      },
      body: site && <SiteTrackingCode site={site} />
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
