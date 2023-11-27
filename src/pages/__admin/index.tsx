import React from 'react';
import type { NextPage } from 'next';
import { PageProps } from 'types/page';
import { useRouter } from 'next/router';
import { Spinner } from 'components/spinner';

const Index: NextPage<PageProps> = () => {
  const router = useRouter();

  router.push('/__admin/dashboard');

  return <Spinner />;
};

export default Index;
