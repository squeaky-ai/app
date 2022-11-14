import React from 'react';
import type { FC } from 'react';
import Link from 'next/link';
import classnames from 'classnames';
import { Container } from 'components/container';
import { Illustration, IllustrationType } from 'components/illustration';
import { EmptyStateHint } from 'components/sites/empty-state-hint';
import { useRouter } from 'next/router';
import type { Site } from 'types/graphql';

interface Props {
  site: Site;
  title: string;
  subtitle: string;
  illustration: IllustrationType;
  videoName?: string;
}

export const EmptyState: FC<Props> = ({ 
  site, 
  title, 
  subtitle, 
  videoName, 
  illustration,
}) => {
  const router = useRouter();

  const isVerified = !!site.verifiedAt;

  return (
    <Container className={classnames('xl centered empty-state', { 'unverified': !isVerified })}>
      <div className='empty-state-contents'>
        <Illustration illustration={illustration} height={240} width={320} alt='Illustration to represent the empty page' />
        <h4>{title}</h4>

        {isVerified && (
          <EmptyStateHint
            title={subtitle}
            videoName={videoName}
            body={
              <>
                <p>New to Squeaky? Once you have <Link href={`/sites/${router.query.site_id}/settings/details/tracking-code`}><a>installed your tracking code</a></Link> this page will enable you to configure how you wish to collect user feedback, and let you review all incoming feedback in one place.</p>
              </>
            }
          />
        )}

        {!isVerified && (
          <EmptyStateHint
            title='Install your tracking code'
            videoName={videoName}
            icon='code-s-slash-line'
            body={
              <>
                <p>Please install your tracking code to start capturing data for your site.</p>
                <Link href={`/sites/${site.id}/settings/tracking-code`}>
                  <a className='button primary'>Install Tracking Code</a>
                </Link>
              </>
            }
          />
        )}
      </div>
    </Container>
  );
};
