import React from 'react';
import type { FC } from 'react';
import Link from 'next/link';
import { Illustration } from 'components/illustration';
import { Container } from 'components/container';

export const Unauthorized: FC = () => (
  <div className='unauthorized'>
    <Container className='md'>
      <Illustration illustration='illustration-15' height={256} width={256} alt='Unauthorized state' />
      <h2>No Access</h2>
      <p>You role does not authorize you to view the requested page.</p>
      <Link href='/sites'>
        <a className='button primary'>
          Back to sites
        </a>
      </Link>
    </Container>
  </div>
);
