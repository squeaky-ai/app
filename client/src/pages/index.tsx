import { NextPage } from 'next';
import React from 'react';
import styled from 'styled-components';

const Home: NextPage = () => {
  const TestStyledComponent = styled.h1``;

  return <TestStyledComponent>Hello World!</TestStyledComponent>;
};

export default Home;
