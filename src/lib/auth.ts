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

  if (!cookies.session) {
    return { props: {} };
  }

  const user = await session<User>(headers.cookie);
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

  return {
    props: { user }
  };
};
