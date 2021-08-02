import React from 'react';
import type { FC } from 'react';
import Link from 'next/link';
import type { Site } from 'types/site';

interface Props {
  page: string;
  site: Site;
}

export const BreadCrumbs: FC<Props> = ({ site, page }) => (
  <div className='breadcrumbs'>
    <Link href='/sites'>
      <a>All Sites</a>
    </Link>
    <span>/</span>
    <Link href={`/sites/${site.id}/overview`}>
      <a>{site.name}</a>
    </Link>
    <span>/</span>
    <p>{page}</p>
  </div>
);
