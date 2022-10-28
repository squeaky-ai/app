import { Analytics, Errors } from 'types/graphql';


export interface Dashboard {
  pageViewCount: Analytics['pageViewCount'];
  pages: Analytics['pages'];
  bounces: Analytics['bounces'];
  bounceRate: Analytics['bounceRate'];
  exits: Analytics['exits'];
  visitorsCount: Analytics['visitorsCount'];
  recordingsCount: Analytics['recordingsCount'];
  errors: Errors['items'];
}
