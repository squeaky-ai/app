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
  snippet: string;
  videoName?: string;
}

export const EmptyState: FC<Props> = ({
  site,
  title,
  subtitle,
  videoName,
  snippet,
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
                <p>New to Squeaky? Please <Link href={`/sites/${router.query.site_id}/settings/details/tracking-code`}>install your tracking code</Link> to begin recording user sessions for your website or web app.</p>
                <p>{snippet}</p>
              </>
            }
          />
        )}
        
        {!isVerified && (
          <EmptyStateHint
            title='Install your tracking code'
            icon='code-s-slash-line'
            videoName={videoName}
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
