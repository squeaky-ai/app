import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import { useRouter } from 'next/router';
import { Header as SiteHeader } from 'components/sites/header';
import { Header as PublicHeader } from 'components/public/header';
import { Footer } from 'components/public/footer';
import { PUBLIC_ROUTES } from 'data/common/constants';
import type { User } from 'types/user';

interface Props {
  user?: User;
}

export const Page: FC<Props> = ({ children, user }) => {
  const router = useRouter();
  const isPublic = PUBLIC_ROUTES.includes(router.route);

  const slug = router.route.split('/').filter(r => !!r && !r.startsWith('['));

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

  return (
    <div className={classnames('page', ...slug)}>
      {isPublic ? <PublicHeader user={user} /> : <SiteHeader />}
      {children}
      {isPublic ? <Footer /> : null}
    </div>
  );
};
