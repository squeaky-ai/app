import React from 'react'; 
import type { FC } from 'react';
import Link from 'next/link';
import classnames from 'classnames';
import { Container } from 'components/container';
import { Illustration, IllustrationType } from 'components/illustration';
import { EmptyStateHint } from 'components/sites/empty-state-hint';
import type { Site } from 'types/graphql';

interface Props {
  site: Site;
  title: string;
  illustration: IllustrationType;
}

export const EmptyState: FC<Props> = ({
  site,
  title,
  illustration,
}) => {
  const isVerified = !!site.verifiedAt;

  return (
    <Container className={classnames('xl centered empty-state', { 'unverified': !isVerified })}>
      <div className='empty-state-contents'>
        <Illustration illustration={illustration} height={240} width={320} alt='Illustration to represent the empty page' />
        <h4>{title}</h4>

        {isVerified && (
          <EmptyStateHint
            title='Your data is on the way!'
            body={
              <>
                <p>Your tracking code is verified and active, but it can take <b>30-60 minutes for your first recording to arrive</b>. We&apos;ll email you as soon as your recording arrives.</p>
              </>
            }
          />
        )}
        
        {!isVerified && (
          <EmptyStateHint
            title='Install your tracking code'
            icon='code-s-slash-line'
            body={
              <>
                <p>Please install your tracking code to start capturing data for your site.</p>
                <Link href={`/sites/${site.id}/settings/details/tracking-code`} className='button primary'>
                  Install Tracking Code
                </Link>
              </>
            }
          />
        )}
      </div>
    </Container>
  );
};
