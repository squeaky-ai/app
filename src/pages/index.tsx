import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Container } from 'components/container';
import { Header } from 'components/public/header';
import { ServerSideProps, getServerSideProps } from 'lib/auth';
import { Input } from 'components/input';
import { Button } from 'components/button';

const Home: NextPage<ServerSideProps> = ({ user }) => (
  <div className='page home'>
    <Head>
      <title>Squeaky</title>
    </Head>

    <Header user={user} />

    <section className='section hero'>
      <Container className='lg centered'>
        <h1>Understand your users</h1>
        <p>Capture screen recordings and insightful data that help you <b>see exactly how visitors are using your website or app</b>.</p>
        <form>
          <Input placeholder='Enter your email ...' />
          <Button className='primary'>Sign Up</Button>
          <i>No credit card required</i>
        </form>
      </Container>
    </section>

    <section className='section demo'>
      <Container className='lg centered'>
        <h2>Simple yet powerful</h2>
        <p>Our tools make it easy for you to understand <b>who your users</b> are and <b>how they’re using your site</b>.</p>
      </Container>
    </section>
  </div>
);

export default Home;
export { getServerSideProps };
