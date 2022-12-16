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
import { Icon } from 'components/icon';
import { Platform } from 'components/platform';
import { SettingsTabs } from 'components/sites/settings/settings-tabs';
import { MAX_DAYS_BEFORE_POTENTIAL_ISSUE } from 'data/sites/constants';
import { useTrackingCode } from 'hooks/use-tracking-code';
import { guideLinks } from 'data/sites/constants';
import type { Site } from 'types/graphql';

const SitesSettingsTrackingCode: NextPage<ServerSideProps> = ({ user }) => {
  const { verifiedAt } = useTrackingCode();

  const hasPotentialIssue = (site: Site) => verifiedAt && site.daysSinceLastRecording >= MAX_DAYS_BEFORE_POTENTIAL_ISSUE;

  const isWorkingFine = (site: Site) => verifiedAt && site.daysSinceLastRecording < MAX_DAYS_BEFORE_POTENTIAL_ISSUE;

  return (
    <>
      <Head>
        <title>Squeaky | Site Settings | Tracking Code</title>
      </Head>

      <Page user={user} scope={[OWNER, ADMIN]}>
        {({ site, member }) => (
          <Main>
            <BreadCrumbs site={site} items={[{ name: 'Settings', href: `/sites/${site.id}/settings/details` }, { name: 'Tracking Code' }]} />

            <h4 className='title'>
              Site Settings
              <Access roles={[OWNER, ADMIN]} />
            </h4>

            <SettingsTabs site={site} member={member} page='tracking-code' />

            <h4>
              Tracking code
              {verifiedAt
                ? hasPotentialIssue(site)
                  ? <span className='status-heading warning'><Icon name='information-line' /><i>Potential Issue</i></span>
                  : <span className='status-heading verified'><Icon name='information-line' /><i>Verified and active</i></span>
                : <span className='status-heading inactive'><Icon name='information-line' /><i>Inactive</i></span>
              }
            </h4>
            
            <div className='tracking-code'>
              <Container className='md'>
                {!verifiedAt && (
                  <>
                    <p><b>Your tracking code is not verified.</b> Please follow the instructions below to use Squeaky on your site.</p>

                    <p>Please paste the code below into the <code className='code'>&lt;head&gt;</code> section of your HTML on every page you wish to track on your website <a href={site.url} rel='noreferrer' target='_blank' className='external-link'><span>{site.url}</span> <Icon name='external-link-line' /></a>. This is the code that enables Squeaky to anonymously capture user behaviour, giving you valuable insights into their experience on your site.</p>
                  </>
                )}

                {hasPotentialIssue(site) && (
                  <>
                    <Message
                      type='warning'
                      message={<span><a target='_blank' rel='noreferrer' href={site.url}>{site.url}</a> <b>has not sent any data in the past {site.daysSinceLastRecording} days</b>, there might be an issue with your tracking code.</span>}
                    />

                    <p>Please paste the code below into the <code className='code'>&lt;head&gt;</code> section of your HTML on every page you wish to track on your website <a href={site.url} target='_blank' rel='noreferrer' className='external-link'><span>{site.url}</span> <Icon name='external-link-line' /></a>.</p>
                  </>
                )}


                {isWorkingFine(site) && (
                  <p>You can paste the code below into the <code className='code'>&lt;head&gt;</code> section of your HTML on any page that you wish to track on <a href={site.url} target='_blank' rel='noreferrer' className='external-link'><span>{site.url}</span> <Icon name='external-link-line' /></a>.</p>
                )}

                <TrackingCode site={site} />

                <Verify site={site} />
              </Container>
              
              {!verifiedAt && (
                <div className='installation-guide'>
                  <h4>
                    <Icon name='book-open-line' />
                    Installation Guides
                  </h4>
                  <p>Need help getting set up? Visit our <a href={guideLinks.manual} target='_blank' rel='noreferrer' className='external-link'><span>Manual Installation Guide</span> <Icon name='external-link-line' /></a>, or try one of the step-by-step platform guides in our help center:</p>

                  <div className='platforms'>
                    <a href={guideLinks.wordpress} target='_blank' rel='noreferrer'>
                      <Platform platform='wordpress' height={48} width={48} alt='Wordpress Logo' />
                    </a>
                    <a href={guideLinks.shopify} target='_blank' rel='noreferrer'>
                      <Platform platform='shopify' height={48} width={48} alt='Shopify Logo' />
                    </a>
                    <a href={guideLinks.wix} target='_blank' rel='noreferrer'>
                      <Platform platform='wix' height={48} width={48} alt='Wix Logo' />
                    </a>
                    <a href={guideLinks.webflow} target='_blank' rel='noreferrer'>
                      <Platform platform='webflow' height={48} width={48} alt='Webflow Logo' />
                    </a>
                    <a href={guideLinks.magento} target='_blank' rel='noreferrer'>
                      <Platform platform='magento' height={48} width={48} alt='Magento Logo' />
                    </a>
                    <a href={guideLinks.drupal} target='_blank' rel='noreferrer'>
                      <Platform platform='drupal' height={48} width={48} alt='Drupal Logo' />
                    </a>
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
