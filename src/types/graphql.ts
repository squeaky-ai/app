export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Represents non-fractional signed whole numeric values. Since the value may exceed the size of a 32-bit integer, it's encoded as a string. */
  BigInt: any;
  /** An ISO 8601-encoded date */
  ISO8601Date: any;
  /** An ISO 8601-encoded datetime */
  ISO8601DateTime: any;
};

export type Analytics = {
  __typename?: 'Analytics';
  browsers: Array<Maybe<AnalyticsBrowser>>;
  devices: Array<AnalyticsDevice>;
  dimensions: Array<Maybe<Scalars['Int']>>;
  languages: Array<Maybe<AnalyticsLanguage>>;
  pageViewCount: Scalars['Int'];
  pageViews: Array<Maybe<AnalyticsPageViews>>;
  pages: Array<Maybe<AnalyticsPage>>;
  pagesPerSession: AnalyticsPagesPerSession;
  recordingsCount: AnalyticsRecordingsCount;
  referrers: Array<Maybe<AnalyticsReferrer>>;
  sessionDurations: AnalyticsSessionDurations;
  sessionsPerVisitor: AnalyticsSessionsPerVisitor;
  visitors: Array<Maybe<AnalyticsVisitor>>;
  visitorsCount: AnalyticsVisitorsCount;
  visitsAt: Array<Maybe<Scalars['ISO8601DateTime']>>;
};

export type AnalyticsBrowser = {
  __typename?: 'AnalyticsBrowser';
  count: Scalars['Int'];
  name: Scalars['String'];
};

export type AnalyticsDevice = {
  __typename?: 'AnalyticsDevice';
  count: Scalars['Int'];
  type: Scalars['String'];
};

export type AnalyticsLanguage = {
  __typename?: 'AnalyticsLanguage';
  count: Scalars['Int'];
  name: Scalars['String'];
};

export type AnalyticsPage = {
  __typename?: 'AnalyticsPage';
  avg: Scalars['Int'];
  count: Scalars['Int'];
  path: Scalars['String'];
};

export type AnalyticsPageViews = {
  __typename?: 'AnalyticsPageViews';
  timestamp: Scalars['ISO8601DateTime'];
  total: Scalars['Int'];
  unique: Scalars['Int'];
};

export type AnalyticsPagesPerSession = {
  __typename?: 'AnalyticsPagesPerSession';
  average: Scalars['Float'];
  trend: Scalars['Float'];
};

export type AnalyticsRecordingsCount = {
  __typename?: 'AnalyticsRecordingsCount';
  new: Scalars['Int'];
  total: Scalars['Int'];
};

export type AnalyticsReferrer = {
  __typename?: 'AnalyticsReferrer';
  count: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
};

export type AnalyticsSessionDurations = {
  __typename?: 'AnalyticsSessionDurations';
  average: Scalars['BigInt'];
  trend: Scalars['BigInt'];
};

export type AnalyticsSessionsPerVisitor = {
  __typename?: 'AnalyticsSessionsPerVisitor';
  average: Scalars['Float'];
  trend: Scalars['Float'];
};

export type AnalyticsVisitor = {
  __typename?: 'AnalyticsVisitor';
  new?: Maybe<Scalars['Boolean']>;
  timestamp: Scalars['ISO8601DateTime'];
};

export type AnalyticsVisitorsCount = {
  __typename?: 'AnalyticsVisitorsCount';
  new: Scalars['Int'];
  total: Scalars['Int'];
};

export type Feedback = {
  __typename?: 'Feedback';
  id: Scalars['ID'];
  npsAccentColor?: Maybe<Scalars['String']>;
  npsContactConsentEnabled?: Maybe<Scalars['Boolean']>;
  npsEnabled: Scalars['Boolean'];
  npsFollowUpEnabled?: Maybe<Scalars['Boolean']>;
  npsLayout?: Maybe<Scalars['String']>;
  npsPhrase?: Maybe<Scalars['String']>;
  npsSchedule?: Maybe<Scalars['String']>;
  sentimentAccentColor?: Maybe<Scalars['String']>;
  sentimentEnabled?: Maybe<Scalars['Boolean']>;
  sentimentExcludedPages: Array<Maybe<Scalars['String']>>;
  sentimentLayout?: Maybe<Scalars['String']>;
};

export type FeedbackNpsGroups = {
  __typename?: 'FeedbackNpsGroups';
  detractors: Scalars['Int'];
  passives: Scalars['Int'];
  promoters: Scalars['Int'];
};

export type FeedbackNpsRatings = {
  __typename?: 'FeedbackNpsRatings';
  score: Scalars['Int'];
};

export type FeedbackNpsReplies = {
  __typename?: 'FeedbackNpsReplies';
  responses: Array<Maybe<FeedbackNpsReply>>;
  trend: Scalars['Int'];
};

