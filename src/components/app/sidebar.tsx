import React from 'react';
import type { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import classnames from 'classnames';
import { useRouter } from 'next/router';
import { Button } from 'components/button';
import { Divider } from 'components/divider';
import { SidebarAccount } from 'components/app/sidebar-account';
import { SidebarFeedback } from 'components/app/sidebar-feedback';
import { SidebarSiteSettings } from 'components/app/sidebar-site-settings';
import { BASE_PATH } from 'data/common/constants';
import { Preferences, Preference } from 'lib/preferences';

export const Sidebar: FC = () => {
  const router = useRouter();
  const [open, setOpen] = React.useState<boolean>(true);
  const [position, setPosition] = React.useState<'left' | 'right'>('left');

  const path = router.asPath;
  const siteId = router.query.site_id as string;

  const toggleOpen = () => {
    setOpen(!open);

    Preferences.setBoolean(Preference.SIDEBAR_CLOSED, open);
  };

  React.useEffect(() => {
    setPosition(path.startsWith('/sites/') ? 'right' : 'left');
  }, [path]);

  React.useEffect(() => {
    const closed = Preferences.getBoolean(Preference.SIDEBAR_CLOSED);
    if (closed) setOpen(false);
  }, []);

  return (
    <aside id='app-sidebar' className={classnames({ open })}>
      <Link href='/sites'>
        <a className='logo'>
          {open
            ? <Image src={`${BASE_PATH}/logo.svg`} alt='Logo' height={32} width={103} />
            : <Image src={`${BASE_PATH}/logo-small.svg`} alt='Logo' height={32} width={24} />
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
            <SidebarFeedback />
          </div>
          <div className='nav right'>
            <Link href={`/sites/${siteId}/overview`}>
              <a className={classnames('link', { active: path.startsWith(`/sites/${siteId}/overview`) })} data-label='Overview'>
                <i className='ri-dashboard-3-line' />
                <span>Overview</span>
              </a>
            </Link>
            <Divider />
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
            <Link href={`/sites/${siteId}/heatmaps`}>
              <a className={classnames('link', { active: path.startsWith(`/sites/${siteId}/heatmaps`) })} data-label='Heatmaps'>
                <i className='ri-fire-line' />
                <span>Heatmaps</span>
                <span className='alpha'>ALPHA</span>
              </a>
            </Link>
            <Link href={`/sites/${siteId}/analytics`}>
              <a className={classnames('link', { active: path.startsWith(`/sites/${siteId}/analytics`) })} data-label='Analytics'>
                <i className='ri-line-chart-line' />
                <span>Analytics</span>
              </a>
            </Link>
            <SidebarSiteSettings path={path} siteId={siteId} />
            <Divider />
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
 