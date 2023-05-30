import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Main } from 'components/main';
import { Access } from 'components/sites/access';
import { Page } from 'components/sites/page';
import { Container } from 'components/container';
import { BreadCrumbs } from 'components/sites/breadcrumbs';
import { Toggle } from 'components/toggle';
import { PrivacyTabs } from 'components/sites/settings/privacy-tabs';
import { OWNER, ADMIN } from 'data/teams/constants';
import { useToasts } from 'hooks/use-toasts';
import { superuserAccessUpdate } from 'lib/api/graphql';
import { ServerSideProps, getServerSideProps } from 'lib/auth';

const SitesSettingsPrivacyCustomerSupport: NextPage<ServerSideProps> = ({ user }) => {
  const toasts = useToasts();

  const handleToggle = async (id: string, event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const { checked } = event.target;
      await superuserAccessUpdate({ siteId: id, enabled: checked });
      toasts.add({ type: 'success', body: 'Your preferences have been updated' });
    } catch(error) {
      console.error(error);
      toasts.add({ type: 'error', body: 'There was an issue updating your preferences' });
    }
  };

  return (
    <>
      <Head>
        <title>Squeaky | Site Settings | Privacy</title>
      </Head>

      <Page user={user} scope={[OWNER, ADMIN]}>
        {({ site, member }) => (
          <Main>
            <BreadCrumbs site={site} member={member} items={[{ name: 'Settings', href: `/sites/${site.id}/settings/details` }, { name: 'Privacy' }]} />

            <h4 className='title'>
              Privacy
              <Access roles={[OWNER, ADMIN]} />
            </h4>

            <PrivacyTabs site={site} page='customer-support' />

            <Container className='md customer-support'>
              <h4>Customer Support Access</h4>
              <p>By default our customer support team have no access to your site. If you wish to provide access for troubleshooting purposes than you can toggle the switch below.</p>
              <p className='small'><b>Please note</b>: It is your responsibility to ensure that any access you provide to our customer support team adheres with the privacy policy and terms of service or your business.</p>
              <Toggle checked={site.superuserAccessEnabled} name='draft' onChange={event => handleToggle(site.id, event)}>
                Customer Support Access
              </Toggle>
            </Container>
          </Main>
        )}
      </Page>
    </>
  );
};

export default SitesSettingsPrivacyCustomerSupport;
export { getServerSideProps };
