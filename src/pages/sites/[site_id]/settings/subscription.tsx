import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Main } from 'components/main';
import { Illustration } from 'components/illustration';
import { Access } from 'components/sites/access';
import { Page } from 'components/sites/page';
import { EmptyStateHint } from 'components/sites/empty-state-hint';
import { Container } from 'components/container';
import { OWNER } from 'data/teams/constants';
import { BreadCrumbs } from 'components/sites/breadcrumbs';
import { Billing } from 'components/sites/settings/billing';
import { useFeatureFlags } from 'hooks/use-feature-flags';
import { FeatureFlag } from 'lib/feature-flags';
import { ServerSideProps, getServerSideProps } from 'lib/auth';

const SiteSettingsSubscription: NextPage<ServerSideProps> = ({ user }) => {
  const { featureFlagEnabled } = useFeatureFlags();

  return (
    <>
      <Head>
        <title>Squeaky | Site Settings | Subscription</title>
      </Head>

      <Page user={user} scope={[OWNER]}>
        {({ site }) => (
          <Main>
            <BreadCrumbs site={site} items={[{ name: 'Subscription' }]} />

            <h3 className='title'>
              Subscription
              <Access roles={[OWNER]} />
            </h3>

            {!featureFlagEnabled(FeatureFlag.BILLING) && (
              <Container className='xl centered empty-state'>
                <div className='empty-state-contents'>
                  <Illustration illustration='illustration-7' height={240} width={400} alt='Illustration to represent the empty recordings page' />
                  <h4>Squeaky is free during beta testing!</h4>
                  <EmptyStateHint
                    title='Help Squeaky'
                    body={
                      <>
                        <p>Right now, your feedback is worth more to us than money, but before long we will start to charge for our service.</p>
                        <p>If you&apos;ve got ideas or feedback on how we might approach pricing, please email <a href='mailto:hello@squeaky.com'>hello@squeaky.com</a> and let us know.</p>
                      </>
                    }
                  />
                </div>
              </Container>
            )}

            {featureFlagEnabled(FeatureFlag.BILLING) && (
              <Billing />
            )}
          </Main>
        )}
      </Page>
    </>
  );
};

export default SiteSettingsSubscription;
export { getServerSideProps };