export type FeedbackNpsReply = {
  __typename?: 'FeedbackNpsReply';
  score: Scalars['Int'];
  timestamp: Scalars['ISO8601DateTime'];
};

export type FeedbackNpsResponse = {
  __typename?: 'FeedbackNpsResponse';
  items: Array<Maybe<FeedbackNpsResponseItem>>;
  pagination: FeedbackNpsResponsePagination;
};

export type FeedbackNpsResponseItem = {
  __typename?: 'FeedbackNpsResponseItem';
  comment?: Maybe<Scalars['String']>;
  contact: Scalars['Boolean'];
  device: RecordingsDevice;
  email?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  recordingId: Scalars['String'];
  score: Scalars['Int'];
  sessionId: Scalars['String'];
  timestamp: Scalars['ISO8601DateTime'];
  visitor: Visitor;
};

export type FeedbackNpsResponsePagination = {
  __typename?: 'FeedbackNpsResponsePagination';
  pageSize: Scalars['Int'];
  sort: FeedbackNpsResponseSort;
  total: Scalars['Int'];
};

export enum FeedbackNpsResponseSort {
  /** Oldest response first */
  TimestampAsc = 'timestamp__asc',
  /** Most recent response first */
  TimestampDesc = 'timestamp__desc'
}

export type FeedbackNpsScore = {
  __typename?: 'FeedbackNpsScore';
  score: Scalars['Int'];
  timestamp: Scalars['ISO8601DateTime'];
};

export type FeedbackNpsScores = {
  __typename?: 'FeedbackNpsScores';
  responses: Array<Maybe<FeedbackNpsScore>>;
  score: Scalars['Int'];
  trend: Scalars['Int'];
};

export type FeedbackNpsStats = {
  __typename?: 'FeedbackNpsStats';
  displays: Scalars['Int'];
  ratings: Scalars['Int'];
};

export type FeedbackSentimentRating = {
  __typename?: 'FeedbackSentimentRating';
  score: Scalars['Int'];
  timestamp: Scalars['ISO8601DateTime'];
};

export type FeedbackSentimentRatings = {
  __typename?: 'FeedbackSentimentRatings';
  responses: Array<Maybe<FeedbackSentimentRating>>;
  score: Scalars['Float'];
  trend: Scalars['Float'];
};

export type FeedbackSentimentReplies = {
  __typename?: 'FeedbackSentimentReplies';
  responses: Array<Maybe<FeedbackSentimentReply>>;
  total: Scalars['Int'];
};

export type FeedbackSentimentReply = {
  __typename?: 'FeedbackSentimentReply';
  score: Scalars['Int'];
};

export type FeedbackSentimentResponse = {
  __typename?: 'FeedbackSentimentResponse';
  items: Array<Maybe<FeedbackSentimentResponseItem>>;
  pagination: FeedbackSentimentResponsePagination;
};

export type FeedbackSentimentResponseItem = {
  __typename?: 'FeedbackSentimentResponseItem';
  comment?: Maybe<Scalars['String']>;
  device: RecordingsDevice;
  id: Scalars['ID'];
  recordingId: Scalars['String'];
  score: Scalars['Int'];
  sessionId: Scalars['String'];
  timestamp: Scalars['ISO8601DateTime'];
  visitor: Visitor;
};

export type FeedbackSentimentResponsePagination = {
  __typename?: 'FeedbackSentimentResponsePagination';
  pageSize: Scalars['Int'];
  sort: FeedbackSentimentResponseSort;
  total: Scalars['Int'];
};

export enum FeedbackSentimentResponseSort {
  /** Oldest response first */
  TimestampAsc = 'timestamp__asc',
  /** Most recent response first */
  TimestampDesc = 'timestamp__desc'
}

/** Autogenerated input type of FeedbackUpdate */
export type FeedbackUpdateInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  npsAccentColor?: InputMaybe<Scalars['String']>;
  npsContactConsentEnabled?: InputMaybe<Scalars['Boolean']>;
  npsEnabled?: InputMaybe<Scalars['Boolean']>;
  npsFollowUpEnabled?: InputMaybe<Scalars['Boolean']>;
  npsLayout?: InputMaybe<Scalars['String']>;
  npsPhrase?: InputMaybe<Scalars['String']>;
  npsSchedule?: InputMaybe<Scalars['String']>;
  sentimentAccentColor?: InputMaybe<Scalars['String']>;
  sentimentEnabled?: InputMaybe<Scalars['Boolean']>;
  sentimentExcludedPages?: InputMaybe<Array<Scalars['String']>>;
  sentimentLayout?: InputMaybe<Scalars['String']>;
  siteId: Scalars['ID'];
};

export type FiltersDate = {
  betweenFromDate?: InputMaybe<Scalars['ISO8601Date']>;
  betweenToDate?: InputMaybe<Scalars['ISO8601Date']>;
  fromDate?: InputMaybe<Scalars['ISO8601Date']>;
  fromType?: InputMaybe<FiltersStart>;
  rangeType?: InputMaybe<FiltersRange>;
};

