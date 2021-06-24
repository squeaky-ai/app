import React from 'react';
import type { FC } from 'react';
import Link from 'next/link';
import { Container } from 'components/container';

export const NotFound: FC = () => (
  <div className='not-found'>
    <Container className='md'>
      <h3>Not Found</h3>
      <Link href='/sites'>
        <a className='button secondary'>
          Back to sites
        </a>
      </Link>
    </Container>
  </div>
);
