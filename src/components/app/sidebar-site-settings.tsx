import React from 'react';
import type { FC } from 'react';
import Link from 'next/link';
import classnames from 'classnames';
import { useRouter } from 'next/router';
import { Button } from 'components/button';

interface Props {
  path: string;
  siteId: string;
}

export const SidebarSiteSettings: FC<Props> = ({ path, siteId }) => {
  const router = useRouter();
  const [open, setOpen] = React.useState<boolean>(false);

  const toggleOpen = () => {
    setOpen(!open);
  };

  React.useEffect(() => {
    const active = router.pathname.startsWith('/sites/[site_id]/settings');
    setOpen(active);
  }, [router.pathname]);

  return (
    <div className={classnames('link nested', { open })} data-label='Account'>
      <Button onClick={toggleOpen}>
        <i className='ri-settings-3-line' />
        <span>Settings</span>
        <i className='arrow ri-arrow-drop-down-line' />
      </Button>
      <div className='items'>
        <Link href={`/sites/${siteId}/settings/details`}>
          <a className={classnames('button', { active: path.startsWith(`/sites/${siteId}/settings/details`) })}>
            Site
          </a>
        </Link>
        <Link href={`/sites/${siteId}/settings/team`}>
          <a className={classnames('button', { active: path.startsWith(`/sites/${siteId}/settings/team`) })}>
            Team
          </a>
        </Link>
        <Link href={`/sites/${siteId}/settings/subscription`}>
          <a className={classnames('button', { active: path.startsWith(`/sites/${siteId}/settings/subscription`) })} data-label='Subscription'>
            Subscription
          </a>
        </Link>
      </div>
    </div>
  );
};
