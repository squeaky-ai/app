import getConfig from 'next/config';
import type { GetServerSideProps } from 'next';
import { session } from 'lib/api/auth';
import type { User } from 'types/graphql';

const { publicRuntimeConfig } = getConfig();

export interface ServerSideProps {
  user: User | null;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { resolvedUrl } = context;
  const { headers, cookies } = context.req;

  const url = resolvedUrl.split('?')[0];

  const { body: user, status } = cookies.session
    ? await session<User>(headers.cookie) 
    : { body: null, status: null };

  const isAdminOnlyPage = url.startsWith('/__admin');

  // Special case for when the the API is down
  if (status === 500) {
    throw new Error('API is unhappy and sent a 500');
  }

  // If the user doesn't exist and they're trying to access
  // a logged in page then we should redirect them to the 
  // login page
  if (!user) {
    return {
      redirect: {
        destination: `${publicRuntimeConfig.webHost}/auth/login`,
        permanent: false,
      },
    };
  }

  // We don't want to really expose that this page exists so
  // just redirect away
  if (isAdminOnlyPage && !user?.superuser) {
    return {
      redirect: {
        destination: `${publicRuntimeConfig.webHost}/auth/login`,
        permanent: false,
      },
    }; 
  }

  // A bunch of the site expects the users first and last
  // name to exist so we should trap them here until they've
  // filled it out
  if ((!user?.firstName || !user?.lastName) && url !== '/users/new') {
    return {
      redirect: {
        destination: '/users/new',
        permanent: false,
      },
    };
  }

  return {
    props: { user },
  };
};
