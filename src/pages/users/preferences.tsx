import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Container } from 'components/container';
import { Main } from 'components/main';
import { Tabs } from 'components/users/tabs';
import { ServerSideProps, getServerSideProps } from 'lib/auth';
import { Toggle } from 'components/toggle';
import { useDarkMode } from 'hooks/use-dark-mode';

const UsersPreferences: NextPage<ServerSideProps> = ({ user }) => {
  const { darkModeEnabled, setDarkModeEnabled } = useDarkMode();

  const toggleDarkMode = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDarkModeEnabled(event.target.checked);
  };

  return (
    <>
      <Head>
        <title>Squeaky | User - Preferences</title>
      </Head>

      <Main>
        <h3 className='title'>Preferences</h3>

        <Tabs user={user} page='preferences' /> 

        <Container className='xsm'>
          <Toggle checked={darkModeEnabled} onChange={toggleDarkMode}>
            Dark mode
          </Toggle>
        </Container>
      </Main>
    </>
  );
};

export default UsersPreferences;
export { getServerSideProps };
