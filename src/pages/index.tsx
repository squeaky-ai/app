import React from 'react';
import type { NextPage } from 'next';
import { ServerSideProps, getServerSideProps } from 'lib/auth';


const Home: NextPage<ServerSideProps> = () => (
  <p>Forwarding...</p>
);

export default Home;
export { getServerSideProps };
