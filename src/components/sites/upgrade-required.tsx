import React from 'react';
import type { FC } from 'react';
import Link from 'next/link';
import { Illustration } from 'components/illustration';
import { Container } from 'components/container';
import type { Site } from 'types/graphql';

interface Props {
  site: Site;
}

export const UpgradeRequired: FC<Props> = ({ site }) => (
  <div className='upgrade-required'>
    <Container className='md'>
      <Illustration illustration='illustration-15' height={256} width={256} alt='Unauthorized state' />
      <h2>Upgrade required</h2>
      <p>To access this feature please upgrade your subscription. If you believe you&apos;re being shown this page in error, please contact us via <a href='mailto:hello@squeaky.ai'>hello@squeaky.ai</a>.</p>
      <Link href={`/sites/${site.id}/settings/subscription`} className='button primary'>
        Manage Subscription
      </Link>
    </Container>
  </div>
);
