import React from 'react';
import type { FC } from 'react';
import Link from 'next/link';

interface Item {
  href?: string;
  name: string;
}

interface Props {
  items: Item[];
}

export const BreadCrumbs: FC<Props> = ({ items }) => (
  <div className='breadcrumbs'>
    <Link href='/sites'>
      Squeaky App
    </Link>
    <span>/</span>
    {items.map((item, index) => (
      <React.Fragment key={item.name}>
        {item.href
          ? <Link href={item.href}>{item.name}</Link>
          : <p>{item.name}</p>
        }

        {index < items.length - 1 && <span>/</span>}
      </React.Fragment>
    ))}
  </div>
);
