import React from 'react';
import type { FC } from 'react';
import Link from 'next/link';
import type { Site } from 'types/graphql';

interface Item {
  href?: string;
  name: string;
}

interface Props {
  site: Site;
  items: Item[];
}

export const BreadCrumbs: FC<Props> = ({ site, items }) => (
  <div className='breadcrumbs'>
    <Link href='/sites'>
      <a>All Sites</a>
    </Link>
    <span>/</span>
    <Link href={`/sites/${site.id}/dashboard`}>
      <a>{site.name}</a>
    </Link>
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
