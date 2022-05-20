import React from 'react';
import type { FC } from 'react';
import Link from 'next/link';
import { Container } from 'components/container';
import { Illustration, IllustrationType } from 'components/illustration';
import { EmptyStateHint } from 'components/sites/empty-state-hint';
import { useRouter } from 'next/router';

interface Props {
  title: string;
  subtitle: string;
  illustration: IllustrationType;
  snippet: string;
  videoName?: string;
}

export const EmptyState: FC<Props> = ({ title, subtitle, videoName, snippet, illustration }) => {
  const router = useRouter();

  return (
    <Container className='xl centered empty-state'>
      <div className='empty-state-contents'>
        <Illustration illustration={illustration} height={240} width={320} alt='Illustration to represent the empty page' />
        <h4>{title}</h4>
        <EmptyStateHint
          title={subtitle}
          videoName={videoName}
          body={
            <>
              <p>New to Squeaky? Please <Link href={`/sites/${router.query.site_id}/settings/details/tracking-code`}><a>install your tracking code</a></Link> to begin recording user sessions for your website or web app.</p>
              <p>{snippet}</p>
            </>
          }
        />
      </div>
    </Container>
  );
};
