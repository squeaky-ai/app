import React from 'react';
import type { FC } from 'react';
import Link from 'next/link';
import { Icon } from 'components/icon';
import type { Site } from 'types/graphql';
import { usePlan } from 'hooks/use-plan';

interface Props {
  site: Site;
  page: 'visitors' | 'recordings' | 'analytics' | 'heatmaps' | 'nps' | 'sentiment';
}

export const Unlock: FC<Props> = ({ site, page }) => {
  const { plan } = usePlan({ site });

  if (!plan.exceeded) {
    return null;
  }

  const limit = plan.maxMonthlyRecordings.toLocaleString();

  const lockedRecordings = plan.recordingsLockedCount.toLocaleString();

  const lockedVisitors = plan.visitorsLockedCount.toLocaleString();

  const message: JSX.Element = (() => {
    switch(page) {
      case 'visitors':
        return <p>You&apos;ve reached your monthly recording limit of <b>{limit}</b> recordings. <Link href={`/sites/${site.id}/settings/subscription`}><a>Upgrade</a></Link> to unlock the <b>{lockedRecordings}</b> visits you&apos;ve missed, including <b>{lockedVisitors}</b> new visitors.</p>;
      case 'recordings':
        return <p>You&apos;ve reached your monthly recording limit of <b>{limit}</b> recordings. <Link href={`/sites/${site.id}/settings/subscription`}><a>Upgrade</a></Link> to unlock the <b>{lockedRecordings}</b> visits you&apos;ve missed.</p>
      case 'analytics':
        return <p>You&apos;ve reached your monthly recording limit of <b>{limit}</b> recordings. <Link href={`/sites/${site.id}/settings/subscription`}><a>Upgrade</a></Link> to access the analytics data for visits you&apos;ve missed.</p>
      case 'heatmaps':
        return <p>You&apos;ve reached your monthly recording limit of <b>{limit}</b> recordings. <Link href={`/sites/${site.id}/settings/subscription`}><a>Upgrade</a></Link> to include <b>{lockedRecordings}</b> visits missing from your heatmaps data.</p>
      case 'nps':
      case 'sentiment':
        return <p>You&apos;ve reached your monthly recording limit of <b>{limit}</b> recordings. <Link href={`/sites/${site.id}/settings/subscription`}><a>Upgrade</a></Link> to unlock any feedback you might have missed.</p>
    }
  })();

  const button: string = (() => {
    switch(page) {
      case 'visitors':  
      case 'analytics':
      case 'heatmaps':
        return 'Unlock Data';
      case 'recordings':
        return 'Unlock Recordings';
      case 'nps':
      case 'sentiment':
        return 'Unlock Feedback'
    }
  })();

  return (
    <div className='unlock'>
      <Icon name='error-warning-line' />
      {message}
      <Link href={`/sites/${site.id}/settings/subscription`}>
        <a className='button'>{button}</a>
      </Link>
    </div>
  );
};