export type FiltersDuration = {
  betweenFromDuration?: InputMaybe<Scalars['Int']>;
  betweenToDuration?: InputMaybe<Scalars['Int']>;
  fromDuration?: InputMaybe<Scalars['Int']>;
  fromType?: InputMaybe<FiltersSize>;
  rangeType?: InputMaybe<FiltersRange>;
};

export enum FiltersRange {
  /** Show results that fit within this time */
  Between = 'Between',
  /** Show results are longer than this time */
  From = 'From',
  /** Show results that are greater than this time */
  GreaterThan = 'GreaterThan',
  /** Show results that are less than this time */
  LessThan = 'LessThan'
}

export type FiltersRecordings = {
  count?: InputMaybe<Scalars['Int']>;
  rangeType?: InputMaybe<FiltersRange>;
};

export enum FiltersSize {
  /** Show recordings that have a duration longer than */
  GreaterThan = 'GreaterThan',
  /** Show recordings that have a duration shorter than */
  LessThan = 'LessThan'
}

export enum FiltersStart {
  /** Show recordings that start after this time */
  After = 'After',
  /** Show recordings that start before this time */
  Before = 'Before'
}

export enum FiltersStatus {
  /** Show only new recordings */
  New = 'New',
  /** Show only viewed recordings */
  Viewed = 'Viewed'
}

export type FiltersViewport = {
  maxHeight?: InputMaybe<Scalars['Int']>;
  maxWidth?: InputMaybe<Scalars['Int']>;
  minHeight?: InputMaybe<Scalars['Int']>;
  minWidth?: InputMaybe<Scalars['Int']>;
};

export type Heatmaps = {
  __typename?: 'Heatmaps';
  desktopCount: Scalars['Int'];
  items: Array<Maybe<HeatmapsItem>>;
  mobileCount: Scalars['Int'];
  recordingId?: Maybe<Scalars['String']>;
  tabletCount: Scalars['Int'];
};

export enum HeatmapsDevice {
  /** Show desktop */
  Desktop = 'Desktop',
  /** Show mobile */
  Mobile = 'Mobile',
  /** Show tablet */
  Tablet = 'Tablet'
}

export type HeatmapsItem = {
  __typename?: 'HeatmapsItem';
  selector?: Maybe<Scalars['String']>;
  x?: Maybe<Scalars['Int']>;
  y?: Maybe<Scalars['Int']>;
};

export enum HeatmapsType {
  /** Show clicks */
  Click = 'Click',
  /** Show scrolls */
  Scroll = 'Scroll'
}

export type Mutation = {
  __typename?: 'Mutation';
  domainBlacklistCreate: Site;
  domainBlacklistDelete: Site;
  feedbackUpdate: Feedback;
  ipBlacklistCreate: Site;
  ipBlacklistDelete: Site;
  noteCreate: Note;
  noteDelete?: Maybe<Note>;
  noteUpdate?: Maybe<Note>;
  npsDelete?: Maybe<FeedbackNpsResponseItem>;
  recordingBookmarked: Recording;
  recordingDelete?: Maybe<Recording>;
  recordingViewed: Recording;
  recordingsDelete: Array<Recording>;
  recordingsViewed: Array<Recording>;
  sentimentDelete?: Maybe<FeedbackSentimentResponseItem>;
  siteCreate: Site;
  siteDelete?: Maybe<Site>;
  siteUpdate: Site;
  siteVerify: Site;
  tagCreate: Tag;
  tagDelete?: Maybe<Tag>;
  tagRemove?: Maybe<Tag>;
  tagUpdate?: Maybe<Tag>;
  tagsDelete?: Maybe<Array<Tag>>;
  teamDelete?: Maybe<Team>;
  teamInvite: Team;
  teamInviteAccept: Team;
  teamInviteCancel?: Maybe<Team>;
  teamInviteResend?: Maybe<Team>;
  teamLeave?: Maybe<Team>;
  teamTransfer: Site;
  teamUpdate: Team;
  userCommunication?: Maybe<User>;
  userDelete?: Maybe<User>;
  userPassword: User;
  userUpdate: User;
  visitorDelete?: Maybe<Visitor>;
  visitorStarred: Visitor;
};


export type MutationDomainBlacklistCreateArgs = {
  input: SitesDomainBlacklistCreateInput;
};


export type MutationDomainBlacklistDeleteArgs = {
  input: SitesDomainBlacklistDeleteInput;
};


export type MutationFeedbackUpdateArgs = {
  input: FeedbackUpdateInput;
};


export type MutationIpBlacklistCreateArgs = {
  input: SitesIpBlacklistCreateInput;
};


export type MutationIpBlacklistDeleteArgs = {
  input: SitesIpBlacklistDeleteInput;
};


