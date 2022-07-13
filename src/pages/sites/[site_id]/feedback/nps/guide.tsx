import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import classnames from 'classnames';
import { Icon } from 'components/icon';
import { Main } from 'components/main';
import { Page } from 'components/sites/page';
import { Illustration } from 'components/illustration';
import { Container } from 'components/container';
import { EmptyStateHint } from 'components/sites/empty-state-hint';
import { ServerSideProps, getServerSideProps } from 'lib/auth';
import { NpsTabs } from 'components/sites/feedback/nps-tabs';
import { BreadCrumbs } from 'components/sites/breadcrumbs';
import { Card } from 'components/card';

const SitesFeedbackNpsGuide: NextPage<ServerSideProps> = ({ user }) => (
  <>
    <Head>
      <title>Squeaky | Feedback | NPS | Guide</title>
    </Head>

    <Page user={user} scope={[]}>
      {({ site }) => (
        <Main className={classnames({ empty: !site.verifiedAt })}>
          <BreadCrumbs site={site} items={[{ name: 'Feedback' }, { name: 'NPS Score®' }]} />

          <h4 className='title'>Net Promoter Score®</h4>
        
          <Container className='xl centered empty-state'>
            <div className='empty-state-contents'>
              <Illustration illustration='illustration-9' height={240} width={320} alt='Illustration to represent the empty NPS page' />
              <h4>Awaiting tracking code installation</h4>
              <EmptyStateHint
                title='Collecting Session Recordings'
                body={
                  <>
                    <p>New to Squeaky? Once you have <Link href={`/sites/${site.id}/settings/details/tracking-code`}><a>installed your tracking code</a></Link> this page will enable you to configure how you wish to collect user feedback, and let you review all incoming feedback in one place.</p>
                  </>
                }
              />
            </div>
          </Container>

          {!!site.verifiedAt && (
            <>
              <NpsTabs siteId={site.id} page='guide' />

              <Container className='md'>
                <p>NPS® is a micro customer survey that combines a rating scale from 0 to 10 with a free text field that asks a visitor why they gave the rating they selected. Each time, the same question is always asked: &quot;How likely are you to recommend X to a friend or colleague&quot;, where the name of the company, product or service is used to take the place of &quot;X&quot;.</p>
                
                <h4>Outcomes</h4>

                <div className='outcomes'>
                  <div className='items'>
                    <div className='number detractor'>0</div>
                    <div className='number detractor'>1</div>
                    <div className='number detractor'>2</div>
                    <div className='number detractor'>3</div>
                    <div className='number detractor'>4</div>
                    <div className='number detractor'>5</div>
                    <div className='number detractor'>6</div>
                    <div className='number passive'>7</div>
                    <div className='number passive'>8</div>
                    <div className='number promoter'>9</div>
                    <div className='number promoter'>10</div>
                  </div>
                  <div className='labels'>
                    <p className='detractor'><span>Detractors</span></p>
                    <p className='passive'><span>Passives</span></p>
                    <p className='promoter'><span>Promoters</span></p>
                  </div>
                </div>

                <p>After collecting data, the Net Promoter Score® is determined based on the <b>three possible groups</b> that the vistors fall into: <b>Promoters</b>, <b>Passives</b> or <b>Detractors</b>.</p>

                <p>The total score for your company is based on the percentage of promoters minus the percentage of detractors. You will end up with a value is between -100 and +100. The lower the value, the less satisfied your visitors are and the less likely they would be to recommend your company.</p>

                <h4>Group definitions</h4>

                <p>The three groups that NPS® segments your visitors by are categorised as follows:</p>

                <Card className='definition promoter'>
                  <p className='heading'><Icon name='group-line' />Promoters <i>(9-10 points)</i></p>
                  <p>These visitors are those who are actively recommending your brand or company, and therefore help you to win new customers. You should aim to attract as many promoters as possible.</p>
                </Card>

                <Card className='definition passive'>
                  <p className='heading'><Icon name='group-line' />Passives <i>(7-8 points)</i></p>
                  <p>These visitors are not 100 percent satisfied with the experience, products or services you provide, and are unlikely to recommend you to others.</p>
                </Card>

                <Card className='definition detractor'>
                  <p className='heading'><Icon name='group-line' />Detractors <i>(0-6 points)</i></p>
                  <p>These visitors are critical of your company, and likely to advise friends, acquaintances, and other potential customers not to use your business. Their comments should be taken seriously and help drive product improvements.</p>
                </Card>
              </Container>
            </>
          )}
        </Main>
      )}
    </Page>
  </>
);

export default SitesFeedbackNpsGuide;
export { getServerSideProps };
