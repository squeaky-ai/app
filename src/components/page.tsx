import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import { useRouter } from 'next/router';
import { Header as PublicHeader } from 'components/public/header';
import { Footer } from 'components/public/footer';
import { Sidebar } from 'components/app/sidebar';
import { BLANK_ROUTES, PUBLIC_ROUTES } from 'data/common/constants';
import type { User } from 'types/user';

interface Props {
  user?: User;
}

export const Page: FC<Props> = ({ children, user }) => {
  const router = useRouter();
  const isBlank = BLANK_ROUTES.includes(router.route);
  const isPublic = PUBLIC_ROUTES.includes(router.route);

  const slug = router.route
    .split('/')
    .map(r => r.replace(/[\[\]]|(_id)/g, ''))
    .filter(r => !!r);

  if (slug.length === 0) {
    slug.push('home');
  }

  if (slug.find(s => s === '404')) {
    slug.push('not-found');
  }

  if (slug.find(s => s === '500')) {
    slug.push('internal-server-error');
  }

  React.useEffect(() => {
    if (window && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      const icons = document.querySelectorAll('link[rel="icon"]');
      
      icons.forEach(icon => {
        const href = icon.getAttribute('href');
        const isDark = href.includes('-dark');

        if (!isDark) {
          const [name, extention] = href.split('.');
          icon.setAttribute('href', `${name}-dark.${extention}`);
        }
      });
    }
  }, []);

  if (isBlank) {
    return (
      <div className={classnames('page', ...slug)}>
        {children}
      </div>
    )
  }

  if (isPublic) {
    return (
      <div className={classnames('page', ...slug)}>
        <PublicHeader user={user} />
        {children}
        <Footer />
      </div>
    );
  }

  return (
    <div className={classnames('page app', ...slug)}>
      <Sidebar />
      {children}
    </div>
  );
};
