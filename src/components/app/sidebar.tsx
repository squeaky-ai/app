import React from 'react';
import type { FC } from 'react';
import Link from 'next/link';
import classnames from 'classnames';
import { useRouter } from 'next/router';
import { Button } from 'components/button';
import { Divider } from 'components/divider';
import { SidebarAccount } from 'components/app/sidebar-account';
import { SidebarSiteSettings } from 'components/app/sidebar-site-settings';
import { SidebarSiteFeedback } from 'components/app/sidebar-site-feedback';
import { Logo } from 'components/logo';
import { Breakpoints } from 'data/common/constants';
import { Preferences, Preference } from 'lib/preferences';
import { SidebarDarkmode } from 'components/app/sidebar-darkmode';
import { SidebarCollapse } from 'components/app/sidebar-collapse';

export const Sidebar: FC = () => {
  const router = useRouter();
  const [open, setOpen] = React.useState<boolean>(true);
  const [position, setPosition] = React.useState<'left' | 'right'>('left');

  const path = router.asPath;
  const siteId = router.query.site_id as string;
  const isMobile = () => window.innerWidth < Breakpoints.TABLET;

  const toggleOpen = () => {
    setOpen(!open);

    if (!isMobile()) {
      Preferences.setBoolean(Preference.SIDEBAR_CLOSED, open);
    }
  };

  React.useEffect(() => {
    setPosition(path.startsWith('/sites/') ? 'right' : 'left');

    if (isMobile()) {
      setOpen(false);
    }
  }, [path]);

  React.useEffect(() => {
    const closed = Preferences.getBoolean(Preference.SIDEBAR_CLOSED) || isMobile();
    if (closed) setOpen(false);
  }, []);

  return (
    <aside id='app-sidebar' className={classnames({ open })}>
      <Link href='/sites'>
        <a className='logo large'>
          <Logo src='logo' alt='Logo' height={32} width={103} dark />
        </a>
      </Link>
      <Link href='/sites'>
        <a className='logo small'>
          <Logo src='logo-small' alt='Logo' height={32} width={24} dark />
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
            <Divider />
            <Link href={`/sites/${siteId}/analytics`}>
              <a className={classnames('link', { active: path.startsWith(`/sites/${siteId}/analytics`) })} data-label='Analytics'>
                <i className='ri-line-chart-line' />
                <span>Analytics</span>
              </a>
            </Link>
            <SidebarSiteFeedback path={path} siteId={siteId} />
            <Link href={`/sites/${siteId}/heatmaps`}>
              <a className={classnames('link', { active: path.startsWith(`/sites/${siteId}/heatmaps`) })} data-label='Heatmaps'>
                <i className='ri-fire-line' />
                <span>Heatmaps</span>
              </a>
            </Link>
            <Divider />
            <SidebarSiteSettings path={path} siteId={siteId} />
          </div>
        </div>
      </menu>
      <Button className='menu-toggle' onClick={toggleOpen}>
        {open ? <i className='ri-close-line' /> : <i className='ri-menu-line' />}
      </Button>
      <footer>
        <SidebarAccount path={path} />
        <SidebarDarkmode />
        <SidebarCollapse open={open} toggleOpen={toggleOpen} />
      </footer>
    </aside>
  );
};
 