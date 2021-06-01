import type { NextPage } from 'next';
import React from 'react';
import SqueakyPage from 'components/SqueakyPage';
import Wrapper from 'components/Wrapper';

const SitesNew: NextPage = () => {
  return (
    <SqueakyPage modNoBackground>
      <Wrapper size='lg'>
        <p>New!</p>
      </Wrapper>
    </SqueakyPage>
  );
};

export default SitesNew;
