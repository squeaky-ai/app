import React from 'react';
import type { FC } from 'react';
import Link from 'next/link';
import { Icon } from 'components/icon';
import type { Site } from 'types/graphql';
import { usePlan } from 'hooks/use-plan';

interface Props {
  site: Site;
}

export const Unlock: FC<Props> = ({ site }) => {
  const { plan } = usePlan({ site });

  if (!plan.exceeded) {
    return null;
  }

  return (
    <div className='unlock'>
      <Icon name='information-line' />
      <p>You&apos;ve reached your monthly recording limit of <b>{plan.recordingsLimit}</b> recordings. <Link href={`/sites/${site.id}/settings/subscription`}><a>Upgrade</a></Link> to unlock the <b>{plan.recordingsLocked}</b> visits you&apos;ve missed.</p>
      <Link href={`/sites/${site.id}/settings/subscription`}>
        <a className='button'>Unlock Recordings</a>
      </Link>
    </div>
  );
};
