import React from 'react';
import type { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Container } from 'components/container';
import { BASE_PATH } from 'data/common/constants';

export const Error: FC = () => (
  <div className='server-error'>
    <Container className='md'>
      <Image src={`${BASE_PATH}/error-state.svg`} height={256} width={256} alt='Page not found' />
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
