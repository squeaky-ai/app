import getConfig from 'next/config';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { USER_QUERY } from 'data/users/queries';
import type { User } from 'types/graphql';

const { publicRuntimeConfig } = getConfig();

export interface UseAuth {
  user?: User;
  loading: boolean;
  redirect?: string;
}

export const useAuth = (): UseAuth => {
  const router = useRouter();

  const { data, error, loading } = useQuery(USER_QUERY);

  const isAdminOnlyPage = router.asPath.startsWith('/__admin');

  // Special case for when the the API is down
  if (error) {
    throw new Error('API is unhappy and sent a 500');
  }

  if (loading) {
    return {
      user: null,
      loading: true,
      redirect: null,
    };
  }

  // If the user doesn't exist and they're trying to access
  // a logged in page then we should redirect them to the 
  // login page
  if (!data.user) {
    return {
      user: null,
      loading: false,
      redirect: `${publicRuntimeConfig.webHost}/auth/login`,
    };
  }

  // We don't want to really expose that this page exists so
  // just redirect away
  if (isAdminOnlyPage && !data.user?.superuser) {
    return {
      user: data.user,
      loading: false,
      redirect: `${publicRuntimeConfig.webHost}/auth/login`,
    }; 
  }

  // A bunch of the site expects the users first and last
  // name to exist so we should trap them here until they've
  // filled it out
  if ((!data.user?.firstName || !data.user?.lastName) && router.asPath !== '/users/new') {
    return {
      user: data.user,
      loading: false,
      redirect: `${publicRuntimeConfig.webHost}/users/new`,
    };
  }

  return {
    user: data.user,
    loading: false,
    redirect: null,
  };
};
