import React from 'react';
import type { FC } from 'react';
import Link from 'next/link';
import { Container } from 'components/container';

export const Footer: FC = () => (
  <footer className='footer public-footer'>
    <Container className='xl centered'>
      <p>© Squeaky BV, 2021. All Right Reserved.</p>
      <nav>
        <Link href='/terms'>
          <a>Terms</a>
        </Link>
        <span className='divider' />
        <Link href='/privacy'>
          <a>Privacy</a>
        </Link>
        <span className='divider' />
        <Link href='/contact'>
          <a>Contact Us</a>
        </Link>
      </nav>
    </Container>
  </footer>
);
