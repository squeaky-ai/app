import React from 'react';
import type { FC } from 'react';
import Link from 'next/link';
import { Icon } from 'components/icon';
import { Button } from 'components/button';
import { Message } from 'components/message';
import type { Site } from 'types/graphql';

interface Props {
  site: Site;
  loading: boolean;
  handleClick: VoidFunction;
}

export const TrackingCodeFailure: FC<Props> = ({ site, loading, handleClick }) => (
  <Message
    type='error'
    message={
      <div>
        <p><b>We were unable to verify your installation</b></p>
        <p>If you&apos;re confident you&apos;ve completed the step above correctly, please proceed to your site and we&apos;ll email you when your first recording arrives, this can takes up to 30 minutes.</p>
        <p>If you&apos;re unsure, visit our <Link href='https://squeaky.notion.site/Install-your-tracking-code-6ab27212bb5c434196f494ac43349b72'><a target='_blank' rel='noreferrer' className='external-link'><span>troubleshooting page</span> <Icon name='external-link-line' /></a></Link> and try to verify your installation again. </p>
        <div className='actions'>
          <Link href={`/sites/${site.id}/dashboard`}>
            <a className='button primary'>
              Go To Site
            </a>
          </Link>
          <Button type='button' className='secondary' onClick={handleClick}>
            {loading 
              ? 'Verifying ...' 
              : 'Retry Verification'
            }
          </Button>
        </div>
      </div>
    }
  />
);
