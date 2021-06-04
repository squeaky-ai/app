import type { NextPage } from 'next';
import React from 'react';
import SqueakyPage from 'components/SqueakyPage';
import { useSite } from 'data/sites/hooks';
import { SiteHeader } from 'components/SiteHeader';
import Spinner from 'components/Spinner';
import Wrapper from 'components/Wrapper';

const SitesAnalytics: NextPage = () => {
  const [site, loading] = useSite();

  return (
    <SqueakyPage>
      <Wrapper size='lg'>
        <SiteHeader site={site} />
  
        {loading && (
          <Spinner />
        )}
      </Wrapper>
    </SqueakyPage>
  );
};

export default SitesAnalytics;
