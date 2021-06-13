import React from 'react';
import type { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Container } from '../../components/container';
import { Card } from '../../components/card';

const Signin: NextPage = () => (
  <div className='page signin'>
    <Container className='sm'>
      <Card>
        <Link href='/'>
          <a className='logo'>
            <Image src='/logo.svg' height={76} width={246} />
          </a>
        </Link>

        <h2>Log In</h2>
      </Card>
    </Container>

    <div className='footer-link'>
      <p>New to Squeaky? <Link href='/auth/signup'><a>Sign up</a></Link></p>
    </div>
  </div>
);

export default Signin;
