import React from 'react';
import type { FC } from 'react';
import Link from 'next/link';
import classnames from 'classnames';
import { Icon } from 'components/icon';

interface Props {
  href: string;
  active: boolean;
  visibile: boolean;
  icon: string;
  name: string;
  warning?: boolean;
  external?: boolean;
}

export const SidebarLink: FC<Props> = ({
  href,
  active,
  visibile,
  icon,
  name,
  warning,
  external,
}) => {
  if (!visibile) return null;

  return (
    <Link href={href} className={classnames('link', { active })} data-label={name} target={external ? '_blank' : undefined}>
      <Icon className='sidebar-icon' name={icon} />
      <span>{name}</span>
      {warning && <Icon name='error-warning-fill' className='warning' />}
      {external && <Icon name='external-link-line' className='external' />}
    </Link>
  );
};
