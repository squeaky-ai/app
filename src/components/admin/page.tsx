import React from 'react';
import type { FC } from 'react';
import Link from 'next/link';
import { sum } from 'lodash';
import { Main } from 'components/main';
import { Icon } from 'components/icon';
import { Logo } from 'components/logo';
import { Container } from 'components/container';
import { Tabs } from 'components/admin/tabs';
import type { AdminTab } from 'types/admin';
import { ActiveVisitorCount } from 'types/graphql';

interface Props {
  tab: AdminTab;
  activeVisitors: ActiveVisitorCount[];
}

export const Page: FC<Props> = ({ tab, children, activeVisitors }) => {
  return (
    <>
      <header className='header'>
        <a href='/' className='logo'>
          <Logo logo='main' height={32} width={103} />
        </a>
      </header>
  
      <Main>
        <Container className='lg centered'>
          <h3>
            Admin Dashboard
            <div>
              <p>
                Active visitors: <b>{sum(activeVisitors.map(m => m.count))}</b>
              </p>
              <span className='divider' />
              <Link href='/sites'>
                <a>
                  Squeaky App
                  <Icon name='arrow-right-line' />
                </a>
              </Link>
            </div>
          </h3> 
          <Tabs tab={tab} />

          {children}
        </Container>
      </Main>
    </>
  );
};
