export interface FeedbackCreateMutation {
  type: string;
  subject: string;
  message: string;
}

export interface Feedback {
  npsEnabled: boolean;
  npsAccentColor?: string;
  npsSchedule?: string;
  npsPhrase?: string;
  npsFollowUpEnabled?: boolean;
  npsContactConsentEnabled?: boolean;
  npsLayout: string;
  sentimentEnabled?: boolean;
  sentimentAccentColor?: string;
  sentimentExcludedPages: string[];
  sentimentLayout?: string;
}

export interface FeedbackUpdateMutationInput {
  siteId: string;
  npsEnabled?: boolean;
  npsAccentColor?: string;
  npsSchedule?: string;
  npsPhrase?: string;
  npsFollowUpEnabled?: boolean;
  npsContactConsentEnabled?: boolean;
  npsLayout?: string;
  sentimentEnabled?: boolean;
  sentimentAccentColor?: string;
  sentimentExcludedPages?: string[];
  sentimentLayout?: string;
}
