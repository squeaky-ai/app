import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import { uniq, without } from 'lodash';
import { useRouter } from 'next/router';
import { Icon } from 'components/icon';
import { Button } from 'components/button';
import { SidebarLogo } from 'components/app/sidebar-logo';
import { SidebarAccount } from 'components/app/sidebar-account';
import { SidebarNested } from 'components/app/sidebar-nested';
import { SidebarNestedLink } from 'components/app/sidebar-nested-link';
import { SidebarLink } from 'components/app/sidebar-link';
import { SidebarSupport } from 'components/app/sidebar-support';
import { SidebarGroup } from 'components/app/sidebar-group';
import { SidebarCollapse } from 'components/app/sidebar-collapse';
import { usePageContext } from 'hooks/use-page-context';
import { Breakpoints } from 'data/common/constants';
import { Preferences, Preference } from 'lib/preferences';
import { OWNER, ADMIN } from 'data/teams/constants';
import { useResize } from 'hooks/use-resize';
import type { User } from 'types/graphql';
import { useSiteId } from 'hooks/use-site-id';

interface Props {
  user: User;
}

export const Sidebar: FC<Props> = ({ user }) => {
  const ref = React.useRef<HTMLElement>(null);
  const resize = useResize();
  const router = useRouter();
  const [siteId] = useSiteId();

  const [open, setOpen] = React.useState<boolean>(true);
  const [expanded, setExpanded] = React.useState<string[]>([]);
  const [position, setPosition] = React.useState<'left' | 'right'>('left');

  const { pageState } = usePageContext();

  const path = router.asPath;
  const pathname = router.pathname;
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
    setPosition(pathname.startsWith('/sites/') ? 'right' : 'left');

    if (isMobile()) {
      setOpen(false);
    }

    closeIfMenuIsClosed();

    setDefaultActive('feedback', '/sites/[site_id]/feedback');
    setDefaultActive('settings', '/sites/[site_id]/settings');
    setDefaultActive('heatmaps', '/sites/[site_id]/heatmaps');
    setDefaultActive('analytics', '/sites/[site_id]/analytics');
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
      <SidebarLogo 
        siteId={siteId}
        embedded={pageState.embedded}
      />
      <menu className={position}>
        <div className='slider'>
          <div className='nav left'>
            <SidebarLink
              visibile
              href='/sites'
              active={path.startsWith('/sites')}
              icon='window-line'
              name='All Sites'
            />
            <SidebarLink
              visibile={!!user?.partner}
              href='/partners'
              active={path.startsWith('/partners')}
              icon='user-star-line'
              name='Partner Program'
            />
          </div>
          <div className='nav right'>
            <SidebarLink
              visibile
              href={`/sites/${siteId}/dashboard`}
              active={path.startsWith(`/sites/${siteId}/dashboard`)}
              icon='dashboard-3-line'
              name='Dashboard'
            />
            <SidebarGroup name='Data Capture' visible>
              <SidebarLink
                visibile
                href={`/sites/${siteId}/visitors`}
                active={path.startsWith(`/sites/${siteId}/visitors`)}
                icon='group-line'
                name='Visitors'
              />
              <SidebarLink
                visibile
                href={`/sites/${siteId}/recordings`}
                active={path.startsWith(`/sites/${siteId}/recordings`)}
                icon='vidicon-line'
                name='Recordings'
              />
              <SidebarLink
                visibile
                href={`/sites/${siteId}/events/all`}
                active={path.startsWith(`/sites/${siteId}/events`)}
                icon='flashlight-line'
                name='Events'
              />
              <SidebarLink
                visibile
                href={`/sites/${siteId}/errors`}
                active={path.startsWith(`/sites/${siteId}/errors`)}
                icon='code-s-slash-line'
                name='Errors'
              />
            </SidebarGroup>
            <SidebarGroup name='Analysis' visible>
              <SidebarNested
                name='Analytics'
                icon='line-chart-line'
                collapse={() => collapse('analytics')}
                expand={() => expand('analytics')}
                expanded={expanded.includes('analytics')}
              >
                <SidebarNestedLink
                  href={`/sites/${siteId}/analytics/site/traffic`}
                  active={path.startsWith(`/sites/${siteId}/analytics/site`)}
                  name='Site'
                />
                <SidebarNestedLink
                  href={`/sites/${siteId}/analytics/page/traffic`}
                  active={path.startsWith(`/sites/${siteId}/analytics/page`)}
                  name='Page'
                />
              </SidebarNested>
              <SidebarLink
                visibile
                href={`/sites/${siteId}/journeys`}
                active={path.startsWith(`/sites/${siteId}/journeys`)}
                icon='guide-line'
                name='Journeys'
              />
              <SidebarNested
                name='Heatmaps'
                icon='fire-line'
                collapse={() => collapse('heatmaps')}
                expand={() => expand('heatmaps')}
                expanded={expanded.includes('heatmaps')}
              >
                <SidebarNestedLink
                  href={`/sites/${siteId}/heatmaps/click-positions`}
                  active={path.startsWith(`/sites/${siteId}/heatmaps/click-positions`)}
                  name='Clicks'
                />
                <SidebarNestedLink
                  href={`/sites/${siteId}/heatmaps/click-counts`}
                  active={path.startsWith(`/sites/${siteId}/heatmaps/click-counts`)}
                  name='Click counts'
                />
                <SidebarNestedLink
                  href={`/sites/${siteId}/heatmaps/mouse`}
                  active={path.startsWith(`/sites/${siteId}/heatmaps/mouse`)}
                  name='Mouse'
                />
                <SidebarNestedLink
                  href={`/sites/${siteId}/heatmaps/scroll`}
                  active={path.startsWith(`/sites/${siteId}/heatmaps/scroll`)}
                  name='Scroll'
                />
              </SidebarNested>
            </SidebarGroup>
            <SidebarGroup name='Engagement' visible>
              <SidebarNested
                name='Feedback'
                icon='user-voice-line'
                collapse={() => collapse('feedback')}
                expand={() => expand('feedback')}
                expanded={expanded.includes('feedback')}
              >
                <SidebarNestedLink
                  href={`/sites/${siteId}/feedback/nps`}
                  active={path.startsWith(`/sites/${siteId}/feedback/nps`)}
                  name='NPS®'
                />
                <SidebarNestedLink
                  href={`/sites/${siteId}/feedback/sentiment`}
                  active={path.startsWith(`/sites/${siteId}/feedback/sentiment`)}
                  name='Sentiment'
                />
              </SidebarNested>
            </SidebarGroup>
            <SidebarGroup name='Settings' visible={[OWNER, ADMIN].includes(pageState.role)}>
              <SidebarLink
                visibile
                href={`/sites/${siteId}/settings/details${pageState.embedded ? '/tags' : ''}`}
                active={path.startsWith(`/sites/${siteId}/settings/details`)}
                icon='window-line'
                name='Site'
              />
              <SidebarLink
                visibile
                href={`/sites/${siteId}/settings/team`}
                active={path.startsWith(`/sites/${siteId}/settings/team`)}
                icon='group-line'
                name='Team'
              />
              <SidebarLink
                visibile
                href={`/sites/${siteId}/settings/privacy/data`}
                active={path.startsWith(`/sites/${siteId}/settings/privacy/data`)}
                icon='ghost-line'
                name='Privacy'
              />
              <SidebarLink
                visibile={pageState.role === OWNER}
                href={`/sites/${siteId}/settings/subscription`}
                active={path.startsWith(`/sites/${siteId}/settings/subscription`)}
                icon='bank-card-2-line'
                name='Subscription'
                warning={!pageState.validBilling}
              />
            </SidebarGroup>
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
        <SidebarAccount 
          path={path}
          visible={!pageState.embedded}
        />
        <SidebarSupport 
          user={user}
          collapse={() => collapse('support')}
          expand={() => expand('support')}
          expanded={expanded.includes('support')}
        />
        <SidebarCollapse 
          open={open} 
          toggleOpen={toggleOpen} 
        />
      </footer>
    </aside>
  );
};
 