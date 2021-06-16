import type { GetServerSideProps } from 'next';
import { session } from './api/auth';
import type { User } from '../types/user';

const PUBLIC_ROUTES = [
  '/',
  '/auth/signin',
  '/auth/signup',
  '/auth/reset'
];

export interface ServerSideProps {
  user: User | null;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { resolvedUrl } = context;
  const { headers, cookies } = context.req;

  const url = resolvedUrl.split('?')[0];

  const user = cookies.session ? await session<User>(headers.cookie) : null;
  const isPublic = PUBLIC_ROUTES.includes(url);

  // If the user doesn't exist and they're trying to access
  // a logged in page then we should redirect them to the 
  // login page
  if (!user && !isPublic) {
    return {
      redirect: {
        destination: '/auth/signin',
        permanent: false
      }
    };
  }

  // A bunch of the site expects the users first and last
  // name to exist so we should trap them here until they've
  // filled it out
  if (user && (!user?.firstName || !user?.lastName) && url !== '/users/new') {
    return {
      redirect: {
        destination: '/users/new',
        permanent: false
      }
    }
  }

  return {
    props: { user }
  };
};
