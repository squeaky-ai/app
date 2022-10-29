import { 
  Analytics,
  Errors,
  ErrorsCounts,
  RecordingsHighlights,
  VisitorsHighlights,
} from 'types/graphql';

export interface Dashboard {
  pageViews: Analytics['pageViews'];
  pages: Analytics['pages'];
  bounces: Analytics['bounces'];
  bounceRate: Analytics['bounceRate'];
  bounceCounts: Analytics['bounceCounts'];
  exits: Analytics['exits'];
  visitorsCount: Analytics['visitorsCount'];
  visitors: Analytics['visitors'];
  recordings: Analytics['recordings'];
  recordingsCount: Analytics['recordingsCount'];
  errors: Errors['items'];
  errorsCounts: ErrorsCounts;
  recordingsHighlights: RecordingsHighlights;
  visitorsHighlights: VisitorsHighlights;
}
