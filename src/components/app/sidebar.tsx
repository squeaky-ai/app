import React from 'react';
import type { FC } from 'react';
import Link from 'next/link';
import classnames from 'classnames';
import { uniq, without } from 'lodash';
import { useRouter } from 'next/router';
import { Icon } from 'components/icon';
import { Button } from 'components/button';
import { Divider } from 'components/divider';
import { SidebarAccount } from 'components/app/sidebar-account';
import { SidebarNested } from 'components/app/sidebar-nested';
import { Logo } from 'components/logo';
import { SidebarSupport } from 'components/app/sidebar-support';
import { SidebarCollapse } from 'components/app/sidebar-collapse';
import { useSidebar } from 'hooks/use-sidebar';
import { Breakpoints } from 'data/common/constants';
import { Preferences, Preference } from 'lib/preferences';
import { OWNER, ADMIN } from 'data/teams/constants';
import { useResize } from 'hooks/use-resize';
import { useFeatureFlags } from 'hooks/use-feature-flags';
import { FeatureFlag } from 'lib/feature-flags';

export const Sidebar: FC = () => {
  const ref = React.useRef<HTMLElement>(null);
  const resize = useResize();
  const router = useRouter();

  const { featureFlagEnabled } = useFeatureFlags();

  const [open, setOpen] = React.useState<boolean>(true);
  const [expanded, setExpanded] = React.useState<string[]>([]);
  const [position, setPosition] = React.useState<'left' | 'right'>('left');

  const { sidebar } = useSidebar();

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

    setExpanded(expanded => {
      // This does not behave the others and should
      // always be closed on body click
      return expanded.filter(e => e !== 'support');
    });
  };

  const onBodyClick = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as HTMLElement)) {
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

  React.useEffect(() => {
    setOpen(!isMobile());
  }, [resize.width]);

  return (
    <aside ref={ref} id='app-sidebar' className={classnames({ open })}>
      <Link href='/sites'>
        <a className='logo large'>
          <Logo logo='main' alt='Logo' height={32} width={103} />
        </a>
      </Link>
      <Link href='/sites'>
        <a className='logo small'>
          <Logo logo='small' alt='Logo' height={32} width={24} />
        </a>
      </Link>
      <menu className={position}>
        <div className='slider'>
          <div className='nav left'>
            <Link href='/sites'>
              <a className={classnames('link', { active: path.startsWith('/sites') })} data-label='All Sites'>
                <Icon name='window-line' />
                <span>All Sites</span>
              </a>
            </Link>
          </div>
          <div className='nav right'>
            <Link href={`/sites/${siteId}/dashboard`}>
              <a className={classnames('link', { active: path.startsWith(`/sites/${siteId}/dashboard`) })} data-label='Dashboard'>
                <Icon name='dashboard-3-line' />
                <span>Dashboard</span>
              </a>
            </Link>
            <Divider />
            <Link href={`/sites/${siteId}/visitors`}>
              <a className={classnames('link', { active: path.startsWith(`/sites/${siteId}/visitors`) })} data-label='Visitors'>
                <Icon name='group-line' />
                <span>Visitors</span>
              </a>
            </Link>
            <Link href={`/sites/${siteId}/recordings`}>
              <a className={classnames('link', { active: path.startsWith(`/sites/${siteId}/recordings`) })} data-label='Recordings'>
                <Icon name='vidicon-line' />
                <span>Recordings</span>
              </a>
            </Link>
            {featureFlagEnabled(FeatureFlag.EVENTS_PAGE) && (
              <Link href={`/sites/${siteId}/events`}>
                <a className={classnames('link', { active: path.startsWith(`/sites/${siteId}/events`) })} data-label='Events'>
                  <Icon name='flashlight-line' />
                  <span>Events</span>
                </a>
              </Link>
            )}
            <Divider />
            <SidebarNested
              name='Analytics'
              icon='line-chart-line'
              collapse={() => collapse('analytics')}
              expand={() => expand('analytics')}
              expanded={expanded.includes('analytics')}
            >
              <Link href={`/sites/${siteId}/analytics/site/traffic`}>
                <a className={classnames('button', { active: path.startsWith(`/sites/${siteId}/analytics/site`) })} data-label='Analytics'>
                  Site
                </a>
              </Link>
              <Link href={`/sites/${siteId}/analytics/page/traffic`}>
                <a className={classnames('button', { active: path.startsWith(`/sites/${siteId}/analytics/page`) })} data-label='Analytics'>
                  Page
                </a>
              </Link>
            </SidebarNested>
            <Link href={`/sites/${siteId}/journeys`}>
              <a className={classnames('link', { active: path.startsWith(`/sites/${siteId}/journeys`) })} data-label='Journeys'>
                <Icon name='guide-line' />
                <span>Journeys</span>
              </a>
            </Link>
            <Link href={`/sites/${siteId}/heatmaps`}>
              <a className={classnames('link', { active: path.startsWith(`/sites/${siteId}/heatmaps`) })} data-label='Heatmaps'>
                <Icon name='fire-line' />
                <span>Heatmaps</span>
              </a>
            </Link>
            <SidebarNested
              name='Feedback'
              icon='user-voice-line'
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
            {[OWNER, ADMIN].includes(sidebar.role) && (
              <>
              <Divider />
                <SidebarNested 
                  name='Settings'
                  icon='settings-3-line'
                  collapse={() => collapse('settings')}
                  expand={() => expand('settings')}
                  expanded={expanded.includes('settings')}
                  warning={!sidebar.validBilling}
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
                  {sidebar.role === OWNER && (
                    <Link href={`/sites/${siteId}/settings/subscription`}>
                      <a className={classnames('button', { active: path.startsWith(`/sites/${siteId}/settings/subscription`) })} data-label='Subscription'>
                        Subscription
                        {!sidebar.validBilling && (
                          <Icon name='error-warning-fill' className='warning' />
                        )}
                      </a>
                    </Link>
                  )}
                </SidebarNested>
              </>
            )}
          </div>
        </div>
      </menu>
      <Button className='menu-toggle' onClick={toggleOpen}>
        {open ? <Icon name='close-line' /> : <Icon name='menu-line' />}
      </Button>
      <div className='feedback'>
        <p>Get in touch:</p>
        <a href='mailto:hello@squeaky.ai'>hello@squeaky.ai</a>
      </div>
      <footer>
        <SidebarAccount path={path} />
        <SidebarSupport 
          collapse={() => collapse('support')}
          expand={() => expand('support')}
          expanded={expanded.includes('support')}
        />
        <SidebarCollapse open={open} toggleOpen={toggleOpen} />
      </footer>
    </aside>
  );
};
 