export type MutationNoteCreateArgs = {
  input: NotesCreateInput;
};


export type MutationNoteDeleteArgs = {
  input: NotesDeleteInput;
};


export type MutationNoteUpdateArgs = {
  input: NotesUpdateInput;
};


export type MutationNpsDeleteArgs = {
  input: NpsDeleteInput;
};


export type MutationRecordingBookmarkedArgs = {
  input: RecordingsBookmarkedInput;
};


export type MutationRecordingDeleteArgs = {
  input: RecordingsDeleteInput;
};


export type MutationRecordingViewedArgs = {
  input: RecordingsViewedInput;
};


export type MutationRecordingsDeleteArgs = {
  input: RecordingsDeleteBulkInput;
};


export type MutationRecordingsViewedArgs = {
  input: RecordingsViewedBulkInput;
};


export type MutationSentimentDeleteArgs = {
  input: SentimentDeleteInput;
};


export type MutationSiteCreateArgs = {
  input: SitesCreateInput;
};


export type MutationSiteDeleteArgs = {
  input: SitesDeleteInput;
};


export type MutationSiteUpdateArgs = {
  input: SitesUpdateInput;
};


export type MutationSiteVerifyArgs = {
  input: SitesVerifyInput;
};


export type MutationTagCreateArgs = {
  input: TagsCreateInput;
};


export type MutationTagDeleteArgs = {
  input: TagsDeleteInput;
};


export type MutationTagRemoveArgs = {
  input: TagsRemoveInput;
};


export type MutationTagUpdateArgs = {
  input: TagsUpdateInput;
};


export type MutationTagsDeleteArgs = {
  input: TagsDeleteBulkInput;
};


export type MutationTeamDeleteArgs = {
  input: TeamDeleteInput;
};


export type MutationTeamInviteArgs = {
  input: TeamInviteInput;
};


export type MutationTeamInviteAcceptArgs = {
  input: TeamInviteAcceptInput;
};


export type MutationTeamInviteCancelArgs = {
  input: TeamInviteCancelInput;
};


export type MutationTeamInviteResendArgs = {
  input: TeamInviteResendInput;
};


export type MutationTeamLeaveArgs = {
  input: TeamLeaveInput;
};


export type MutationTeamTransferArgs = {
  input: TeamTransferInput;
};


export type MutationTeamUpdateArgs = {
  input: TeamUpdateInput;
};


export type MutationUserCommunicationArgs = {
  input: UsersCommunicationInput;
};


export type MutationUserDeleteArgs = {
  input: UsersDeleteInput;
};


export type MutationUserPasswordArgs = {
  input: UsersPasswordInput;
};


export type MutationUserUpdateArgs = {
  input: UsersUpdateInput;
};


export type MutationVisitorDeleteArgs = {
  input: VisitorsDeleteInput;
};


export type MutationVisitorStarredArgs = {
  input: VisitorsStarredInput;
};

export type Note = {
  __typename?: 'Note';
  body: Scalars['String'];
  createdAt: Scalars['ISO8601DateTime'];
  id: Scalars['ID'];
  recordingId: Scalars['Int'];
  sessionId?: Maybe<Scalars['String']>;
  timestamp?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['ISO8601DateTime']>;
  user?: Maybe<User>;
};

export type Notes = {
  __typename?: 'Notes';
  items: Array<Maybe<Note>>;
  pagination: NotesPagination;
};

/** Autogenerated input type of NotesCreate */
export type NotesCreateInput = {
  body: Scalars['String'];
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  recordingId: Scalars['ID'];
  siteId: Scalars['ID'];
  timestamp?: InputMaybe<Scalars['Int']>;
};

/** Autogenerated input type of NotesDelete */
export type NotesDeleteInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  noteId: Scalars['ID'];
  recordingId: Scalars['ID'];
  siteId: Scalars['ID'];
};

export type NotesPagination = {
  __typename?: 'NotesPagination';
  pageSize: Scalars['Int'];
  total: Scalars['Int'];
};

/** Autogenerated input type of NotesUpdate */
export type NotesUpdateInput = {
  body?: InputMaybe<Scalars['String']>;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  noteId: Scalars['ID'];
  recordingId: Scalars['ID'];
  siteId: Scalars['ID'];
  timestamp?: InputMaybe<Scalars['Int']>;
};

export type Nps = {
  __typename?: 'Nps';
  groups: FeedbackNpsGroups;
  ratings: Array<Maybe<FeedbackNpsRatings>>;
  replies: FeedbackNpsReplies;
  responses: FeedbackNpsResponse;
  scores: FeedbackNpsScores;
  stats: FeedbackNpsStats;
};


export type NpsResponsesArgs = {
  page?: InputMaybe<Scalars['Int']>;
  size?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<FeedbackNpsResponseSort>;
};

/** Autogenerated input type of NpsDelete */
export type NpsDeleteInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  npsId: Scalars['ID'];
  siteId: Scalars['ID'];
};

