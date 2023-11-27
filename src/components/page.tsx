import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import { useRouter } from 'next/router';
import { Spinner } from 'components/spinner';
import { Sidebar as AppSidebar } from 'components/app/sidebar';
import { Sidebar as AdminSidebar } from 'components/admin/sidebar';
import { useAuth } from 'hooks/use-auth';
import type { User } from 'types/graphql';

interface Props {
  children: (user: User) => React.ReactNode;
}

export const Page: FC<Props> = ({ children }) => {
  const router = useRouter();

  const { user, loading, redirect } = useAuth();

  if (loading) {
    return <Spinner />;
  }

  if (redirect) {
    location.href = redirect;
    return null;
  }

  const slug = router.route
    .split('/')
    .map(r => r.replace(/[\[\]]|(_id)/g, ''))
    .filter(r => !!r);

  if (slug.find(s => s === '404')) {
    slug.push('not-found');
  }

  if (slug.find(s => s === '500')) {
    slug.push('internal-server-error');
  }

  return (
    <>
      <div className={classnames('page app', ...slug)}>
        {router.asPath.startsWith('/__admin') 
          ? <AdminSidebar /> 
          : <AppSidebar user={user} /> 
        }
        {children(user)}
      </div>
    </>
  );
};
