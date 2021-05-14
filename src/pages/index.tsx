import { NextPage } from 'next';
import React from 'react';
import Heading from 'components/Heading';
import Button from 'components/Button';

const Home: NextPage = () => (
  <>
    <Heading>Hello World!</Heading>
    <Heading modSection>Hello World!</Heading>
    <Heading modSubsection>Hello World!</Heading>
    <Button>Continue</Button>
  </>
);

export default Home;
