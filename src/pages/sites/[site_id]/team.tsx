import type { NextPage } from 'next';
import React from 'react';
import SqueakyPage from 'components/SqueakyPage';
import { SiteHeader } from 'components/SiteHeader';
import Wrapper from 'components/Wrapper';
import { useSite } from 'data/sites/hooks';

const SitesTeam: NextPage = () => {
  const [site, loading] = useSite();

  return (
    <SqueakyPage>
      <Wrapper size='lg'>
        {loading && (
          <p>Loading...</p>
        )}
        {site && (
          <>
            <SiteHeader site={site} />
          </>
        )}
      </Wrapper>
    </SqueakyPage>
  );
};

export default SitesTeam;
