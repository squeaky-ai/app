import getConfig from 'next/config';
import { camelCase } from 'lodash';
import type { GetServerSideProps } from 'next';
import { session } from 'lib/api/auth';
import type { User } from 'types/graphql';

const { publicRuntimeConfig } = getConfig();

export interface ServerSideProps {
  user: User | null;
}

const getUser = async (cookie: string): Promise<User | null> => {
  const user = await session(cookie);
  if (!user) return null;

  return Object.entries(user).reduce((acc, [k, v]) => {
    const key = camelCase(k) as keyof User;
    return { ...acc, [key]: v };
  }, {} as User);
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { resolvedUrl } = context;
  const { headers, cookies } = context.req;

  const url = resolvedUrl.split('?')[0];

  const user = cookies.session ? await getUser(headers.cookie) : null;
  const isAdminOnlyPage = url.startsWith('/__admin');

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
    }
  }

  return {
    props: { user }
  };
};
