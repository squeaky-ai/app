import React from 'react'; 
import type { FC } from 'react';
import { Container } from 'components/container';
import { Illustration, IllustrationType } from 'components/illustration';

interface Props {
  title: string;
  illustration: IllustrationType;
}

export const EmptyState: FC<Props> = ({
  title,
  illustration,
}) => (
  <Container className='xl centered empty-state'>
    <div className='empty-state-contents'>
      <Illustration illustration={illustration} height={240} width={320} alt='Illustration to represent the empty page' />
      <h4>{title}</h4>
    </div>
  </Container>
);