export type Page = {
  __typename?: 'Page';
  enteredAt: Scalars['ISO8601DateTime'];
  exitedAt: Scalars['ISO8601DateTime'];
  id: Scalars['ID'];
  url: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  site?: Maybe<Site>;
  sites: Array<Maybe<Site>>;
  user?: Maybe<User>;
  userExists: Scalars['Boolean'];
  userInvitation?: Maybe<UsersInvitation>;
};


export type QuerySiteArgs = {
  siteId: Scalars['ID'];
};


export type QueryUserExistsArgs = {
  email: Scalars['String'];
};


export type QueryUserInvitationArgs = {
  token: Scalars['String'];
};

export type Recording = {
  __typename?: 'Recording';
  bookmarked: Scalars['Boolean'];
  connectedAt?: Maybe<Scalars['ISO8601DateTime']>;
  device: RecordingsDevice;
  disconnectedAt?: Maybe<Scalars['ISO8601DateTime']>;
  duration: Scalars['BigInt'];
  events: RecordingsEvents;
  exitPage: Scalars['String'];
  id: Scalars['ID'];
  language: Scalars['String'];
  nextRecording?: Maybe<Recording>;
  notes: Array<Maybe<Note>>;
  nps?: Maybe<FeedbackNpsResponseItem>;
  pageCount: Scalars['Int'];
  pageViews: Array<Maybe<Scalars['String']>>;
  pages: Array<Maybe<Page>>;
  previousRecording?: Maybe<Recording>;
  referrer?: Maybe<Scalars['String']>;
  sentiment?: Maybe<FeedbackSentimentResponseItem>;
  sessionId: Scalars['String'];
  siteId: Scalars['ID'];
  startPage: Scalars['String'];
  tags: Array<Maybe<Tag>>;
  viewed: Scalars['Boolean'];
  visitor: Visitor;
};


export type RecordingEventsArgs = {
  page?: InputMaybe<Scalars['Int']>;
  size?: InputMaybe<Scalars['Int']>;
};

export type Recordings = {
  __typename?: 'Recordings';
  items: Array<Maybe<Recording>>;
  pagination: RecordingsPagination;
};

/** Autogenerated input type of RecordingsBookmarked */
export type RecordingsBookmarkedInput = {
  bookmarked: Scalars['Boolean'];
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  recordingId: Scalars['ID'];
  siteId: Scalars['ID'];
};

/** Autogenerated input type of RecordingsDeleteBulk */
export type RecordingsDeleteBulkInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  recordingIds: Array<Scalars['String']>;
  siteId: Scalars['ID'];
};

/** Autogenerated input type of RecordingsDelete */
export type RecordingsDeleteInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  recordingId: Scalars['ID'];
  siteId: Scalars['ID'];
};

export type RecordingsDevice = {
  __typename?: 'RecordingsDevice';
  browserDetails: Scalars['String'];
  browserName: Scalars['String'];
  deviceType: Scalars['String'];
  deviceX: Scalars['Int'];
  deviceY: Scalars['Int'];
  useragent: Scalars['String'];
  viewportX: Scalars['Int'];
  viewportY: Scalars['Int'];
};

export type RecordingsEventPagination = {
  __typename?: 'RecordingsEventPagination';
  currentPage: Scalars['Int'];
  itemCount: Scalars['Int'];
  perPage: Scalars['Int'];
  totalPages: Scalars['Int'];
};

export type RecordingsEvents = {
  __typename?: 'RecordingsEvents';
  items: Array<Maybe<Scalars['String']>>;
  pagination: RecordingsEventPagination;
};

export type RecordingsFilters = {
  bookmarked?: InputMaybe<Scalars['Boolean']>;
  browsers: Array<Scalars['String']>;
  devices: Array<Scalars['String']>;
  duration: FiltersDuration;
  exitUrl?: InputMaybe<Scalars['String']>;
  languages: Array<Scalars['String']>;
  referrers: Array<Scalars['String']>;
  starred?: InputMaybe<Scalars['Boolean']>;
  startUrl?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<FiltersStatus>;
  tags: Array<Scalars['Int']>;
  unvisitedPages: Array<Scalars['String']>;
  viewport: FiltersViewport;
  visitedPages: Array<Scalars['String']>;
};

export type RecordingsPagination = {
  __typename?: 'RecordingsPagination';
  pageSize: Scalars['Int'];
  sort: RecordingsSort;
  total: Scalars['Int'];
};

export enum RecordingsSort {
  /** Oldest recordings first */
  ConnectedAtAsc = 'connected_at__asc',
  /** Most recent recordings first */
  ConnectedAtDesc = 'connected_at__desc',
  /** Shortest recordings first */
  DurationAsc = 'duration__asc',
  /** Longest recordings first */
  DurationDesc = 'duration__desc',
  /** Least page views first */
  PageCountAsc = 'page_count__asc',
  /** Most page views first */
  PageCountDesc = 'page_count__desc'
}

