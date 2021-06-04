import type { NextPage } from 'next';
import React from 'react';
import SqueakyPage from 'components/SqueakyPage';
import { SiteHeader } from 'components/SiteHeader';
import Wrapper from 'components/Wrapper';
import { useSite } from 'data/sites/hooks';
import Spinner from 'components/Spinner';

const SitesTeam: NextPage = () => {
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

export default SitesTeam;
