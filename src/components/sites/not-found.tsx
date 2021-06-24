import React from 'react';
import type { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Container } from 'components/container';

export const NotFound: FC = () => (
  <div className='not-found'>
    <Container className='md'>
      <Image src='/error-state.svg' height={256} width={256} />
      <h2>404</h2>
      <p>The page you are looking for cannot be found.</p>
      <Link href='/sites'>
        <a className='button primary'>
          Back to sites
        </a>
      </Link>
    </Container>
  </div>
);