/** Autogenerated input type of RecordingsViewedBulk */
export type RecordingsViewedBulkInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  recordingIds: Array<Scalars['String']>;
  siteId: Scalars['ID'];
  viewed: Scalars['Boolean'];
};

/** Autogenerated input type of RecordingsViewed */
export type RecordingsViewedInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  recordingId: Scalars['ID'];
  siteId: Scalars['ID'];
};

export type Sentiment = {
  __typename?: 'Sentiment';
  ratings: FeedbackSentimentRatings;
  replies: FeedbackSentimentReplies;
  responses: FeedbackSentimentResponse;
};


export type SentimentResponsesArgs = {
  page?: InputMaybe<Scalars['Int']>;
  size?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<FeedbackSentimentResponseSort>;
};

/** Autogenerated input type of SentimentDelete */
export type SentimentDeleteInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  sentimentId: Scalars['ID'];
  siteId: Scalars['ID'];
};

export type Site = {
  __typename?: 'Site';
  activeUserCount: Scalars['Int'];
  analytics: Analytics;
  browsers: Array<Maybe<Scalars['String']>>;
  createdAt: Scalars['ISO8601DateTime'];
  daysSinceLastRecording: Scalars['Int'];
  domainBlacklist: Array<Maybe<SitesDomainBlacklist>>;
  feedback?: Maybe<Feedback>;
  heatmaps: Heatmaps;
  id: Scalars['ID'];
  ipBlacklist: Array<Maybe<SitesIpBlacklist>>;
  languages: Array<Maybe<Scalars['String']>>;
  name: Scalars['String'];
  notes: Notes;
  nps: Nps;
  ownerName: Scalars['String'];
  pageUrls: Array<Maybe<Scalars['String']>>;
  plan: SitesPlan;
  recording?: Maybe<Recording>;
  recordingLatest?: Maybe<Recording>;
  recordings: Recordings;
  recordingsCount: Scalars['Int'];
  referrers: Array<Maybe<Scalars['String']>>;
  sentiment: Sentiment;
  tags: Array<Maybe<Tag>>;
  team: Array<Team>;
  updatedAt?: Maybe<Scalars['ISO8601DateTime']>;
  url: Scalars['String'];
  uuid: Scalars['String'];
  verifiedAt?: Maybe<Scalars['ISO8601DateTime']>;
  visitor?: Maybe<Visitor>;
  visitors: Visitors;
};


export type SiteAnalyticsArgs = {
  fromDate: Scalars['ISO8601Date'];
  toDate: Scalars['ISO8601Date'];
};


export type SiteHeatmapsArgs = {
  device?: HeatmapsDevice;
  fromDate: Scalars['ISO8601Date'];
  page: Scalars['String'];
  toDate: Scalars['ISO8601Date'];
  type?: HeatmapsType;
};


export type SiteNotesArgs = {
  page?: InputMaybe<Scalars['Int']>;
  size?: InputMaybe<Scalars['Int']>;
};


export type SiteNpsArgs = {
  fromDate: Scalars['ISO8601Date'];
  toDate: Scalars['ISO8601Date'];
};


export type SiteRecordingArgs = {
  recordingId: Scalars['ID'];
};


export type SiteRecordingsArgs = {
  filters?: InputMaybe<RecordingsFilters>;
  fromDate: Scalars['ISO8601Date'];
  page?: InputMaybe<Scalars['Int']>;
  size?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<RecordingsSort>;
  toDate: Scalars['ISO8601Date'];
};


export type SiteSentimentArgs = {
  fromDate: Scalars['ISO8601Date'];
  toDate: Scalars['ISO8601Date'];
};


export type SiteVisitorArgs = {
  visitorId: Scalars['ID'];
};


export type SiteVisitorsArgs = {
  filters?: InputMaybe<VisitorsFilters>;
  page?: InputMaybe<Scalars['Int']>;
  size?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<VisitorsSort>;
};

/** Autogenerated input type of SitesCreate */
export type SitesCreateInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  url: Scalars['String'];
};

/** Autogenerated input type of SitesDelete */
export type SitesDeleteInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  siteId: Scalars['ID'];
};

export type SitesDomainBlacklist = {
  __typename?: 'SitesDomainBlacklist';
  type: SitesDomainBlacklistTarget;
  value: Scalars['String'];
};

/** Autogenerated input type of SitesDomainBlacklistCreate */
export type SitesDomainBlacklistCreateInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  siteId: Scalars['ID'];
  type: Scalars['String'];
  value: Scalars['String'];
};

/** Autogenerated input type of SitesDomainBlacklistDelete */
export type SitesDomainBlacklistDeleteInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  siteId: Scalars['ID'];
  value: Scalars['String'];
};

