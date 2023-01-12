import type { Plan, SitesPlan } from 'types/graphql';
import type { PlanData } from 'types/billing';

export enum Plans {
  Free = '05bdce28-3ac8-4c40-bd5a-48c039bd3c7f',
  Starter = 'b5be7346-b896-4e4f-9598-e206efca98a6',
  Light = '094f6148-22d6-4201-9c5e-20bffb68cc48',
  Plus = 'f20c93ec-172f-46c6-914e-6a00dff3ae5f',
  Business = 'b2054935-4fdf-45d0-929b-853cfe8d4a1c',
}

export const buildPlanData = (plans: Plan[], plan: SitesPlan): PlanData[] => {
  const getPlanByPlanId = (planId: string) => plans.find(plan => plan.id === planId);

  const freePlan = getPlanByPlanId(Plans.Free);
  const starterPlan = getPlanByPlanId(Plans.Starter);
  const lightPlan = getPlanByPlanId(Plans.Light);
  const plusPlan = getPlanByPlanId(Plans.Plus);
  const businessPlan = getPlanByPlanId(Plans.Business);

  const pluralise = (count: number) => `${count === 1 ? '' : 's'}`;

  return [
    {
      name: 'Free',
      plan: freePlan,
      show: true,
      current: plan.planId === Plans.Free,
      usage: [
        `${freePlan.maxMonthlyRecordings.toLocaleString()} visits per month`,
        `${freePlan.teamMemberLimit} team member${pluralise(freePlan.teamMemberLimit)}`,
        `${freePlan.siteLimit} website${pluralise(freePlan.siteLimit)}`,
        `${freePlan.dataStorageMonths} month data retention`,
      ],
      includesCapabilitiesFrom: null,
      capabilities: [
        'Website dashboard',
        'Visitor profiles',
        'Session recording',
        'Site analytics',
        'Heatmaps (Click)',
      ],
      options: [],
    },
    {
      name: 'Starter',
      plan: starterPlan,
      show: true,
      current: plan.planId === Plans.Starter,
      usage: [
        `${starterPlan.maxMonthlyRecordings.toLocaleString()} visits per month`,
        `${starterPlan.teamMemberLimit || 'Unlimited'} team member${pluralise(starterPlan.teamMemberLimit)}`,
        `${starterPlan.siteLimit} website${pluralise(starterPlan.siteLimit)}`,
        `${starterPlan.dataStorageMonths} month data retention`,
      ],
      includesCapabilitiesFrom: 'Free',
      capabilities: [
        'Heatmaps (Click and Scroll)',
        'Survey library',
      ],
      options: [],
    },
    {
      name: 'Light',
      plan: lightPlan,
      show: plan.planId === Plans.Light,
      current: plan.planId === Plans.Light,
      usage: [
        `${lightPlan.maxMonthlyRecordings.toLocaleString()} visits per month`,
        `${lightPlan.teamMemberLimit || 'Unlimited'} team member${pluralise(lightPlan.teamMemberLimit)}`,
        `${lightPlan.siteLimit || 'Unlimited'} website${pluralise(lightPlan.siteLimit)}`,
        `${lightPlan.dataStorageMonths} month data retention`,
      ],
      includesCapabilitiesFrom: null,
      capabilities: [],
      options: [],
    },
    {
      name: 'Plus',
      plan: plusPlan,
      show: plan.planId === Plans.Plus,
      current: plan.planId === Plans.Plus,
      usage: [
        `${plusPlan.maxMonthlyRecordings.toLocaleString()} visits per month`,
        `${plusPlan.teamMemberLimit || 'Unlimited'} team member${pluralise(plusPlan.teamMemberLimit)}`,
        `${plusPlan.siteLimit || 'Unlimited'} website${pluralise(plusPlan.siteLimit)}`,
        `${plusPlan.dataStorageMonths} month data retention`,
      ],
      includesCapabilitiesFrom: null,
      capabilities: [],
      options: [],
    },
    {
      name: 'Business',
      plan: businessPlan,
      show: true,
      current: plan.planId === Plans.Business,
      usage: [
        `${businessPlan.maxMonthlyRecordings.toLocaleString()} visits per month`,
        `${businessPlan.teamMemberLimit || 'Unlimited'} team member${pluralise(businessPlan.teamMemberLimit)}`,
        `${businessPlan.siteLimit || 'Unlimited'} website${pluralise(businessPlan.siteLimit)}`,
        `${businessPlan.dataStorageMonths} month data retention`,
      ],
      includesCapabilitiesFrom: 'Starter',
      capabilities: [
        'Page analytics',
        'Heatmaps (All)',
        'Event tracking',
        'Error tracking',
        'Custom surveys (up to 5)',
        'Segments (up to 25)',
        'Journey mapping',
      ],
      options: [],
    }
  ];
};
