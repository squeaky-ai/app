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
      <div className='admin-tag'>
        ADMIN
      </div>
      <menu className='left'>
        <div className='slider'>
          <div className='nav left'>
            <Link href='/__admin/dashboard'>
              <a className={classnames('link', { active: router.asPath.startsWith('/__admin/dashboard') })} data-label='Dashboard'>
                <Icon name='dashboard-3-line' />
                <span>Dashboard</span>
              </a>
            </Link>
            <Divider />
            <Link href='/__admin/users'>
              <a className={classnames('link', { active: router.asPath.startsWith('/__admin/users') })} data-label='Users'>
                <Icon name='group-line' />
                <span>Users</span>
              </a>
            </Link>
            <Link href='/__admin/sites'>
              <a className={classnames('link', { active: router.asPath.startsWith('/__admin/sites') })} data-label='Sites'>
                <Icon name='window-line' />
                <span>Sites</span>
              </a>
            </Link>
            <Divider />
            <Link href='/__admin/blog'>
              <a className={classnames('link', { active: router.asPath.startsWith('/__admin/blog') })} data-label='Blog'>
                <Icon name='book-open-line' />
                <span>Blog</span>
              </a>
            </Link>
            <Divider />
            <a target='_blank' href='/api/sidekiq' className='link' data-label='Sidekiq'>
              <Icon name='line-chart-line' />
              <span>Sidekiq</span>
              <Icon name='external-link-line' className='external' />
            </a>
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
