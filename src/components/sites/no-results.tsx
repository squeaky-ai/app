import React from 'react';
import type { FC } from 'react';
import { Container } from 'components/container';
import { Illustration } from 'components/illustration';

interface Props {
  title: string;
  illustration?: number;
}

export const NoResults: FC<Props> = ({ title, illustration }) => (
  <Container className='xl centered show empty-state no-results'>
    <div className='empty-state-contents'>
      <Illustration src={`illustration-${illustration || 13}`} height={240} width={320} alt='Illustration to represent the empty page' />
      <h4>{title}</h4>
    </div>
  </Container>
);
