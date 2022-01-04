import React from 'react';
import type { NextPage } from 'next';
import Link from 'next/link';
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
import { Icon } from 'components/icon';
import { Platform } from 'components/platform';
import { SettingsTabs } from 'components/sites/settings/settings-tabs';
import { MAX_DAYS_BEFORE_POTENTIAL_ISSUE } from 'data/sites/constants';
import type { Site } from 'types/graphql';

const SitesSettingsTrackingCode: NextPage<ServerSideProps> = ({ user }) => {
  const hasPotentialIssue = (site: Site) => site.verifiedAt && site.daysSinceLastRecording >= MAX_DAYS_BEFORE_POTENTIAL_ISSUE;

  const isWorkingFine = (site: Site) => site.verifiedAt && site.daysSinceLastRecording < MAX_DAYS_BEFORE_POTENTIAL_ISSUE;

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
              {site.verifiedAt
                ? hasPotentialIssue(site)
                  ? <span className='status-heading warning'><Icon name='information-line' /><i>Potential Issue</i></span>
                  : <span className='status-heading verified'><Icon name='information-line' /><i>Verified and active</i></span>
                : <span className='status-heading inactive'><Icon name='information-line' /><i>Inactive</i></span>
              }
            </h4>
            
            <div className='tracking-code'>
              <Container className='md'>
                {!site.verifiedAt && (
                  <>
                    <p><b>Your tracking code is not verified.</b> Please follow the instructions below to use Squeaky on your site.</p>

                    <p>Please paste the code below into the <code className='code'>&lt;head&gt;</code> section of your HTML on every page you wish to track on your website <a href={site.url} rel='noreferrer' target='_blank'>{site.url}</a>. This is the code that enables Squeaky to anonymously capture user behaviour, giving you valuable insights into their experience on your site.</p>
                  </>
                )}

                {hasPotentialIssue(site) && (
                  <>
                    <Message
                      type='warning'
                      message={<span><a target='_blank' rel='noreferrer' href={site.url}>{site.url}</a> <b>has not sent any data in the past {site.daysSinceLastRecording} days</b>, there might be an issue with your tracking code. You can check your installation using the button below.</span>}
                    />

                    <p>Please paste the code below into the <code className='code'>&lt;head&gt;</code> section of your HTML on every page you wish to track on your website <a href={site.url} target='_blank' rel='noreferrer'>{site.url}</a>.</p>
                  </>
                )}


                {isWorkingFine(site) && (
                  <p>You can paste the code below into the <code className='code'>&lt;head&gt;</code> section of your HTML on any page that you wish to track on <a href={site.url} target='_blank' rel='noreferrer'>{site.url}</a>.</p>
                )}

                <TrackingCode site={site} />

                <Verify site={site} />
              </Container>
              
              {!site.verifiedAt && (
                <div className='installation-guide'>
                  <h4>
                    <Icon name='book-open-line' />
                    Installation Guides
                  </h4>
                  <p>Need help getting set up? Visit our <Link href='https://squeaky.notion.site/Install-your-tracking-code-6ab27212bb5c434196f494ac43349b72#582b9522ff9a4f268dab90b0be05fbb5'><a target='_blank' rel='noreferrer'>Manual Installation Guide</a></Link>, or try one of the step-by-step platform guides in our help center:</p>

                  <div className='platforms'>
                    <Link href='https://squeaky.notion.site/Wordpress-571e94c409f94748a6c40f67b5d79543'>
                      <a target='_blank' rel='noreferrer'>
                        <Platform platform='wordpress' height={48} width={48} alt='Wordpress Logo' />
                      </a>
                    </Link>
                    <Link href='https://squeaky.notion.site/Shopify-63eef790b11f4ce59108c5f720ff21c5'>
                      <a target='_blank' rel='noreferrer'>
                        <Platform platform='shopify' height={48} width={48} alt='Shopify Logo' />
                      </a>
                    </Link>
                    <Link href='https://squeaky.notion.site/Wix-9b6351ec3cdd48b3ae94f5f8b4f3b8db'>
                      <a target='_blank' rel='noreferrer'>
                        <Platform platform='wix' height={48} width={48} alt='Wix Logo' />
                      </a>
                    </Link>
                    <Link href='https://squeaky.notion.site/Webflow-ea17dbafc682462d9c5f53a62cc963f9'>
                      <a target='_blank' rel='noreferrer'>
                        <Platform platform='webflow' height={48} width={48} alt='Webflow Logo' />
                      </a>
                    </Link>
                    <Link href='https://squeaky.notion.site/Magento-49302bba0c7a48d3aef93e38e8e79643'>
                      <a target='_blank' rel='noreferrer'>
                        <Platform platform='magento' height={48} width={48} alt='Magento Logo' />
                      </a>
                    </Link>
                    <Link href='https://squeaky.notion.site/Drupal-401bce8e455246019e9e429641979c53'>
                      <a target='_blank' rel='noreferrer'>
                        <Platform platform='drupal' height={48} width={48} alt='Drupal Logo' />
                      </a>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </Main>
        )}
      </Page>
    </>
  );
};

export default SitesSettingsTrackingCode;
export { getServerSideProps };
