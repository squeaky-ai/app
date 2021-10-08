import React from 'react';
import type { FC } from 'react';
import { Drawer } from 'components/drawer';
import { Message } from 'components/message';
import { Container } from 'components/container';
import { Verify } from 'components/sites/verify';
import { TrackingCode } from 'components/sites/tracking-code';
import { MAX_DAYS_BEFORE_POTENTIAL_ISSUE } from 'data/sites/constants';
import type { Site } from 'types/site';

interface Props {
  site: Site;
}

export const SettingsTrackingCode: FC<Props> = ({ site }) => {
  return (
    <Drawer 
      title='Tracking code' 
      name='code'
      aside={
        site.verifiedAt 
          ? site.daysSinceLastRecording >= MAX_DAYS_BEFORE_POTENTIAL_ISSUE
            ? <span className='warning-badge'><i className='ri-error-warning-line' />Potential Issue</span> 
            : <span className='verified-badge'><i className='ri-checkbox-circle-line' />Verified and active</span> 
          : <span className='unverified-badge'><i className='ri-error-warning-line' />Inactive</span> 
      }
    >
      <Container className='md'>
        {!site.verifiedAt && (
          <>
            <Message
              type='info'
              message='Your tracking code is not yet verified. Please following the instructions below to start using Squeaky on your site.'
            />

            <p>Please paste the code below into the <code className='code'>&lt;head&gt;</code> section of your HTML on every page you wish to track on your website <a href={site.url} rel='noreferrer' target='_blank'>{site.url}</a>.</p>
            <p>This enables Squeaky to anonymously capture user behaviour, giving you valuable insights into their experience on your site.</p>
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
    </Drawer>
  );
};
