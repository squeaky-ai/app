import React from 'react';
import type { FC } from 'react';
import Link from 'next/link';
import { Icon } from 'components/icon';
import { getRemainingTrialDays } from 'lib/plan';
import type { Site, Team } from 'types/graphql';

interface Props {
  site: Site;
  member: Team;
}

export const FreeTrialTimer: FC<Props> = ({ site, member }) => {
  const diff = getRemainingTrialDays(site, member.role);

  if (diff === null) return null;

  return (
    <Link className='free-trial-timer' href={`/sites/${site.id}/settings/subscription`}>
      <Icon name='time-line' />
      {diff === 0
        ? 'Less than 24 hours remaining'
        : <>{diff} day{diff === 1 ? '' : 's'} remaining</>
      }
    </Link>
  );
};
