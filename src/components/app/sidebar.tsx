import React from 'react';
import type { FC } from 'react';
import Link from 'next/link';
import classnames from 'classnames';
import { uniq, without } from 'lodash';
import { useRouter } from 'next/router';
import { Button } from 'components/button';
import { Divider } from 'components/divider';
import { SidebarAccount } from 'components/app/sidebar-account';
import { SidebarNested } from 'components/app/sidebar-nested';
import { Logo } from 'components/logo';
import { Breakpoints } from 'data/common/constants';
import { Preferences, Preference } from 'lib/preferences';
import { SidebarDarkmode } from 'components/app/sidebar-darkmode';
import { SidebarCollapse } from 'components/app/sidebar-collapse';

export const Sidebar: FC = () => {
  const ref = React.useRef<HTMLElement>(null);
  const router = useRouter();

  const [open, setOpen] = React.useState<boolean>(true);
  const [expanded, setExpanded] = React.useState<string[]>([]);
  const [position, setPosition] = React.useState<'left' | 'right'>('left');

  const path = router.asPath;
  const pathname = router.pathname;
  const siteId = router.query.site_id as string;
  const isMobile = () => window.innerWidth < Breakpoints.TABLET;

  const toggleOpen = () => {
    setOpen(!open);

    if (!isMobile()) {
      Preferences.setBoolean(Preference.SIDEBAR_CLOSED, open);
    }
  };

  const expand = (name: string) => {
    setExpanded(e => uniq([...e, name]));
  };

  const collapse = (name: string) => {
    setExpanded(e => without(e, name));
  };

  const setDefaultActive = (name: string, path: string) => {
    const active = pathname.startsWith(path);
    active ? expand(name) : collapse(name);
  };

  const closeIfMenuIsClosed = () => {
    // This is a hack to make sure the state
    // is not stale. The closure stores the value
    // when it's defined which is going to be wrong
    setOpen(open => {
      if (!open) setExpanded([]);
      return open;
    });
  };

  const onBodyClick = (event: MouseEvent) => {
    if (ref && !ref.current.contains(event.target as HTMLElement)) {
      closeIfMenuIsClosed();
    }
  };

  React.useEffect(() => {
    setPosition(path.startsWith('/sites/') ? 'right' : 'left');

    if (isMobile()) {
      setOpen(false);
    }

    closeIfMenuIsClosed();

    setDefaultActive('feedback', '/sites/[site_id]/feedback');
    setDefaultActive('settings', '/sites/[site_id]/settings');
  }, [path]);

  React.useEffect(() => {
    const closed = Preferences.getBoolean(Preference.SIDEBAR_CLOSED) || isMobile();
    if (closed) setOpen(false);

    document.addEventListener('click', onBodyClick);

    return () => document.removeEventListener('click', onBodyClick, true);
  }, []);

  return (
    <aside ref={ref} id='app-sidebar' className={classnames({ open })}>
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
            <SidebarNested 
              name='Feedback'
              icon='ri-user-voice-line'
              collapse={() => collapse('feedback')}
              expand={() => expand('feedback')}
              expanded={expanded.includes('feedback')}
            >
              <Link href={`/sites/${siteId}/feedback/nps`}>
                <a className={classnames('button', { active: path.startsWith(`/sites/${siteId}/feedback/nps`) })}>
                  NPS®
                </a>
              </Link>
              <Link href={`/sites/${siteId}/feedback/sentiment`}>
                <a className={classnames('button', { active: path.startsWith(`/sites/${siteId}/feedback/sentiment`) })}>
                  Sentiment
                </a>
              </Link>
            </SidebarNested>
            <Link href={`/sites/${siteId}/heatmaps`}>
              <a className={classnames('link', { active: path.startsWith(`/sites/${siteId}/heatmaps`) })} data-label='Heatmaps'>
                <i className='ri-fire-line' />
                <span>Heatmaps</span>
              </a>
            </Link>
            <Divider />
            <SidebarNested 
              name='Settings'
              icon='ri-settings-3-line'
              collapse={() => collapse('settings')}
              expand={() => expand('settings')}
              expanded={expanded.includes('settings')}
            >
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
            </SidebarNested>
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
 