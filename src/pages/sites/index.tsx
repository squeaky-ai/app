import type { NextPage } from 'next';
import React, { useEffect } from 'react';
import Link from 'next/link';
import SqueakyPage from 'components/SqueakyPage';
import { useSqueaky } from 'components/SqueakyProvider';
import Card from 'components/Card';
import Text from 'components/Text';
import Wrapper from 'components/Wrapper';
import Avatar from 'components/Avatar';

const SitesIndex: NextPage = () => {
  const api = useSqueaky();
  const [sites, setSites] = React.useState([]);

  const getSites = async () => {
    const { sites } = await api.getSites();
    setSites(sites);
  };

  useEffect(() => {
    getSites();
  }, []);

  return (
    <SqueakyPage modNoBackground>
      <Wrapper size='lg'>
        <h2>Sites</h2>

        {sites.map((site) => (
          <Card key={site.id}>
            <Link href={`/sites/${site.id}/recordings`}>
              <a>
                <Avatar src={site.avatar} />
                <Text><b>{site.name}</b></Text>
                <Text>{site.url}</Text>
                <Text>Owner: {site.ownerName}</Text>
              </a>
            </Link>
          </Card>
        ))}
      </Wrapper>
    </SqueakyPage>
  );
};

export default SitesIndex;
