import React from 'react';
import type { NextPage } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Container } from '../components/container';
import { Header } from '../components/header';

const Home: NextPage = () => (
  <div className='page home'>
    <Header className='transparent'>
      <Link href='/'>
        <a className='logo'>
          <Image src='/logo.svg' height={48} width={158} />
        </a>
      </Link>

      <span>Already have an account? <Link href='/auth/signin'><a>Log in</a></Link>.</span>
    </Header>

    <Container className='md centered'>
      <h1>Understand your users.</h1>
      
      <p>Start viewing live or recorded user sessions on your website in minutes, no technical expertise required.</p>
    </Container>
  </div>
);

export default Home;
