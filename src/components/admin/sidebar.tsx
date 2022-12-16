import React from 'react';
import type { FC } from 'react';
import Link from 'next/link';
import classnames from 'classnames';
import { useRouter } from 'next/router';
import { Icon } from 'components/icon';
import { Button } from 'components/button';
import { Logo } from 'components/logo';
import { Divider } from 'components/divider';
import { SidebarCollapse } from 'components/app/sidebar-collapse';
import { SidebarLink } from 'components/app/sidebar-link';
import { Breakpoints } from 'data/common/constants';
import { useResize } from 'hooks/use-resize';

export const Sidebar: FC = () => {
  const resize = useResize();
  const router = useRouter();

  const isMobile = () => window.innerWidth < Breakpoints.TABLET;

  const [open, setOpen] = React.useState<boolean>(true);

  const toggleOpen = () => setOpen(!open);

  React.useEffect(() => {
    if (isMobile()) {
      setOpen(false);
    }
  }, [router.asPath]);

  React.useEffect(() => {
    setOpen(!isMobile());
  }, [resize.width]);

  return (
    <aside id='app-sidebar' className={classnames({ open })}>
      <Link href='/sites' className='logo large'>
        <Logo logo='main' alt='Logo' height={24} width={78} />
      </Link>
      <Link href='/sites' className='logo small'>
        <Logo logo='small' alt='Logo' height={24} width={18} />
      </Link>
      <span className='admin-indicator'>
        ADMIN
      </span>
      <menu className='left'>
        <div className='slider'>
          <div className='nav left'>
            <SidebarLink
              visibile
              href='/__admin/dashboard'
              active={router.asPath.startsWith('/__admin/dashboard')}
              icon='dashboard-3-line'
              name='Dashboard'
            />
            <Divider />
            <SidebarLink
              visibile
              href='/__admin/users'
              active={router.asPath.startsWith('/__admin/users')}
              icon='group-line'
              name='Users'
            />
            <SidebarLink
              visibile
              href='/__admin/sites'
              active={router.asPath.startsWith('/__admin/sites')}
              icon='window-line'
              name='Sites'
            />
            <Divider />
            <SidebarLink
              visibile
              href='/__admin/blog'
              active={router.asPath.startsWith('/__admin/blog')}
              icon='book-open-line'
              name='Blog'
            />
            <Divider />
            <SidebarLink
              visibile
              href='/api/sidekiq'
              active={false}
              icon='line-chart-line'
              name='Sidekiq'
              external
            />
          </div>
        </div>
      </menu>
      <Button className='menu-toggle' onClick={toggleOpen}>
        {open ? <Icon name='close-line' /> : <Icon name='menu-line' />}
      </Button>
      <footer>
        <SidebarCollapse open={open} toggleOpen={toggleOpen} />
      </footer>
    </aside>
  );
};
