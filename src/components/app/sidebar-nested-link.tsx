import React from 'react';
import type { FC } from 'react';
import Link from 'next/link';
import classnames from 'classnames';

interface Props {
  href: string;
  active: boolean;
  name: string;
}

export const SidebarNestedLink: FC<Props> = ({
  href,
  active,
  name,
}) => (
  <Link href={href} className={classnames('button', { active })} data-label={name}>
    {name}
  </Link>
);
