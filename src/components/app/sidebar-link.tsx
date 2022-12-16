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
}

export const SidebarLink: FC<Props> = ({
  href,
  active,
  visibile,
  icon,
  name,
  warning,
}) => {
  if (!visibile) return null;

  return (
    <Link href={href}>
      <a className={classnames('link', { active })} data-label={name}>
        <Icon className='sidebar-icon' name={icon} />
        <span>{name}</span>
        {warning && <Icon name='error-warning-fill' className='warning' />}
      </a>
    </Link>
  );
};
