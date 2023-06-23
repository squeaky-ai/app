import { addDays, differenceInCalendarDays } from 'date-fns';
import { OWNER } from 'data/teams/constants';
import type { AdminSite, Site } from 'types/graphql';

export const getRemainingTrialDays = (site: Site | AdminSite, role?: number): number | null => {
  // Only show to the owner
  if (role !== OWNER) return null;
  // Don't show if they've upgraded to a paid plan
  if (!site.plan.free) return null;

  const today = new Date();
  const createdAt = new Date(site.createdAt.iso8601);
  const freeTrialEndDate = addDays(createdAt, 14);

  // The free trial has already started
  if (freeTrialEndDate < today) return null;

  return differenceInCalendarDays(freeTrialEndDate, today);
};
