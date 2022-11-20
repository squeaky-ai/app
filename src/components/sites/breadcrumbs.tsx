import React from 'react';
import type { FC } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import type { Site } from 'types/graphql';

interface Item {
  href?: string;
  name: string;
}

interface Props {
  site: Site;
  items: Item[];
}

export const BreadCrumbs: FC<Props> = ({ site, items }) => {
  const router = useRouter();

  const isDashboard = router.pathname === '/sites/[site_id]/dashboard';

  return (
    <div className='breadcrumbs'>
      <Link href='/sites'>
        <a>All Sites</a>
      </Link>
      <span>/</span>
      {isDashboard
        ? <p>{site.name}</p>
        : <Link href={`/sites/${site.id}/dashboard`}><a>{site.name}</a></Link>
      }
      <span>/</span>
      {items.map((item, index) => (
        <React.Fragment key={item.name}>
          {item.href
            ? <Link href={item.href}><a>{item.name}</a></Link>
            : <p>{item.name}</p>
          }

          {index < items.length - 1 && <span>/</span>}
        </React.Fragment>
      ))}
    </div>
  );
};
