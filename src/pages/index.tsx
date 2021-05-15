import type { NextPage } from 'next';
import React from 'react';
import Box from 'components/Box';
import Button from 'components/Button';
import Heading from 'components/Heading';
import Logo from 'components/Logo';

const Home: NextPage = () => (
  <Box modNarrow>
    <Logo style={{ display: 'block', margin: 'auto', width: '24rem' }} />
    <Heading>Hello World!</Heading>
    <Heading modSection>Hello World!</Heading>
    <Heading modSubsection>Hello World!</Heading>
    <Button>Continue</Button>
  </Box>
);

export default Home;
