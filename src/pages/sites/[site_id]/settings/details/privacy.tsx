import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Main } from 'components/main';
import { Access } from 'components/sites/access';
import { Page } from 'components/sites/page';
import { Container } from 'components/container';
import { BreadCrumbs } from 'components/sites/breadcrumbs';
import { SettingsTabs } from 'components/sites/settings/settings-tabs';
import { Icon } from 'components/icon';
import { Logo } from 'components/logo';
import { Checkbox } from 'components/checkbox';
import { OWNER, ADMIN } from 'data/teams/constants';
import { ServerSideProps, getServerSideProps } from 'lib/auth';
import { useFeatureFlags } from 'hooks/use-feature-flags';
import { FeatureFlag } from 'lib/feature-flags';
import { magicErasureUpdate } from 'lib/api/graphql';
import { useToasts } from 'hooks/use-toasts';
import type { Site } from 'types/graphql';

const SitesSettingsPrivacy: NextPage<ServerSideProps> = ({ user }) => {
  const toasts = useToasts();
  const { featureFlagEnabled } = useFeatureFlags();

  const magicErasureEnabled = featureFlagEnabled(FeatureFlag.MAGIC_ERASURE);

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
            <BreadCrumbs site={site} items={[{ name: 'Settings', href: `/sites/${site.id}/settings/details` }, { name: 'Privacy' }]} />

            <h3 className='title'>
              Site Settings
              <Access roles={[OWNER, ADMIN]} />
            </h3>

            <SettingsTabs site={site} member={member} page='privacy' />

            <h4>Privacy</h4>

            {!magicErasureEnabled && (
              <Container className='md'>
                <p>At Squeaky we <b>automatically anonymise all data that users input into forms</b>. If there are other types of content you don&apos;t want to record then you can <b>manually apply the following class names</b> to the relevant elements in your codebase:</p>
                <ul className='privacy-code'>
                  <li>An element with the class name <code className='code'>.squeaky-hide</code> will not be recorded. Instead, it will replay as a placeholder with the same dimension.</li>
                  <li>All text of elements with the class name <code className='code'>.squeaky-mask</code> and their children will be masked.</li>
                </ul>
              </Container>
            )}

            {magicErasureEnabled && (
              <Container className='md privacy-options'>
                <p>At Squeaky we <b>automatically anonymise all data that users input into forms</b>. If there are other types of content you don&apos;t want to record, please choose from the options below.</p>

                <p className='option-label'>
                  <Icon name='eraser-line' />
                  Squeaky Magic Eraser
                  <i>No technical expertise required</i>
                </p>

                <p>The magic eraser is a simple tool <b>that only you can see</b> when you visit your website. It allows you to simple click on any element you wish to hide from your recordings e.g. your visitors address. You click the element, and then it will never be capture by the Squeaky tracking code.</p>
                <p>To see the Magic Erasure tool on your site or web app, all you have to do is turn on the visibility use the checkbox below, and visit your site whilst you&apos;re logged in to the Squeaky.</p>

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
              </Container>
            )}
          </Main>
        )}
      </Page>
    </>
  );
};

export default SitesSettingsPrivacy;
export { getServerSideProps };
