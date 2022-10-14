import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import { useRouter } from 'next/router';
import { Sidebar as AppSidebar } from 'components/app/sidebar';
import { Sidebar as AdminSidebar } from 'components/admin/sidebar';
import type { User } from 'types/graphql';

interface Props {
  user: User;
  children: React.ReactNode;
}

export const Page: FC<Props> = ({ user, children }) => {
  const router = useRouter();

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
    <div className={classnames('page app', ...slug)}>
      {router.asPath.startsWith('/__admin') 
        ? <AdminSidebar /> 
        : <AppSidebar user={user} /> 
      }
      {children}
    </div>
  );
};
