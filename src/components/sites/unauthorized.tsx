import React from 'react';
import type { FC } from 'react';
import Link from 'next/link';
import { Container } from '../container';

export const Unauthorized: FC = () => (
  <div className='unauthorized'>
    <Container className='md'>
      <h3>Unauthorized</h3>
      <Link href='/sites'>
        <a className='button secondary'>
          Back to sites
        </a>
      </Link>
    </Container>
  </div>
);
