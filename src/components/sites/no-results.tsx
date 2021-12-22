import React from 'react';
import type { FC } from 'react';
import { Container } from 'components/container';
import { Illustration } from 'components/illustration';

interface Props {
  title: string;
}

export const NoResults: FC<Props> = ({ title }) => (
  <Container className='xl centered show empty-state'>
    <div className='empty-state-contents'>
      <Illustration src='illustration-13' height={240} width={320} alt='Illustration to represent the empty page' />
      <h4>{title}</h4>
    </div>
  </Container>
);
