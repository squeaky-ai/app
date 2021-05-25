import type { NextPage } from 'next';
import React from 'react';
import Box from 'components/Box';
import Button from 'components/Button';
import Heading from 'components/Heading';
import Logo from 'components/Logo';
import SqueakyPage from 'components/SqueakyPage';

const SitesIndex: NextPage = () => (
  <SqueakyPage>
    <Box modNarrow>
      <Logo style={{ display: 'block', margin: 'auto', width: '24rem' }} />
      <Heading>Sites Index</Heading>
      <Button href="/logout">Log out</Button>
    </Box>
  </SqueakyPage>
);

export default SitesIndex;
