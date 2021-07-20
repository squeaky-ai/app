import React from 'react';
import type { FC } from 'react';
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
    <>
      {isPublic ? <PublicHeader user={user} /> : <SiteHeader />}
      {children}
      {isPublic ? <Footer /> : null}
    </>
  );
};
