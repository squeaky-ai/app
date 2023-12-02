import React from 'react';
import type { FC } from 'react';
import Link from 'next/link';
import { Icon } from 'components/icon';
import { usePlan } from 'hooks/use-plan';
import type { Site } from 'types/graphql';

interface Props {
  site: Site;
}

export const Unlock: FC<Props> = ({ site }) => {
  const { plan } = usePlan();

  if (!plan.exceeded) {
    return null;
  }

  const limit = plan.maxMonthlyRecordings.toLocaleString();

  return (
    <div className='unlock'>
      <Icon name='error-warning-line' />
      <p>You&apos;ve reached your monthly recording limit of <b>{limit}</b> recordings. <Link href={`/sites/${site.id}/settings/subscription`}>Upgrade</Link> to continue capturing data from your site.</p>
      <Link href={`/sites/${site.id}/settings/subscription`} className='button'>
        Upgrade Now
      </Link>
    </div>
  );
};
