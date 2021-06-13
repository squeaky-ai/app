import React from 'react';
import type { NextPage } from 'next';
import Link from 'next/link';

const Signup: NextPage = () => (
  <div>
    <p>Signup</p>
    <Link href='/auth/signin'>
      <a>Sign in</a>
    </Link>
  </div>
);

export default Signup;
