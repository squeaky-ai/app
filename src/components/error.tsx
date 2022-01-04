import React from 'react';
import type { FC } from 'react';
import Link from 'next/link';
import { Illustration } from 'components/illustration';
import { Container } from 'components/container';

export const Error: FC = () => (
  <div className='server-error'>
    <Container className='md'>
      <Illustration illustration='illustration-10' height={256} width={256} alt='Page not found' />
      <h2>Internal Server Error</h2>
      <p>Something has gone wrong on our side, sorry!</p>
      <Link href='/sites'>
        <a className='button primary'>
          Back to sites
        </a>
      </Link>
    </Container>
  </div>
);