export enum SitesDomainBlacklistTarget {
  /** Blacklist a whole domain */
  Domain = 'domain',
  /** Blacklist an individual email */
  Email = 'email'
}

export type SitesIpBlacklist = {
  __typename?: 'SitesIpBlacklist';
  name: Scalars['String'];
  value: Scalars['String'];
};

/** Autogenerated input type of SitesIpBlacklistCreate */
export type SitesIpBlacklistCreateInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  siteId: Scalars['ID'];
  value: Scalars['String'];
};

/** Autogenerated input type of SitesIpBlacklistDelete */
export type SitesIpBlacklistDeleteInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  siteId: Scalars['ID'];
  value: Scalars['String'];
};

export type SitesPlan = {
  __typename?: 'SitesPlan';
  exceeded: Scalars['Boolean'];
  name: Scalars['String'];
  recordingsLimit: Scalars['Int'];
  recordingsLocked: Scalars['Int'];
  type: Scalars['Int'];
  visitorsLocked: Scalars['Int'];
};

/** Autogenerated input type of SitesUpdate */
export type SitesUpdateInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  siteId: Scalars['ID'];
  url?: InputMaybe<Scalars['String']>;
};

/** Autogenerated input type of SitesVerify */
export type SitesVerifyInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  siteId: Scalars['ID'];
};

export type Tag = {
  __typename?: 'Tag';
  id: Scalars['ID'];
  name: Scalars['String'];
};

/** Autogenerated input type of TagsCreate */
export type TagsCreateInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  recordingId: Scalars['ID'];
  siteId: Scalars['ID'];
};

/** Autogenerated input type of TagsDeleteBulk */
export type TagsDeleteBulkInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  siteId: Scalars['ID'];
  tagIds: Array<Scalars['ID']>;
};

/** Autogenerated input type of TagsDelete */
export type TagsDeleteInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  siteId: Scalars['ID'];
  tagId: Scalars['ID'];
};

/** Autogenerated input type of TagsRemove */
export type TagsRemoveInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  recordingId: Scalars['ID'];
  siteId: Scalars['ID'];
  tagId: Scalars['ID'];
};

/** Autogenerated input type of TagsUpdate */
export type TagsUpdateInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  siteId: Scalars['ID'];
  tagId: Scalars['ID'];
};

export type Team = {
  __typename?: 'Team';
  createdAt: Scalars['ISO8601DateTime'];
  id: Scalars['ID'];
  role: Scalars['Int'];
  roleName: Scalars['String'];
  status: Scalars['Int'];
  updatedAt?: Maybe<Scalars['ISO8601DateTime']>;
  user: User;
};

/** Autogenerated input type of TeamDelete */
export type TeamDeleteInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  siteId: Scalars['ID'];
  teamId: Scalars['ID'];
};

/** Autogenerated input type of TeamInviteAccept */
export type TeamInviteAcceptInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  token: Scalars['String'];
};

/** Autogenerated input type of TeamInviteCancel */
export type TeamInviteCancelInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  siteId: Scalars['ID'];
  teamId: Scalars['ID'];
};

/** Autogenerated input type of TeamInvite */
export type TeamInviteInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
  role: Scalars['Int'];
  siteId: Scalars['ID'];
};

/** Autogenerated input type of TeamInviteResend */
export type TeamInviteResendInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  siteId: Scalars['ID'];
  teamId: Scalars['ID'];
};

/** Autogenerated input type of TeamLeave */
export type TeamLeaveInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  siteId: Scalars['ID'];
};

/** Autogenerated input type of TeamTransfer */
export type TeamTransferInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  siteId: Scalars['ID'];
  teamId: Scalars['ID'];
};

/** Autogenerated input type of TeamUpdate */
export type TeamUpdateInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  role: Scalars['Int'];
  siteId: Scalars['ID'];
  teamId: Scalars['ID'];
};

export type User = {
  __typename?: 'User';
  communication?: Maybe<UsersCommunication>;
  createdAt: Scalars['ISO8601DateTime'];
  email: Scalars['String'];
  firstName?: Maybe<Scalars['String']>;
  fullName?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  lastName?: Maybe<Scalars['String']>;
  superuser: Scalars['Boolean'];
  updatedAt?: Maybe<Scalars['ISO8601DateTime']>;
};

export type UsersCommunication = {
  __typename?: 'UsersCommunication';
  id: Scalars['ID'];
  knowledgeSharingEmail: Scalars['Boolean'];
  marketingAndSpecialOffersEmail: Scalars['Boolean'];
  monthlyReviewEmail: Scalars['Boolean'];
  onboardingEmail: Scalars['Boolean'];
  productUpdatesEmail: Scalars['Boolean'];
  weeklyReviewEmail: Scalars['Boolean'];
};

