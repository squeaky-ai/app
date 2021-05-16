import type { NextPage } from 'next';
import React from 'react';
import Box from 'components/Box';
import Heading from 'components/Heading';
import Logo from 'components/Logo';

const SitesIndex: NextPage = () => (
  <Box modNarrow>
    <Logo style={{ display: 'block', margin: 'auto', width: '24rem' }} />
    <Heading>Sites Index</Heading>
  </Box>
);

export default SitesIndex;
