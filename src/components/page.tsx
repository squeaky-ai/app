import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import { useRouter } from 'next/router';
import { Sidebar } from 'components/app/sidebar';
import { BLANK_ROUTES } from 'data/common/constants';

export const Page: FC = ({ children }) => {
  const router = useRouter();
  const isBlank = BLANK_ROUTES.includes(router.route);

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

  if (isBlank) {
    return (
      <div className={classnames('page', ...slug)}>
        {children}
      </div>
    )
  }

  return (
    <div className={classnames('page app', ...slug)}>
      <Sidebar />
      {children}
    </div>
  );
};