/** Autogenerated input type of UsersCommunication */
export type UsersCommunicationInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  knowledgeSharingEmail?: InputMaybe<Scalars['Boolean']>;
  marketingAndSpecialOffersEmail?: InputMaybe<Scalars['Boolean']>;
  monthlyReviewEmail?: InputMaybe<Scalars['Boolean']>;
  onboardingEmail?: InputMaybe<Scalars['Boolean']>;
  productUpdatesEmail?: InputMaybe<Scalars['Boolean']>;
  weeklyReviewEmail?: InputMaybe<Scalars['Boolean']>;
};

/** Autogenerated input type of UsersDelete */
export type UsersDeleteInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
};

export type UsersInvitation = {
  __typename?: 'UsersInvitation';
  email?: Maybe<Scalars['String']>;
  hasPending: Scalars['Boolean'];
};

/** Autogenerated input type of UsersPassword */
export type UsersPasswordInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  currentPassword: Scalars['String'];
  password: Scalars['String'];
  passwordConfirmation: Scalars['String'];
};

/** Autogenerated input type of UsersUpdate */
export type UsersUpdateInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
};

export type Visitor = {
  __typename?: 'Visitor';
  averageSessionDuration: Scalars['Int'];
  devices: Array<RecordingsDevice>;
  firstViewedAt?: Maybe<Scalars['ISO8601DateTime']>;
  id: Scalars['ID'];
  language?: Maybe<Scalars['String']>;
  lastActivityAt?: Maybe<Scalars['ISO8601DateTime']>;
  linkedData?: Maybe<Scalars['String']>;
  pageViewsCount?: Maybe<VisitorsPagesCount>;
  pages: VisitorsPages;
  pagesPerSession: Scalars['Float'];
  recordingCount?: Maybe<VisitorsRecordingCount>;
  recordings: Recordings;
  starred?: Maybe<Scalars['Boolean']>;
  viewed?: Maybe<Scalars['Boolean']>;
  visitorId: Scalars['String'];
};


export type VisitorPagesArgs = {
  page?: InputMaybe<Scalars['Int']>;
  size?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<VisitorsPagesSort>;
};


export type VisitorRecordingsArgs = {
  page?: InputMaybe<Scalars['Int']>;
  size?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<RecordingsSort>;
};

export type Visitors = {
  __typename?: 'Visitors';
  items: Array<Maybe<Visitor>>;
  pagination: VisitorsPagination;
};

/** Autogenerated input type of VisitorsDelete */
export type VisitorsDeleteInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  siteId: Scalars['ID'];
  visitorId: Scalars['ID'];
};

export type VisitorsFilters = {
  firstVisited: FiltersDate;
  languages: Array<Scalars['String']>;
  lastActivity: FiltersDate;
  recordings: FiltersRecordings;
  status?: InputMaybe<FiltersStatus>;
};

export type VisitorsPage = {
  __typename?: 'VisitorsPage';
  averageTimeOnPage: Scalars['Int'];
  pageView: Scalars['String'];
  pageViewCount: Scalars['Int'];
};

export type VisitorsPagePagination = {
  __typename?: 'VisitorsPagePagination';
  pageSize: Scalars['Int'];
  sort: VisitorsPagesSort;
  total: Scalars['Int'];
};

export type VisitorsPages = {
  __typename?: 'VisitorsPages';
  items: Array<Maybe<VisitorsPage>>;
  pagination: VisitorsPagePagination;
};

export type VisitorsPagesCount = {
  __typename?: 'VisitorsPagesCount';
  total: Scalars['Int'];
  unique: Scalars['Int'];
};

export enum VisitorsPagesSort {
  /** Least amount of views first */
  ViewsCountAsc = 'views_count__asc',
  /** Most amount of views first */
  ViewsCountDesc = 'views_count__desc'
}

export type VisitorsPagination = {
  __typename?: 'VisitorsPagination';
  pageSize: Scalars['Int'];
  sort: VisitorsSort;
  total: Scalars['Int'];
};

export type VisitorsRecordingCount = {
  __typename?: 'VisitorsRecordingCount';
  new: Scalars['Int'];
  total: Scalars['Int'];
};

export enum VisitorsSort {
  /** Least recently viewed */
  FirstViewedAtAsc = 'first_viewed_at__asc',
  /** Most recently viewed */
  FirstViewedAtDesc = 'first_viewed_at__desc',
  /** Least recently active */
  LastActivityAtAsc = 'last_activity_at__asc',
  /** Most recently active */
  LastActivityAtDesc = 'last_activity_at__desc',
  /** Least amount of recordings */
  RecordingsAsc = 'recordings__asc',
  /** Most amount of recordings */
  RecordingsDesc = 'recordings__desc'
}

/** Autogenerated input type of VisitorsStarred */
export type VisitorsStarredInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  siteId: Scalars['ID'];
  starred: Scalars['Boolean'];
  visitorId: Scalars['ID'];
};
