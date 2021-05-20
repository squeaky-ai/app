import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import Box from 'components/Box';
import Button from 'components/Button';
import Heading from 'components/Heading';
import Logo from 'components/Logo';
import SqueakyPage from 'components/SqueakyPage';
import { useSqueaky } from 'components/SqueakyProvider';

const SitesIndex: NextPage = () => {
  const api = useSqueaky();
  const router = useRouter();

  useEffect(() => console.log(api.getToken()), [api]);

  return (
    <SqueakyPage>
      <Box modNarrow>
        <Logo style={{ display: 'block', margin: 'auto', width: '24rem' }} />
        <Heading>Sites Index</Heading>
        <Button onClick={() => router.push('/logout')}>Log out</Button>
      </Box>
    </SqueakyPage>
  );
};

export default SitesIndex;
