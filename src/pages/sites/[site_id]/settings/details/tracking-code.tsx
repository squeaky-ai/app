import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Message } from 'components/message';
import { Container } from 'components/container';
import { Verify } from 'components/sites/settings/verify';
import { TrackingCode } from 'components/sites/settings/tracking-code';
import { Main } from 'components/main';
import { Access } from 'components/sites/access';
import { Page } from 'components/sites/page';
import { OWNER, ADMIN } from 'data/teams/constants';
import { ServerSideProps, getServerSideProps } from 'lib/auth';
import { BreadCrumbs } from 'components/sites/breadcrumbs';
import { SettingsTabs } from 'components/sites/settings/settings-tabs';
import { MAX_DAYS_BEFORE_POTENTIAL_ISSUE } from 'data/sites/constants';

const SitesSettingsTrackingCode: NextPage<ServerSideProps> = ({ user }) => {
  return (
    <>
      <Head>
        <title>Squeaky | Site Settings | Tracking Code</title>
      </Head>

      <Page user={user} scope={[OWNER, ADMIN]}>
        {({ site, member }) => (
          <Main>
            <BreadCrumbs site={site} items={[{ name: 'Settings', href: `/sites/${site.id}/settings/details` }, { name: 'Tracking Code' }]} />

            <h3 className='title'>
              Site Settings
              <Access roles={[OWNER, ADMIN]} />
            </h3>

            <SettingsTabs site={site} member={member} page='tracking-code' />

            <h4>
              Tracking code
            </h4>

            <Container className='md'>
              {!site.verifiedAt && (
                <>
                  <Message
                    type='info'
                    message='Your tracking code is not yet verified. Please following the instructions below to start using Squeaky on your site.'
                  />

                  <p>Please paste the code below into the <code className='code'>&lt;head&gt;</code> section of your HTML on every page you wish to track on your website <a href={site.url} rel='noreferrer' target='_blank'>{site.url}</a>. This is the code that enables Squeaky to anonymously capture user behaviour, giving you valuable insights into their experience on your site.</p>
                  <p><b>Please note</b>: You&apos;ll need to add the tracking code to a <b>publicly accessible page</b> (e.g. not behind a login) for us to verify the installation, if this isn&apos;t possible please <a href='/contact-us/' target='_blank'>contact us</a> and we&apos;ll arrange support you with a workaround.</p>
                </>
              )}

              {site.verifiedAt && site.daysSinceLastRecording >= MAX_DAYS_BEFORE_POTENTIAL_ISSUE && (
                <>
                  <Message
                    type='warning'
                    message={<span><a target='_blank' rel='noreferrer' href={site.url}>{site.url}</a> <b>has not sent any data in the past {site.daysSinceLastRecording} days</b>, there might be an issue with your tracking code. You can check your installation using the button below.</span>}
                  />

                  <p>Please paste the code below into the <code className='code'>&lt;head&gt;</code> section of your HTML on every page you wish to track on your website <a href={site.url} target='_blank' rel='noreferrer'>{site.url}</a>.</p>
                </>
              )}


              {site.verifiedAt && site.daysSinceLastRecording < MAX_DAYS_BEFORE_POTENTIAL_ISSUE && (
                <p>You can paste the code below into the <code className='code'>&lt;head&gt;</code> section of your HTML on any page that you wish to track on <a href={site.url} target='_blank' rel='noreferrer'>{site.url}</a>.</p>
              )}

              <TrackingCode site={site} />

              <Verify site={site} />
            </Container>
          </Main>
        )}
      </Page>
    </>
  );
};

export default SitesSettingsTrackingCode;
export { getServerSideProps };
