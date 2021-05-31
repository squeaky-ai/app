import type { NextPage } from 'next';
import React, { useEffect } from 'react';
import SqueakyPage from 'components/SqueakyPage';
import { useSqueaky } from 'components/SqueakyProvider';
import SiteList from 'components/SiteList';
import Wrapper from 'components/Wrapper';

const SitesIndex: NextPage = () => {
  const api = useSqueaky();
  const [sites, setSites] = React.useState([]);

  const getSites = async () => {
    const { sites } = await api.getSites();
    setSites(sites);
  };

  useEffect(() => { getSites() }, []);

  return (
    <SqueakyPage modNoBackground>
      <Wrapper size='lg'>
        <h2>Sites</h2>

        <SiteList sites={sites} />
      </Wrapper>
    </SqueakyPage>
  );
};

export default SitesIndex;
