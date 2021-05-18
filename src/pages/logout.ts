import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const LogoutPage: NextPage = () => {
  const router = useRouter();

  /** This effect aims to cancel the current session */
  useEffect(() => {
    localStorage.clear();

    return void router.push('/login');
  }, [router]);

  return null;
};

export default LogoutPage;
