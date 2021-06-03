import React from 'react';
import type { NextPage } from 'next';
import { RiWindowLine, RiCodeSSlashLine } from 'react-icons/ri';
import SqueakyPage, { PageHeading } from 'components/SqueakyPage';
import { SiteCreateHeader } from 'components/SiteHeader';
import Wrapper from 'components/Wrapper';
import { SiteDetails, SiteTrackingCode } from 'components/SiteCreate';
import { Site } from 'data/sites/types';

const SitesNew: NextPage = () => {
  const [site, setSite] = React.useState<Site>(null);

  const onSiteCreate = (site: Site) => {
    setSite(site);
  };

  // const url = (path: string) => `/sites/${site.id}/${path}`;

  // const active = (path: string) => router.asPath.startsWith(url(path));

  const tabs = [
    {
      header: {
        name: 'Site details',
        icon: RiWindowLine,
        path: 'site-details',
      },
      body: <SiteDetails site={site} setSite={onSiteCreate} />
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

        <SiteCreateHeader />
      </Wrapper>
    </SqueakyPage>
  );
};

export default SitesNew;
