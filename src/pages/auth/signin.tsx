import React from 'react';
import type { NextPage } from 'next';
import Link from 'next/link';

const Signin: NextPage = () => (
  <div>
    <p>Signin</p>
    <Link href='/auth/signup'>
      <a>Sign up</a>
    </Link>
  </div>
);

export default Signin;
