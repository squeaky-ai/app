import React from 'react';
import type { NextPage } from 'next';
import Link from 'next/link';

const Home: NextPage = () => (
  <div>
    <p>Home</p>
    <Link href='/auth/signup'>
      <a>Sign up</a>
    </Link>
  </div>
);

export default Home;
