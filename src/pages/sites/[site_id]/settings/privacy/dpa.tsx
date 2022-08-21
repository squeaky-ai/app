import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Main } from 'components/main';
import { Access } from 'components/sites/access';
import { Page } from 'components/sites/page';
import { Container } from 'components/container';
import { BreadCrumbs } from 'components/sites/breadcrumbs';
import { PrivacyTabs } from 'components/sites/settings/privacy-tabs';
import { OWNER, ADMIN } from 'data/teams/constants';
import { ServerSideProps, getServerSideProps } from 'lib/auth';

const SitesSettingsPrivacyDpa: NextPage<ServerSideProps> = ({ user }) => {
  return (
    <>
      <Head>
        <title>Squeaky | Site Settings | Privacy</title>
      </Head>

      <Page user={user} scope={[OWNER, ADMIN]}>
        {({ site }) => (
          <Main>
            <BreadCrumbs site={site} items={[{ name: 'Settings', href: `/sites/${site.id}/settings/details` }, { name: 'Privacy' }]} />

            <h4 className='title'>
              Privacy
              <Access roles={[OWNER, ADMIN]} />
            </h4>

            <PrivacyTabs site={site} page='dpa' />

            <Container className='md dpa'>
              <h4>Data Processing Agreement (DPA)</h4>

              <h5>When do you need a DPA?</h5>
              <p>If you are making use of Squeaky&apos;s privacy tools to ensure you never capture personal data from your visitors (which are turned on by default) then you most likely will not need to use a Data Processing Agreement.</p>
              <p>However, if you do choose to capture personal data with Squeaky, or pass personal data about your visitors to Squeaky using our data linking tools, then you will likely need to sign a DPA - especially if your business is subject to GDPR.</p>

              <h5>Signing a DPA with Squeaky</h5>
              <p>If Squeaky will be processing personal data on your behalf then please get in touch via email using the address <a href='mailto:legal@squeaky.ai'>legal@squeaky.ai</a>, with the subject line: DPA. We&apos;ll then provide you with a copy of our Data Processing Agreement for you to review and sign. The agreement outlines the specifics of how we will perform data processing, what our obligations are, as well as the obligations of our users/customers.</p>
            </Container>
          </Main>
        )}
      </Page>
    </>
  );
};

export default SitesSettingsPrivacyDpa;
export { getServerSideProps };
