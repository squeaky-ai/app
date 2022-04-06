import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import { useRouter } from 'next/router';
import { Sidebar as AppSidebar } from 'components/app/sidebar';
import { Sidebar as AdminSidebar } from 'components/admin/sidebar';

export const Page: FC = ({ children }) => {
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
        : <AppSidebar /> 
      }
      {children}
    </div>
  );
};
