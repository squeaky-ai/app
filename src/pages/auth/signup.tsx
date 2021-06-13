import React from 'react';
import type { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import { Container } from '../../components/container';
import { Card } from '../../components/card';

const Signup: NextPage = () => (
  <div className='page signin'>
    <Head>
      <title>Squeaky / Sign up</title>
    </Head>
    <Container className='sm'>
      <Card>
        <Link href='/'>
          <a className='logo'>
            <Image src='/logo.svg' height={76} width={246} />
          </a>
        </Link>

        <h2>Sign Up</h2>
      </Card>
    </Container>

    <div className='footer-link'>
      <p>Already have an account? <Link href='/auth/signin'><a>Log in</a></Link></p>
    </div>
  </div>        
);

export default Signup;
