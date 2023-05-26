import Link from 'next/link';
import React from 'react';
import type { FC } from 'react';
import { addDays, differenceInCalendarDays } from 'date-fns';
import { Icon } from 'components/icon';
import { OWNER } from 'data/teams/constants';
import type { Site, Team } from 'types/graphql';

interface Props {
  site: Site;
  member: Team;
}

export const FreeTrialTimer: FC<Props> = ({ site, member }) => {
  // Only show to the owner
  if (member.role !== OWNER) return null;
  // Don't show if they've upgraded to a paid plan
  if (!site.plan.free) return null;

  const today = new Date();
  const createdAt = new Date(site.createdAt.iso8601);
  const freeTrialEndDate = addDays(createdAt, 14);

  // The free trial has already started
  if (freeTrialEndDate < today) return null;

  const diff = differenceInCalendarDays(freeTrialEndDate, today);

  return (
    <Link className='free-trial-timer' href={`/sites/${site.id}/settings/subscription`}>
      <Icon name='time-line' />
      {diff} day{diff === 1 ? '' : 's'} remaining
    </Link>
  );
};
