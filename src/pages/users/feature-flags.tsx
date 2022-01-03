import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Container } from 'components/container';
import { Unauthorized } from 'components/sites/unauthorized';
import { Tabs } from 'components/users/tabs';
import { Main } from 'components/main';
import { ServerSideProps, getServerSideProps } from 'lib/auth';
import { Toggle } from 'components/toggle';
import { FeatureFlag } from 'lib/feature-flags';
import { useFeatureFlags, featureFlagNames } from 'hooks/use-feature-flags';

const UsersFeatureFlags: NextPage<ServerSideProps> = ({ user }) => {
  const { featureFlags, updateFeatureFlag } = useFeatureFlags();

  const handleChange = (key: FeatureFlag) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;

    updateFeatureFlag(key, checked);
  };

  if (!user.superuser) {
    return <Unauthorized />;
  }

  return (
    <>
      <Head>
        <title>Squeaky | User - Feature Flags</title>
      </Head>

      <Main>
        <h3 className='title'>Account Settings</h3>

        <Tabs user={user} page='feature-flags' />

        <Container className='lg options'>
          {featureFlags.map(flag => (
            <Toggle key={flag.key} checked={flag.value} onChange={handleChange(flag.key)}>
              {featureFlagNames[flag.key]}
            </Toggle>
          ))}
        </Container>
      </Main>
    </>
  );
};

export default UsersFeatureFlags;
export { getServerSideProps };
