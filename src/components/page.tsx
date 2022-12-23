import React from 'react';
import type { FC } from 'react';
import getConfig from 'next/config';
import Script from 'next/script';
import classnames from 'classnames';
import { useRouter } from 'next/router';
import { Sidebar as AppSidebar } from 'components/app/sidebar';
import { Sidebar as AdminSidebar } from 'components/admin/sidebar';
import type { User } from 'types/graphql';

interface Props {
  user: User;
  children: React.ReactNode;
}

const { publicRuntimeConfig } = getConfig();

const { dev = false } = publicRuntimeConfig;

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

  React.useEffect(() => {
    if (!user || dev) return;

    const { id, firstName, lastName, email, superuser, createdAt } = user;

    window.squeaky?.identify(id, {
      'name': `${firstName} ${lastName}`,
      'email': email,
      'superuser': superuser ? 'Yes' : 'No',
      'created': new Date(createdAt).toLocaleDateString(),
    });
  }, [user]);

  return (
    <>
      <Script 
        id='squeaky-script'
        strategy='afterInteractive'
        dangerouslySetInnerHTML={{ __html: dev ? '' : `
          (function(s,q,u,e,a,k,y){
            s._sqSettings={site_id:'2918cf0f-42aa-499d-a4da-d362bd1011ed'};
            e=q.getElementsByTagName('head')[0];
            a=q.createElement('script');
            a.src=u+s._sqSettings.site_id;
            e.appendChild(a);
          })(window,document,'https://cdn.squeaky.ai/g/1.0.0/script.js?');
        `}}
      />
      <div className={classnames('page app', ...slug)}>
        {router.asPath.startsWith('/__admin') 
          ? <AdminSidebar /> 
          : <AppSidebar user={user} /> 
        }
        {children}
      </div>
    </>
  );
};
