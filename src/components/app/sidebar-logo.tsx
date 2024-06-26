import React from 'react';
import type { FC } from 'react';
import Link from 'next/link';
import { Logo } from 'components/logo';

interface Props {
  siteId: string;
  embedded: boolean;
}

export const SidebarLogo: FC<Props> = ({ siteId, embedded }) => {
  const url = embedded
    ? `/sites/${siteId}/dashboard`
    : '/sites'

  return (
    <>
      <Link href={url} className='logo large'>
        <Logo logo='main' alt='Logo' height={24} width={78} />
      </Link>
      <Link href={url} className='logo small'>
        <Logo logo='small' alt='Logo' height={24} width={18} />
      </Link>
    </>
  );
};
