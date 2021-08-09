import React from 'react';
import type { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import classnames from 'classnames';
import { useRouter } from 'next/router';
import { Button } from 'components/button';
import { SidebarAccount } from 'components/app/sidebar-account';

export const Sidebar: FC = () => {
  const router = useRouter();
  const [open, setOpen] = React.useState<boolean>(true);
  const [position, setPosition] = React.useState<'left' | 'right'>('left');

  const path = router.asPath;
  const siteId = router.query.site_id;

  const toggleOpen = () => setOpen(!open);

  React.useEffect(() => {
    setPosition(path.startsWith('/sites/') ? 'right' : 'left');
  }, [path]);

  return (
    <aside id='app-sidebar' className={classnames({ open })}>
      <Link href='/sites'>
        <a className='logo'>
          {open
            ? <Image src='/logo.svg' alt='Logo' height={32} width={103} />
            : <Image src='/logo-small.svg' alt='Logo' height={32} width={24} />
          }
        </a>
      </Link>
      <menu className={position}>
        <div className='slider'>
          <div className='nav left'>
            <Link href='/sites'>
              <a className={classnames('link', { active: path.startsWith('/sites') })} data-label='All Sites'>
                <i className='ri-window-line' />
                <span>All Sites</span>
              </a>
            </Link>
            <SidebarAccount path={path} />
          </div>
          <div className='nav right'>
            <Link href={`/sites/${siteId}/overview`}>
              <a className={classnames('link', { active: path.startsWith(`/sites/${siteId}/overview`) })} data-label='Overview'>
                <i className='ri-dashboard-3-line' />
                <span>Overview</span>
              </a>
            </Link>
            <Link href={`/sites/${siteId}/visitors`}>
              <a className={classnames('link', { active: path.startsWith(`/sites/${siteId}/visitors`) })} data-label='Visitors'>
                <i className='ri-group-line' />
                <span>Visitors</span>
              </a>
            </Link>
            <Link href={`/sites/${siteId}/recordings`}>
              <a className={classnames('link', { active: path.startsWith(`/sites/${siteId}/recordings`) })} data-label='Recordings'>
                <i className='ri-vidicon-line' />
                <span>Recordings</span>
              </a>
            </Link>
            <Link href={`/sites/${siteId}/analytics`}>
              <a className={classnames('link', { active: path.startsWith(`/sites/${siteId}/analytics`) })} data-label='Analytics'>
                <i className='ri-line-chart-line' />
                <span>Analytics</span>
              </a>
            </Link>
            <div className='divider' />
            <Link href={`/sites/${siteId}/team`}>
              <a className={classnames('link', { active: path.startsWith(`/sites/${siteId}/team`) })} data-label='Team'>
                <i className='ri-group-line' />
                <span>Team</span>
              </a>
            </Link>
            <Link href={`/sites/${siteId}/settings`}>
              <a className={classnames('link', { active: path.startsWith(`/sites/${siteId}/settings`) })} data-label='Settings'>
                <i className='ri-settings-3-line' />
                <span>Settings</span>
              </a>
            </Link>
            <Link href={`/sites/${siteId}/subscription`}>
              <a className={classnames('link', { active: path.startsWith(`/sites/${siteId}/subscription`) })} data-label='Subscriptions'>
                <i className='ri-bank-card-2-line' />
                <span>Subscriptions</span>
              </a>
            </Link>
            <div className='divider' />
            <SidebarAccount path={path} />
          </div>
        </div>
      </menu>
      <footer>
        <Button className='link' onClick={toggleOpen} data-label={open ? 'Expand' : 'Collapse'}>
          <i className='ri-arrow-right-line' />
          <span>Collapse</span>
        </Button>
      </footer>
    </aside>
  );
};
