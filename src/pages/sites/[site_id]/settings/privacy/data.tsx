import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Main } from 'components/main';
import { Access } from 'components/sites/access';
import { Page } from 'components/sites/page';
import { Card } from 'components/card';
import { Container } from 'components/container';
import { BreadCrumbs } from 'components/sites/breadcrumbs';
import { PrivacyTabs } from 'components/sites/settings/privacy-tabs';
import { Icon } from 'components/icon';
import { Logo } from 'components/logo';
import { Checkbox } from 'components/checkbox';
import { OWNER, ADMIN } from 'data/teams/constants';
import { PrivacyAnonymising } from 'components/sites/settings/privacy-anonymising';
import { PageProps } from 'types/page';
import { magicErasureUpdate } from 'lib/api/graphql';
import { useToasts } from 'hooks/use-toasts';
import type { Site } from 'types/graphql';
import { Divider } from 'components/divider';

const SitesSettingsPrivacyData: NextPage<PageProps> = ({ user }) => {
  const toasts = useToasts();

  const toggleMagicErasureEnabled = (site: Site) => async () => {
    try {
      await magicErasureUpdate({ siteId: site.id, enabled: !site.magicErasureEnabled });
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

            <PrivacyTabs site={site} page='data' />

            <Container className='md privacy-options'>
              <h4>Text &amp; Forms</h4>
              <p>To help you provide privacy-friendly analytics we <b>anonymise all text and form data on your site by default</b>. you can optionally turn this off, or choose to <b>only anonymise text captured in form inputs</b>. This has no impact on the appearance of your site for end-users, our script will simply avoid capturing the data you&apos;ve chosen to anonymise.</p>
              <p>You can still use the Magic Erasure lower down the page, regardless of your text and forms settings.</p>

              <PrivacyAnonymising site={site} />

              <Divider />
    
              <h4>All content</h4>

              <p>If there are other types of content you don&apos;t want to record with the Squeaky tracking code then you can choose from the following two options:</p>

              <Card>
                <p className='option-label'>
                  <Icon name='eraser-line' />
                  Squeaky Magic Eraser
                  <i>No technical expertise required</i>
                </p>

                <p>The magic eraser is a simple tool <b>that only you can see</b> when you visit your website. It allows you to simply click on any element you wish to hide from your recordings e.g. your visitors address. You click the element, and then it will never be capture by the Squeaky tracking code.</p>
                <p>To see the Magic Erasure tool on your site or web app, all you have to do is turn on the visibility using the checkbox below, and visit your site whilst you&apos;re logged in to the Squeaky.</p>

                <Checkbox checked={site.magicErasureEnabled} onChange={toggleMagicErasureEnabled(site)}>
                  Show Magic Erasure
                </Checkbox> 

                {site.magicErasureEnabled && (
                  <div className='magic-erasure-hint'>
                    <div className='magic-erasure-button'>
                      <Logo logo='small' width={17} height={24} alt='Logo' />
                    </div>
                    <p>Look for the erasure button in the bottom-right of your website</p>
                  </div>
                )}
              </Card>

              <Card>
                <p className='option-label'>
                  <Icon name='code-s-slash-line' />
                  Manually Add Class Names
                  <i>Developer help needed</i>
                </p>

                <p>If you have developers that can help you, they can apply the following class names to the relevant elements in your codebase:</p>

                <ul>
                  <li>An element with the class name <code className='code'>.squeaky-hide</code> will not be recorded. Instead, it will replay as a placeholder with the same dimension.</li>
                  <li>All text of elements with the class name <code className='code'>.squeaky-mask</code> and their children will be masked.</li>
                </ul>

                <p>The class names approach is especially well suited to elements that repeat e.g. cells in a table.</p>
              </Card>
            </Container>
          </Main>
        )}
      </Page>
    </>
  );
};

export default SitesSettingsPrivacyData;
