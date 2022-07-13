import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Container } from 'components/container';
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

  return (
    <>
      <Head>
        <title>Squeaky | User - Feature Flags</title>
      </Head>

      <Main>
        <h4 className='title'>Account Settings</h4>

        <Tabs page='feature-flags' />

        <Container className='md options'>
          <p>Use the feature flags below to toggle early access to beta features we&apos;re currently testing.</p>
          <p>Beta features are stable and using them will have no impact on the quality of your data capture and storage, but we&apos;d love your feedback, so please send any thoughts to <a href='mailto:hello@squeaky.ai'>hello@squeaky.ai</a>.</p>
          {featureFlags.map(flag => (
            <React.Fragment key={flag.key}>
              {(flag.superuser ? user.superuser : true) && (
                <div className='feature-flag'>
                  <Toggle checked={flag.value} onChange={handleChange(flag.key)}>
                    {featureFlagNames[flag.key]}
                  </Toggle>
                  {flag.description && (
                    <p>{flag.description}</p>
                  )}
                </div>
              )}
            </React.Fragment>
          ))}
        </Container>
      </Main>
    </>
  );
};

export default UsersFeatureFlags;
export { getServerSideProps };
