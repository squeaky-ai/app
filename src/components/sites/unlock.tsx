import React from 'react';
import type { FC } from 'react';
import Link from 'next/link';
import { Icon } from 'components/icon';
import type { Site } from 'types/graphql';

interface Props {
  site: Site;
}

export const Unlock: FC<Props> = ({ site }) => {
  const planCount = 500;
  const unlockableCount: number = 0;

  if (unlockableCount === 0) {
    return null;
  }

  return (
    <div className='unlock'>
      <Icon name='information-line' />
      <p>You&apos;ve reached your monthly recording limit of <b>{planCount}</b> recordings. <Link href={`/sites/${site.id}/settings/subscription`}><a>Upgrade</a></Link> to unlock the <b>{unlockableCount}</b> visits you&apos;ve missed.</p>
      <Link href={`/sites/${site.id}/settings/subscription`}>
        <a className='button'>Unlock Recordings</a>
      </Link>
    </div>
  );
};
