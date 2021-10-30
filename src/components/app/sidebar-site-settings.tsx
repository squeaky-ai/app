import React from 'react';
import type { FC } from 'react';
import Link from 'next/link';
import classnames from 'classnames';
import { Button } from 'components/button';

interface Props {
  path: string;
  siteId: string;
}

export const SidebarSiteSettings: FC<Props> = ({ path, siteId }) => {
  const [open, setOpen] = React.useState<boolean>(false);

  const toggleOpen = () => {
    setOpen(!open);
  };
  return (
    <div className={classnames('link account', { open })} data-label='Account'>
      <Button onClick={toggleOpen}>
        <i className='ri-settings-3-line' />
        <span>Settings</span>
        <i className='arrow ri-arrow-drop-down-line' />
      </Button>
      <div className='items'>
        <Link href={`/sites/${siteId}/settings/details`}>
          <a className={classnames('button', { active: path.startsWith(`/sites/${siteId}/settings`) })}>
            Site
          </a>
        </Link>
        <Link href={`/sites/${siteId}/team`}>
          <a className={classnames('button', { active: path.startsWith(`/sites/${siteId}/team`) })}>
            Team
          </a>
        </Link>
        <Link href={`/sites/${siteId}/subscription`}>
          <a className={classnames('button', { active: path.startsWith(`/sites/${siteId}/subscription`) })} data-label='Subscription'>
            Subscription
          </a>
        </Link>
      </div>
    </div>
  );
};
