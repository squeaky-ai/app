import React from 'react';
import type { FC } from 'react';
import Link from 'next/link';
import { Illustration } from 'components/illustration';
import { Container } from 'components/container';

interface Props {
  title?: string;
  action?: React.ReactNode;
}

export const Error: FC<Props> = ({ title, action }) => (
  <div className='server-error'>
    <Container className='md'>
      <Illustration illustration='illustration-10' height={256} width={256} alt='Page not found' />
      <h2>{title || 'Internal Server Error'}</h2>
      <p>Something has gone wrong on our side, sorry!</p>
      {action || (
         <Link href='/sites'>
          <a className='button primary'>
            Back to sites
          </a>
        </Link>
      )}
    </Container>
  </div>
);
