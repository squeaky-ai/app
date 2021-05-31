import type { NextPage } from 'next';
import React from 'react';
import SqueakyPage from 'components/SqueakyPage';
import SiteTabs from 'components/SiteTabs';
import Wrapper from 'components/Wrapper';

const SitesRecordings: NextPage = () => {
  return (
    <SqueakyPage>
      <Wrapper size='lg'>
        <SiteTabs />
      </Wrapper>
    </SqueakyPage>
  );
};

export default SitesRecordings;
