import type { NextPage } from 'next';
import React from 'react';
import SqueakyPage from 'components/SqueakyPage';
import Wrapper from 'components/Wrapper';

const SitesRecordings: NextPage = () => {
  return (
    <SqueakyPage modNoBackground>
      <Wrapper size='lg'>
        <p>Recordings</p>
      </Wrapper>
    </SqueakyPage>
  );
};

export default SitesRecordings;
