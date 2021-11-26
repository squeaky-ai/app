/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetSiteLanguages
// ====================================================

export interface GetSiteLanguages_site {
  __typename: "Site";
  id: string;
  languages: (string | null)[];
}

export interface GetSiteLanguages {
  site: GetSiteLanguages_site | null;
}

export interface GetSiteLanguagesVariables {
  siteId: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetSiteBrowsers
// ====================================================

export interface GetSiteBrowsers_site {
  __typename: "Site";
  id: string;
  browsers: (string | null)[];
}

export interface GetSiteBrowsers {
  site: GetSiteBrowsers_site | null;
}

export interface GetSiteBrowsersVariables {
  siteId: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetAnalytics
// ====================================================

export interface GetAnalytics_site_analytics_sessionDurations {
  __typename: "AnalyticsSessionDurations";
  average: any;
  trend: any;
}

export interface GetAnalytics_site_analytics_pagesPerSession {
  __typename: "AnalyticsPagesPerSession";
  average: number;
  trend: number;
}

export interface GetAnalytics_site_analytics_sessionsPerVisitor {
  __typename: "AnalyticsSessionsPerVisitor";
  average: number;
  trend: number;
}

export interface GetAnalytics_site_analytics_visitorsCount {
  __typename: "AnalyticsVisitorsCount";
  total: number;
  new: number;
}

export interface GetAnalytics_site_analytics_visitors {
  __typename: "AnalyticsVisitor";
  new: boolean | null;
  timestamp: any;
}

export interface GetAnalytics_site_analytics_pageViews {
  __typename: "AnalyticsPageViews";
  total: number;
  unique: number;
  timestamp: any;
}

export interface GetAnalytics_site_analytics_pages {
  __typename: "AnalyticsPage";
  path: string;
  count: number;
  avg: number;
}

export interface GetAnalytics_site_analytics_browsers {
  __typename: "AnalyticsBrowser";
  name: string;
  count: number;
}

export interface GetAnalytics_site_analytics_languages {
  __typename: "AnalyticsLanguage";
  name: string;
  count: number;
}

export interface GetAnalytics_site_analytics_devices {
  __typename: "AnalyticsDevice";
  type: string;
  count: number;
}

export interface GetAnalytics_site_analytics_referrers {
  __typename: "AnalyticsReferrer";
  name: string | null;
  count: number;
}

export interface GetAnalytics_site_analytics {
  __typename: "Analytics";
  pageViewCount: number;
  dimensions: (number | null)[];
  sessionDurations: GetAnalytics_site_analytics_sessionDurations;
  pagesPerSession: GetAnalytics_site_analytics_pagesPerSession;
  sessionsPerVisitor: GetAnalytics_site_analytics_sessionsPerVisitor;
  visitorsCount: GetAnalytics_site_analytics_visitorsCount;
  visitors: (GetAnalytics_site_analytics_visitors | null)[];
  pageViews: (GetAnalytics_site_analytics_pageViews | null)[];
  pages: (GetAnalytics_site_analytics_pages | null)[];
  browsers: (GetAnalytics_site_analytics_browsers | null)[];
  languages: (GetAnalytics_site_analytics_languages | null)[];
  devices: GetAnalytics_site_analytics_devices[];
  referrers: (GetAnalytics_site_analytics_referrers | null)[];
}

export interface GetAnalytics_site {
  __typename: "Site";
  id: string;
  analytics: GetAnalytics_site_analytics;
}

export interface GetAnalytics {
  site: GetAnalytics_site | null;
}

export interface GetAnalyticsVariables {
  siteId: string;
  fromDate: string;
  toDate: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: FeedbackCreate
// ====================================================

export interface FeedbackCreate_feedbackCreate {
  __typename: "FiltersSuccess";
  message: string;
}

export interface FeedbackCreate {
  feedbackCreate: FeedbackCreate_feedbackCreate;
}

export interface FeedbackCreateVariables {
  input: FeedbackCreateInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: FeedbackUpdate
// ====================================================

export interface FeedbackUpdate_feedbackUpdate_feedback {
  __typename: "Feedback";
  npsEnabled: boolean;
  npsAccentColor: string | null;
  npsPhrase: string | null;
  npsFollowUpEnabled: boolean | null;
  npsContactConsentEnabled: boolean | null;
  npsLayout: string | null;
  sentimentEnabled: boolean | null;
  sentimentAccentColor: string | null;
  sentimentExcludedPages: (string | null)[];
  sentimentLayout: string | null;
}

export interface FeedbackUpdate_feedbackUpdate {
  __typename: "Site";
  id: string;
  feedback: FeedbackUpdate_feedbackUpdate_feedback | null;
}

export interface FeedbackUpdate {
  feedbackUpdate: FeedbackUpdate_feedbackUpdate;
}

export interface FeedbackUpdateVariables {
  input: FeedbackUpdateInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetFeedback
// ====================================================

export interface GetFeedback_site_feedback {
  __typename: "Feedback";
  npsEnabled: boolean;
  npsAccentColor: string | null;
  npsSchedule: string | null;
  npsPhrase: string | null;
  npsFollowUpEnabled: boolean | null;
  npsContactConsentEnabled: boolean | null;
  npsLayout: string | null;
  sentimentEnabled: boolean | null;
  sentimentAccentColor: string | null;
  sentimentExcludedPages: (string | null)[];
  sentimentLayout: string | null;
}

export interface GetFeedback_site {
  __typename: "Site";
  id: string;
  feedback: GetFeedback_site_feedback | null;
}

export interface GetFeedback {
  site: GetFeedback_site | null;
}

export interface GetFeedbackVariables {
  siteId: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetHeatmaps
// ====================================================

export interface GetHeatmaps_site_heatmaps_items {
  __typename: "HeatmapsItem";
  x: number | null;
  y: number | null;
  selector: string | null;
}

export interface GetHeatmaps_site_heatmaps {
  __typename: "Heatmaps";
  desktopCount: number;
  tabletCount: number;
  mobileCount: number;
  recordingId: string | null;
  items: (GetHeatmaps_site_heatmaps_items | null)[];
}

export interface GetHeatmaps_site {
  __typename: "Site";
  id: string;
  heatmaps: GetHeatmaps_site_heatmaps;
}

export interface GetHeatmaps {
  site: GetHeatmaps_site | null;
}

export interface GetHeatmapsVariables {
  siteId: string;
  page: string;
  fromDate: string;
  toDate: string;
  device: HeatmapsDevice;
  type: HeatmapsType;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetHeatmapsRecording
// ====================================================

export interface GetHeatmapsRecording_site_recording_device {
  __typename: "RecordingsDevice";
  viewportX: number;
  viewportY: number;
}

export interface GetHeatmapsRecording_site_recording_visitor {
  __typename: "Visitor";
  id: string;
  visitorId: string;
  starred: boolean;
  attributes: string | null;
}

export interface GetHeatmapsRecording_site_recording_pages {
  __typename: "Page";
  url: string;
  enteredAt: any;
  exitedAt: any;
}

export interface GetHeatmapsRecording_site_recording_events_pagination {
  __typename: "RecordingsEventPagination";
  perPage: number;
  itemCount: number;
  currentPage: number;
  totalPages: number;
}

export interface GetHeatmapsRecording_site_recording_events {
  __typename: "RecordingsEvents";
  items: (string | null)[];
  pagination: GetHeatmapsRecording_site_recording_events_pagination;
}

export interface GetHeatmapsRecording_site_recording {
  __typename: "Recording";
  id: string;
  device: GetHeatmapsRecording_site_recording_device;
  connectedAt: string | null;
  disconnectedAt: string | null;
  visitor: GetHeatmapsRecording_site_recording_visitor;
  pages: (GetHeatmapsRecording_site_recording_pages | null)[];
  events: GetHeatmapsRecording_site_recording_events;
}

export interface GetHeatmapsRecording_site {
  __typename: "Site";
  id: string;
  recording: GetHeatmapsRecording_site_recording | null;
}

export interface GetHeatmapsRecording {
  site: GetHeatmapsRecording_site | null;
}

export interface GetHeatmapsRecordingVariables {
  siteId: string;
  recordingId: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetNPS
// ====================================================

export interface GetNPS_site_nps_responses_items_visitor {
  __typename: "Visitor";
  id: string;
  visitorId: string;
}

export interface GetNPS_site_nps_responses_items {
  __typename: "FeedbackNpsResponseItem";
  id: string;
  score: number;
  comment: string | null;
  contact: boolean;
  visitor: GetNPS_site_nps_responses_items_visitor;
  sessionId: string;
  recordingId: string;
  timestamp: string;
}

export interface GetNPS_site_nps_responses_pagination {
  __typename: "FeedbackNpsResponsePagination";
  pageSize: number;
  total: number;
  sort: FeedbackNpsResponseSort;
}

export interface GetNPS_site_nps_responses {
  __typename: "FeedbackNpsResponse";
  items: (GetNPS_site_nps_responses_items | null)[];
  pagination: GetNPS_site_nps_responses_pagination;
}

export interface GetNPS_site_nps_groups {
  __typename: "FeedbackNpsGroups";
  promoters: number;
  passives: number;
  detractors: number;
}

export interface GetNPS_site_nps_stats {
  __typename: "FeedbackNpsStats";
  displays: number;
  ratings: number;
}

export interface GetNPS_site_nps_ratings {
  __typename: "FeedbackNpsRatings";
  score: number;
}

export interface GetNPS_site_nps_replies_responses {
  __typename: "FeedbackNpsReply";
  timestamp: string;
}

export interface GetNPS_site_nps_replies {
  __typename: "FeedbackNpsReplies";
  trend: number;
  responses: (GetNPS_site_nps_replies_responses | null)[];
}

export interface GetNPS_site_nps_scores_responses {
  __typename: "FeedbackNpsScore";
  score: number;
  timestamp: string;
}

export interface GetNPS_site_nps_scores {
  __typename: "FeedbackNpsScores";
  trend: number;
  score: number;
  responses: (GetNPS_site_nps_scores_responses | null)[];
}

export interface GetNPS_site_nps {
  __typename: "Nps";
  responses: GetNPS_site_nps_responses;
  groups: GetNPS_site_nps_groups;
  stats: GetNPS_site_nps_stats;
  ratings: (GetNPS_site_nps_ratings | null)[];
  replies: GetNPS_site_nps_replies;
  scores: GetNPS_site_nps_scores;
}

export interface GetNPS_site {
  __typename: "Site";
  id: string;
  nps: GetNPS_site_nps;
}

export interface GetNPS {
  site: GetNPS_site | null;
}

export interface GetNPSVariables {
  siteId: string;
  page: number;
  size: number;
  sort: FeedbackNpsResponseSort;
  fromDate: string;
  toDate: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetOverview
// ====================================================

export interface GetOverview_site_analytics_visitorsCount {
  __typename: "AnalyticsVisitorsCount";
  total: number;
  new: number;
}

export interface GetOverview_site_analytics_recordingsCount {
  __typename: "AnalyticsRecordingsCount";
  total: number;
  new: number;
}

export interface GetOverview_site_analytics {
  __typename: "Analytics";
  pageViewCount: number;
  visitorsCount: GetOverview_site_analytics_visitorsCount;
  recordingsCount: GetOverview_site_analytics_recordingsCount;
}

export interface GetOverview_site_notes_items_user {
  __typename: "User";
  fullName: string | null;
}

export interface GetOverview_site_notes_items {
  __typename: "Note";
  id: string;
  timestamp: number | null;
  body: string;
  recordingId: number;
  sessionId: string | null;
  user: GetOverview_site_notes_items_user | null;
}

export interface GetOverview_site_notes {
  __typename: "Notes";
  items: (GetOverview_site_notes_items | null)[];
}

export interface GetOverview_site_recordingLatest_device {
  __typename: "RecordingsDevice";
  viewportX: number;
  viewportY: number;
  deviceX: number;
  deviceY: number;
}

export interface GetOverview_site_recordingLatest_visitor {
  __typename: "Visitor";
  id: string;
  visitorId: string;
  starred: boolean;
}

export interface GetOverview_site_recordingLatest_events {
  __typename: "RecordingsEvents";
  items: (string | null)[];
}

export interface GetOverview_site_recordingLatest {
  __typename: "Recording";
  id: string;
  duration: any;
  startPage: string;
  exitPage: string;
  pageCount: number;
  pageViews: (string | null)[];
  connectedAt: string | null;
  device: GetOverview_site_recordingLatest_device;
  visitor: GetOverview_site_recordingLatest_visitor;
  events: GetOverview_site_recordingLatest_events;
}

export interface GetOverview_site {
  __typename: "Site";
  id: string;
  analytics: GetOverview_site_analytics;
  notes: GetOverview_site_notes;
  recordingLatest: GetOverview_site_recordingLatest | null;
}

export interface GetOverview {
  site: GetOverview_site | null;
}

export interface GetOverviewVariables {
  siteId: string;
  fromDate: string;
  toDate: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: TagCreate
// ====================================================

export interface TagCreate_tagCreate_tags {
  __typename: "Tag";
  id: string;
  name: string;
}

export interface TagCreate_tagCreate_recording_tags {
  __typename: "Tag";
  id: string;
  name: string;
}

export interface TagCreate_tagCreate_recording {
  __typename: "Recording";
  tags: (TagCreate_tagCreate_recording_tags | null)[];
}

export interface TagCreate_tagCreate {
  __typename: "Site";
  id: string;
  tags: (TagCreate_tagCreate_tags | null)[];
  recording: TagCreate_tagCreate_recording | null;
}

export interface TagCreate {
  tagCreate: TagCreate_tagCreate;
}

export interface TagCreateVariables {
  siteId: string;
  recordingId: string;
  name: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: TagRemove
// ====================================================

export interface TagRemove_tagRemove_recording_tags {
  __typename: "Tag";
  id: string;
  name: string;
}

export interface TagRemove_tagRemove_recording {
  __typename: "Recording";
  tags: (TagRemove_tagRemove_recording_tags | null)[];
}

export interface TagRemove_tagRemove {
  __typename: "Site";
  id: string;
  recording: TagRemove_tagRemove_recording | null;
}

export interface TagRemove {
  tagRemove: TagRemove_tagRemove;
}

export interface TagRemoveVariables {
  siteId: string;
  recordingId: string;
  tagId: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: TagDelete
// ====================================================

export interface TagDelete_tagDelete_tags {
  __typename: "Tag";
  id: string;
  name: string;
}

export interface TagDelete_tagDelete {
  __typename: "Site";
  id: string;
  tags: (TagDelete_tagDelete_tags | null)[];
}

export interface TagDelete {
  tagDelete: TagDelete_tagDelete;
}

export interface TagDeleteVariables {
  siteId: string;
  tagId: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: TagsDelete
// ====================================================

export interface TagsDelete_tagsDelete_tags {
  __typename: "Tag";
  id: string;
  name: string;
}

export interface TagsDelete_tagsDelete {
  __typename: "Site";
  id: string;
  tags: (TagsDelete_tagsDelete_tags | null)[];
}

export interface TagsDelete {
  tagsDelete: TagsDelete_tagsDelete;
}

export interface TagsDeleteVariables {
  siteId: string;
  tagIds: string[];
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: TagUpdate
// ====================================================

export interface TagUpdate_tagUpdate_tags {
  __typename: "Tag";
  id: string;
  name: string;
}

export interface TagUpdate_tagUpdate {
  __typename: "Site";
  id: string;
  tags: (TagUpdate_tagUpdate_tags | null)[];
}

export interface TagUpdate {
  tagUpdate: TagUpdate_tagUpdate;
}

export interface TagUpdateVariables {
  siteId: string;
  tagId: string;
  name: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: NoteCreate
// ====================================================

export interface NoteCreate_noteCreate_recording_notes_user {
  __typename: "User";
  fullName: string | null;
}

export interface NoteCreate_noteCreate_recording_notes {
  __typename: "Note";
  id: string;
  body: string;
  timestamp: number | null;
  user: NoteCreate_noteCreate_recording_notes_user | null;
}

export interface NoteCreate_noteCreate_recording {
  __typename: "Recording";
  notes: (NoteCreate_noteCreate_recording_notes | null)[];
}

export interface NoteCreate_noteCreate {
  __typename: "Site";
  id: string;
  recording: NoteCreate_noteCreate_recording | null;
}

export interface NoteCreate {
  noteCreate: NoteCreate_noteCreate;
}

export interface NoteCreateVariables {
  siteId: string;
  recordingId: string;
  body: string;
  timestamp?: number | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: NoteDelete
// ====================================================

export interface NoteDelete_noteDelete_recording_notes_user {
  __typename: "User";
  fullName: string | null;
}

export interface NoteDelete_noteDelete_recording_notes {
  __typename: "Note";
  id: string;
  body: string;
  timestamp: number | null;
  user: NoteDelete_noteDelete_recording_notes_user | null;
}

export interface NoteDelete_noteDelete_recording {
  __typename: "Recording";
  notes: (NoteDelete_noteDelete_recording_notes | null)[];
}

export interface NoteDelete_noteDelete {
  __typename: "Site";
  id: string;
  recording: NoteDelete_noteDelete_recording | null;
}

export interface NoteDelete {
  noteDelete: NoteDelete_noteDelete;
}

export interface NoteDeleteVariables {
  siteId: string;
  recordingId: string;
  noteId: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: NoteUpdate
// ====================================================

export interface NoteUpdate_noteUpdate_recording_notes_user {
  __typename: "User";
  fullName: string | null;
}

export interface NoteUpdate_noteUpdate_recording_notes {
  __typename: "Note";
  id: string;
  body: string;
  timestamp: number | null;
  user: NoteUpdate_noteUpdate_recording_notes_user | null;
}

export interface NoteUpdate_noteUpdate_recording {
  __typename: "Recording";
  notes: (NoteUpdate_noteUpdate_recording_notes | null)[];
}

export interface NoteUpdate_noteUpdate {
  __typename: "Site";
  id: string;
  recording: NoteUpdate_noteUpdate_recording | null;
}

export interface NoteUpdate {
  noteUpdate: NoteUpdate_noteUpdate;
}

export interface NoteUpdateVariables {
  siteId: string;
  recordingId: string;
  noteId: string;
  body?: string | null;
  timestamp?: number | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteRecording
// ====================================================

export interface DeleteRecording_recordingDelete_recordings_items {
  __typename: "Recording";
  id: string;
}

export interface DeleteRecording_recordingDelete_recordings_pagination {
  __typename: "RecordingsPagination";
  pageSize: number;
  total: number;
  sort: RecordingsSort;
}

export interface DeleteRecording_recordingDelete_recordings {
  __typename: "Recordings";
  items: (DeleteRecording_recordingDelete_recordings_items | null)[];
  pagination: DeleteRecording_recordingDelete_recordings_pagination;
}

export interface DeleteRecording_recordingDelete {
  __typename: "Site";
  id: string;
  recordings: DeleteRecording_recordingDelete_recordings;
}

export interface DeleteRecording {
  recordingDelete: DeleteRecording_recordingDelete;
}

export interface DeleteRecordingVariables {
  input: RecordingsDeleteInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ViewedRecording
// ====================================================

export interface ViewedRecording_recordingViewed_recordings_items {
  __typename: "Recording";
  id: string;
  viewed: boolean;
}

export interface ViewedRecording_recordingViewed_recordings {
  __typename: "Recordings";
  items: (ViewedRecording_recordingViewed_recordings_items | null)[];
}

export interface ViewedRecording_recordingViewed {
  __typename: "Site";
  id: string;
  recordings: ViewedRecording_recordingViewed_recordings;
}

export interface ViewedRecording {
  recordingViewed: ViewedRecording_recordingViewed;
}

export interface ViewedRecordingVariables {
  input: RecordingsViewedInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: BookmarkRecording
// ====================================================

export interface BookmarkRecording_recordingBookmarked_recordings_items {
  __typename: "Recording";
  id: string;
  bookmarked: boolean;
}

export interface BookmarkRecording_recordingBookmarked_recordings {
  __typename: "Recordings";
  items: (BookmarkRecording_recordingBookmarked_recordings_items | null)[];
}

export interface BookmarkRecording_recordingBookmarked {
  __typename: "Site";
  id: string;
  recordings: BookmarkRecording_recordingBookmarked_recordings;
}

export interface BookmarkRecording {
  recordingBookmarked: BookmarkRecording_recordingBookmarked;
}

export interface BookmarkRecordingVariables {
  input: RecordingsBookmarkedInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeletedRecordings
// ====================================================

export interface DeletedRecordings_recordingsDelete_recordings_items {
  __typename: "Recording";
  id: string;
}

export interface DeletedRecordings_recordingsDelete_recordings {
  __typename: "Recordings";
  items: (DeletedRecordings_recordingsDelete_recordings_items | null)[];
}

export interface DeletedRecordings_recordingsDelete {
  __typename: "Site";
  id: string;
  recordingsCount: number;
  recordings: DeletedRecordings_recordingsDelete_recordings;
}

export interface DeletedRecordings {
  recordingsDelete: DeletedRecordings_recordingsDelete;
}

export interface DeletedRecordingsVariables {
  input: RecordingsDeleteBulkInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ViewedRecordings
// ====================================================

export interface ViewedRecordings_recordingsViewed_recordings_items {
  __typename: "Recording";
  id: string;
  viewed: boolean;
}

export interface ViewedRecordings_recordingsViewed_recordings {
  __typename: "Recordings";
  items: (ViewedRecordings_recordingsViewed_recordings_items | null)[];
}

export interface ViewedRecordings_recordingsViewed {
  __typename: "Site";
  id: string;
  recordings: ViewedRecordings_recordingsViewed_recordings;
}

export interface ViewedRecordings {
  recordingsViewed: ViewedRecordings_recordingsViewed;
}

export interface ViewedRecordingsVariables {
  input: RecordingsViewedBulkInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetRecordings
// ====================================================

export interface GetRecordings_site_recordings_items_device {
  __typename: "RecordingsDevice";
  deviceType: string;
  viewportX: number;
  viewportY: number;
  deviceX: number;
  deviceY: number;
  browserName: string;
  browserDetails: string;
  useragent: string;
}

export interface GetRecordings_site_recordings_items_visitor {
  __typename: "Visitor";
  id: string;
  visitorId: string;
}

export interface GetRecordings_site_recordings_items {
  __typename: "Recording";
  id: string;
  language: string;
  duration: any;
  viewed: boolean;
  bookmarked: boolean;
  startPage: string;
  exitPage: string;
  pageViews: (string | null)[];
  pageCount: number;
  device: GetRecordings_site_recordings_items_device;
  sessionId: string;
  connectedAt: string | null;
  disconnectedAt: string | null;
  visitor: GetRecordings_site_recordings_items_visitor;
}

export interface GetRecordings_site_recordings_pagination {
  __typename: "RecordingsPagination";
  pageSize: number;
  total: number;
  sort: RecordingsSort;
}

export interface GetRecordings_site_recordings {
  __typename: "Recordings";
  items: (GetRecordings_site_recordings_items | null)[];
  pagination: GetRecordings_site_recordings_pagination;
}

export interface GetRecordings_site {
  __typename: "Site";
  id: string;
  name: string;
  recordings: GetRecordings_site_recordings;
}

export interface GetRecordings {
  site: GetRecordings_site | null;
}

export interface GetRecordingsVariables {
  siteId: string;
  page?: number | null;
  size?: number | null;
  query?: string | null;
  sort?: RecordingsSort | null;
  filters?: RecordingsFilters | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetRecording
// ====================================================

export interface GetRecording_site_recording_device {
  __typename: "RecordingsDevice";
  deviceType: string;
  viewportX: number;
  viewportY: number;
  deviceX: number;
  deviceY: number;
  browserName: string;
  browserDetails: string;
  useragent: string;
}

export interface GetRecording_site_recording_visitor {
  __typename: "Visitor";
  id: string;
  visitorId: string;
  starred: boolean;
  attributes: string | null;
}

export interface GetRecording_site_recording_tags {
  __typename: "Tag";
  id: string;
  name: string;
}

export interface GetRecording_site_recording_notes_user {
  __typename: "User";
  fullName: string | null;
}

export interface GetRecording_site_recording_notes {
  __typename: "Note";
  id: string;
  timestamp: number | null;
  body: string;
  user: GetRecording_site_recording_notes_user | null;
}

export interface GetRecording_site_recording_previousRecording {
  __typename: "Recording";
  id: string;
}

export interface GetRecording_site_recording_nextRecording {
  __typename: "Recording";
  id: string;
}

export interface GetRecording_site_recording_events_pagination {
  __typename: "RecordingsEventPagination";
  perPage: number;
  itemCount: number;
  currentPage: number;
  totalPages: number;
}

export interface GetRecording_site_recording_events {
  __typename: "RecordingsEvents";
  items: (string | null)[];
  pagination: GetRecording_site_recording_events_pagination;
}

export interface GetRecording_site_recording {
  __typename: "Recording";
  id: string;
  sessionId: string;
  language: string;
  viewed: boolean;
  duration: any;
  bookmarked: boolean;
  pageViews: (string | null)[];
  pageCount: number;
  startPage: string;
  exitPage: string;
  device: GetRecording_site_recording_device;
  connectedAt: string | null;
  disconnectedAt: string | null;
  visitor: GetRecording_site_recording_visitor;
  tags: (GetRecording_site_recording_tags | null)[];
  notes: (GetRecording_site_recording_notes | null)[];
  previousRecording: GetRecording_site_recording_previousRecording | null;
  nextRecording: GetRecording_site_recording_nextRecording | null;
  events: GetRecording_site_recording_events;
}

export interface GetRecording_site {
  __typename: "Site";
  id: string;
  name: string;
  recording: GetRecording_site_recording | null;
}

export interface GetRecording {
  site: GetRecording_site | null;
}

export interface GetRecordingVariables {
  siteId: string;
  recordingId: string;
  eventPage?: number | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetRecordingEvents
// ====================================================

export interface GetRecordingEvents_site_recording_events_pagination {
  __typename: "RecordingsEventPagination";
  perPage: number;
  itemCount: number;
  currentPage: number;
  totalPages: number;
}

export interface GetRecordingEvents_site_recording_events {
  __typename: "RecordingsEvents";
  items: (string | null)[];
  pagination: GetRecordingEvents_site_recording_events_pagination;
}

export interface GetRecordingEvents_site_recording {
  __typename: "Recording";
  id: string;
  events: GetRecordingEvents_site_recording_events;
}

export interface GetRecordingEvents_site {
  __typename: "Site";
  id: string;
  recording: GetRecordingEvents_site_recording | null;
}

export interface GetRecordingEvents {
  site: GetRecordingEvents_site | null;
}

export interface GetRecordingEventsVariables {
  siteId: string;
  recordingId: string;
  eventPage?: number | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetSentiment
// ====================================================

export interface GetSentiment_site_sentiment_responses_items_visitor {
  __typename: "Visitor";
  id: string;
  visitorId: string;
}

export interface GetSentiment_site_sentiment_responses_items {
  __typename: "FeedbackSentimentResponseItem";
  id: string;
  score: number;
  comment: string | null;
  visitor: GetSentiment_site_sentiment_responses_items_visitor;
  sessionId: string;
  recordingId: string;
  timestamp: string;
}

export interface GetSentiment_site_sentiment_responses_pagination {
  __typename: "FeedbackSentimentResponsePagination";
  pageSize: number;
  total: number;
  sort: FeedbackSentimentResponseSort;
}

export interface GetSentiment_site_sentiment_responses {
  __typename: "FeedbackSentimentResponse";
  items: (GetSentiment_site_sentiment_responses_items | null)[];
  pagination: GetSentiment_site_sentiment_responses_pagination;
}

export interface GetSentiment_site_sentiment_replies_responses {
  __typename: "FeedbackSentimentReply";
  score: number;
}

export interface GetSentiment_site_sentiment_replies {
  __typename: "FeedbackSentimentReplies";
  total: number;
  responses: (GetSentiment_site_sentiment_replies_responses | null)[];
}

export interface GetSentiment_site_sentiment_ratings_responses {
  __typename: "FeedbackSentimentRating";
  score: number;
  timestamp: string;
}

export interface GetSentiment_site_sentiment_ratings {
  __typename: "FeedbackSentimentRatings";
  score: number;
  trend: number;
  responses: (GetSentiment_site_sentiment_ratings_responses | null)[];
}

export interface GetSentiment_site_sentiment {
  __typename: "Sentiment";
  responses: GetSentiment_site_sentiment_responses;
  replies: GetSentiment_site_sentiment_replies;
  ratings: GetSentiment_site_sentiment_ratings;
}

export interface GetSentiment_site {
  __typename: "Site";
  id: string;
  sentiment: GetSentiment_site_sentiment;
}

export interface GetSentiment {
  site: GetSentiment_site | null;
}

export interface GetSentimentVariables {
  siteId: string;
  page: number;
  size: number;
  sort: FeedbackSentimentResponseSort;
  fromDate: string;
  toDate: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: SiteCreate
// ====================================================

export interface SiteCreate_siteCreate {
  __typename: "Site";
  id: string;
  name: string;
  url: string;
}

export interface SiteCreate {
  siteCreate: SiteCreate_siteCreate;
}

export interface SiteCreateVariables {
  input: SitesCreateInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: SiteUpdate
// ====================================================

export interface SiteUpdate_siteUpdate {
  __typename: "Site";
  id: string;
  name: string;
  url: string;
  verifiedAt: string | null;
}

export interface SiteUpdate {
  siteUpdate: SiteUpdate_siteUpdate;
}

export interface SiteUpdateVariables {
  input: SitesUpdateInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: SiteDelete
// ====================================================

export interface SiteDelete_siteDelete {
  __typename: "Site";
  id: string;
}

export interface SiteDelete {
  siteDelete: SiteDelete_siteDelete | null;
}

export interface SiteDeleteVariables {
  input: SitesDeleteInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: SiteVerify
// ====================================================

export interface SiteVerify_siteVerify {
  __typename: "Site";
  id: string;
  verifiedAt: string | null;
}

export interface SiteVerify {
  siteVerify: SiteVerify_siteVerify;
}

export interface SiteVerifyVariables {
  input: SitesVerifyInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: SiteIpBlacklistCreate
// ====================================================

export interface SiteIpBlacklistCreate_ipBlacklistCreate_ipBlacklist {
  __typename: "SitesIpBlacklist";
  name: string;
  value: string;
}

export interface SiteIpBlacklistCreate_ipBlacklistCreate {
  __typename: "Site";
  id: string;
  ipBlacklist: (SiteIpBlacklistCreate_ipBlacklistCreate_ipBlacklist | null)[];
}

export interface SiteIpBlacklistCreate {
  ipBlacklistCreate: SiteIpBlacklistCreate_ipBlacklistCreate;
}

export interface SiteIpBlacklistCreateVariables {
  input: SitesIpBlacklistCreateInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: SiteIpBlacklistDelete
// ====================================================

export interface SiteIpBlacklistDelete_ipBlacklistDelete_ipBlacklist {
  __typename: "SitesIpBlacklist";
  name: string;
  value: string;
}

export interface SiteIpBlacklistDelete_ipBlacklistDelete {
  __typename: "Site";
  id: string;
  ipBlacklist: (SiteIpBlacklistDelete_ipBlacklistDelete_ipBlacklist | null)[];
}

export interface SiteIpBlacklistDelete {
  ipBlacklistDelete: SiteIpBlacklistDelete_ipBlacklistDelete;
}

export interface SiteIpBlacklistDeleteVariables {
  input: SitesIpBlacklistDeleteInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: SiteDomainBlacklistCreate
// ====================================================

export interface SiteDomainBlacklistCreate_domainBlacklistCreate_domainBlacklist {
  __typename: "SitesDomainBlacklist";
  type: SitesDomainBlacklistTarget;
  value: string;
}

export interface SiteDomainBlacklistCreate_domainBlacklistCreate {
  __typename: "Site";
  id: string;
  domainBlacklist: (SiteDomainBlacklistCreate_domainBlacklistCreate_domainBlacklist | null)[];
}

export interface SiteDomainBlacklistCreate {
  domainBlacklistCreate: SiteDomainBlacklistCreate_domainBlacklistCreate;
}

export interface SiteDomainBlacklistCreateVariables {
  input: SitesDomainBlacklistCreateInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: SiteDomainBlacklistDelete
// ====================================================

export interface SiteDomainBlacklistDelete_domainBlacklistDelete_domainBlacklist {
  __typename: "SitesDomainBlacklist";
  type: SitesDomainBlacklistTarget;
  value: string;
}

export interface SiteDomainBlacklistDelete_domainBlacklistDelete {
  __typename: "Site";
  id: string;
  domainBlacklist: (SiteDomainBlacklistDelete_domainBlacklistDelete_domainBlacklist | null)[];
}

export interface SiteDomainBlacklistDelete {
  domainBlacklistDelete: SiteDomainBlacklistDelete_domainBlacklistDelete;
}

export interface SiteDomainBlacklistDeleteVariables {
  input: SitesDomainBlacklistDeleteInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetSites
// ====================================================

export interface GetSites_sites {
  __typename: "Site";
  id: string;
  name: string;
  url: string;
  planName: string;
  ownerName: string;
}

export interface GetSites {
  sites: (GetSites_sites | null)[];
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetSite
// ====================================================

export interface GetSite_site_team_user {
  __typename: "User";
  id: string;
}

export interface GetSite_site_team {
  __typename: "Team";
  id: string;
  role: number;
  user: GetSite_site_team_user;
}

export interface GetSite_site_ipBlacklist {
  __typename: "SitesIpBlacklist";
  name: string;
  value: string;
}

export interface GetSite_site_domainBlacklist {
  __typename: "SitesDomainBlacklist";
  type: SitesDomainBlacklistTarget;
  value: string;
}

export interface GetSite_site {
  __typename: "Site";
  id: string;
  name: string;
  url: string;
  verifiedAt: string | null;
  uuid: string;
  planName: string;
  ownerName: string;
  daysSinceLastRecording: number;
  recordingsCount: number;
  team: GetSite_site_team[];
  ipBlacklist: (GetSite_site_ipBlacklist | null)[];
  domainBlacklist: (GetSite_site_domainBlacklist | null)[];
}

export interface GetSite {
  site: GetSite_site | null;
}

export interface GetSiteVariables {
  siteId: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: TeamInvite
// ====================================================

export interface TeamInvite_teamInvite_team_user {
  __typename: "User";
  id: string;
  firstName: string | null;
  lastName: string | null;
  fullName: string | null;
  email: string;
}

export interface TeamInvite_teamInvite_team {
  __typename: "Team";
  id: string;
  role: number;
  status: number;
  user: TeamInvite_teamInvite_team_user;
}

export interface TeamInvite_teamInvite {
  __typename: "Site";
  id: string;
  team: TeamInvite_teamInvite_team[];
}

export interface TeamInvite {
  teamInvite: TeamInvite_teamInvite;
}

export interface TeamInviteVariables {
  input: TeamInviteInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: TeamInviteCancel
// ====================================================

export interface TeamInviteCancel_teamInviteCancel_team_user {
  __typename: "User";
  id: string;
  firstName: string | null;
  lastName: string | null;
  fullName: string | null;
  email: string;
}

export interface TeamInviteCancel_teamInviteCancel_team {
  __typename: "Team";
  id: string;
  role: number;
  status: number;
  user: TeamInviteCancel_teamInviteCancel_team_user;
}

export interface TeamInviteCancel_teamInviteCancel {
  __typename: "Site";
  id: string;
  team: TeamInviteCancel_teamInviteCancel_team[];
}

export interface TeamInviteCancel {
  teamInviteCancel: TeamInviteCancel_teamInviteCancel;
}

export interface TeamInviteCancelVariables {
  input: TeamInviteCancelInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: TeamInviteAccept
// ====================================================

export interface TeamInviteAccept_teamInviteAccept_team_user {
  __typename: "User";
  id: string;
  firstName: string | null;
  lastName: string | null;
  fullName: string | null;
  email: string;
}

export interface TeamInviteAccept_teamInviteAccept_team {
  __typename: "Team";
  id: string;
  role: number;
  status: number;
  user: TeamInviteAccept_teamInviteAccept_team_user;
}

export interface TeamInviteAccept_teamInviteAccept {
  __typename: "Site";
  id: string;
  team: TeamInviteAccept_teamInviteAccept_team[];
}

export interface TeamInviteAccept {
  teamInviteAccept: TeamInviteAccept_teamInviteAccept;
}

export interface TeamInviteAcceptVariables {
  input: TeamInviteAcceptInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: TeamInviteResend
// ====================================================

export interface TeamInviteResend_teamInviteResend_team_user {
  __typename: "User";
  id: string;
  firstName: string | null;
  lastName: string | null;
  fullName: string | null;
  email: string;
}

export interface TeamInviteResend_teamInviteResend_team {
  __typename: "Team";
  id: string;
  role: number;
  status: number;
  user: TeamInviteResend_teamInviteResend_team_user;
}

export interface TeamInviteResend_teamInviteResend {
  __typename: "Site";
  id: string;
  team: TeamInviteResend_teamInviteResend_team[];
}

export interface TeamInviteResend {
  teamInviteResend: TeamInviteResend_teamInviteResend;
}

export interface TeamInviteResendVariables {
  input: TeamInviteResendInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: TeamUpdate
// ====================================================

export interface TeamUpdate_teamUpdate_team_user {
  __typename: "User";
  id: string;
  firstName: string | null;
  lastName: string | null;
  fullName: string | null;
  email: string;
}

export interface TeamUpdate_teamUpdate_team {
  __typename: "Team";
  id: string;
  role: number;
  roleName: string;
  status: number;
  user: TeamUpdate_teamUpdate_team_user;
}

export interface TeamUpdate_teamUpdate {
  __typename: "Site";
  id: string;
  team: TeamUpdate_teamUpdate_team[];
}

export interface TeamUpdate {
  teamUpdate: TeamUpdate_teamUpdate;
}

export interface TeamUpdateVariables {
  input: TeamUpdateInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: TeamLeave
// ====================================================

export interface TeamLeave_teamLeave {
  __typename: "Site";
  id: string;
}

export interface TeamLeave {
  teamLeave: TeamLeave_teamLeave | null;
}

export interface TeamLeaveVariables {
  input: TeamLeaveInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: TeamDelete
// ====================================================

export interface TeamDelete_teamDelete_team_user {
  __typename: "User";
  id: string;
  firstName: string | null;
  lastName: string | null;
  fullName: string | null;
  email: string;
}

export interface TeamDelete_teamDelete_team {
  __typename: "Team";
  id: string;
  role: number;
  status: number;
  user: TeamDelete_teamDelete_team_user;
}

export interface TeamDelete_teamDelete {
  __typename: "Site";
  id: string;
  team: TeamDelete_teamDelete_team[];
}

export interface TeamDelete {
  teamDelete: TeamDelete_teamDelete;
}

export interface TeamDeleteVariables {
  input: TeamDeleteInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetTeam
// ====================================================

export interface GetTeam_site_team_user {
  __typename: "User";
  id: string;
  firstName: string | null;
  lastName: string | null;
  fullName: string | null;
  email: string;
}

export interface GetTeam_site_team {
  __typename: "Team";
  id: string;
  role: number;
  roleName: string;
  status: number;
  user: GetTeam_site_team_user;
}

export interface GetTeam_site {
  __typename: "Site";
  id: string;
  teamSizeExceeded: boolean;
  team: GetTeam_site_team[];
}

export interface GetTeam {
  site: GetTeam_site | null;
}

export interface GetTeamVariables {
  siteId: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UserUpdate
// ====================================================

export interface UserUpdate_userUpdate {
  __typename: "User";
  id: string;
  firstName: string | null;
  lastName: string | null;
}

export interface UserUpdate {
  userUpdate: UserUpdate_userUpdate;
}

export interface UserUpdateVariables {
  input: UsersUpdateInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UserDelete
// ====================================================

export interface UserDelete_userDelete {
  __typename: "User";
  id: string;
}

export interface UserDelete {
  userDelete: UserDelete_userDelete | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UserPassword
// ====================================================

export interface UserPassword_userPassword {
  __typename: "User";
  id: string;
}

export interface UserPassword {
  userPassword: UserPassword_userPassword;
}

export interface UserPasswordVariables {
  input: UsersPasswordInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UserInvitation
// ====================================================

export interface UserInvitation_userInvitation {
  __typename: "UsersInvitation";
  email: string | null;
  hasPending: boolean;
}

export interface UserInvitation {
  userInvitation: UserInvitation_userInvitation | null;
}

export interface UserInvitationVariables {
  token: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: VisitorStarred
// ====================================================

export interface VisitorStarred_visitorStarred_visitor {
  __typename: "Visitor";
  id: string;
  visitorId: string;
  starred: boolean;
}

export interface VisitorStarred_visitorStarred {
  __typename: "Site";
  id: string;
  visitor: VisitorStarred_visitorStarred_visitor | null;
}

export interface VisitorStarred {
  visitorStarred: VisitorStarred_visitorStarred;
}

export interface VisitorStarredVariables {
  siteId: string;
  visitorId: string;
  starred: boolean;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetVisitors
// ====================================================

export interface GetVisitors_site_visitors_items_recordingsCount {
  __typename: "VisitorsRecordingsCount";
  total: number;
}

export interface GetVisitors_site_visitors_items_devices {
  __typename: "RecordingsDevice";
  deviceType: string;
  viewportX: number;
  viewportY: number;
  deviceX: number;
  deviceY: number;
  browserName: string;
  browserDetails: string;
  useragent: string;
}

export interface GetVisitors_site_visitors_items {
  __typename: "Visitor";
  id: string;
  visitorId: string;
  viewed: boolean | null;
  recordingsCount: GetVisitors_site_visitors_items_recordingsCount | null;
  firstViewedAt: string | null;
  lastActivityAt: string | null;
  language: string | null;
  devices: GetVisitors_site_visitors_items_devices[];
  starred: boolean;
  attributes: string | null;
}

export interface GetVisitors_site_visitors_pagination {
  __typename: "VisitorsPagination";
  pageSize: number;
  total: number;
  sort: VisitorsSort;
}

export interface GetVisitors_site_visitors {
  __typename: "Visitors";
  items: (GetVisitors_site_visitors_items | null)[];
  pagination: GetVisitors_site_visitors_pagination;
}

export interface GetVisitors_site {
  __typename: "Site";
  id: string;
  name: string;
  visitors: GetVisitors_site_visitors;
}

export interface GetVisitors {
  site: GetVisitors_site | null;
}

export interface GetVisitorsVariables {
  siteId: string;
  page?: number | null;
  size?: number | null;
  query?: string | null;
  sort?: VisitorsSort | null;
  filters?: VisitorsFilters | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetVisitor
// ====================================================

export interface GetVisitor_site_visitor_recordingsCount {
  __typename: "VisitorsRecordingsCount";
  total: number;
  new: number;
}

export interface GetVisitor_site_visitor_devices {
  __typename: "RecordingsDevice";
  deviceType: string;
  viewportX: number;
  viewportY: number;
  deviceX: number;
  deviceY: number;
  browserName: string;
  browserDetails: string;
  useragent: string;
}

export interface GetVisitor_site_visitor_pageViewsCount {
  __typename: "VisitorsPagesCount";
  total: number;
  unique: number;
}

export interface GetVisitor_site_visitor_recordings_items_device {
  __typename: "RecordingsDevice";
  deviceType: string;
  viewportX: number;
  viewportY: number;
  deviceX: number;
  deviceY: number;
  browserName: string;
  browserDetails: string;
}

export interface GetVisitor_site_visitor_recordings_items {
  __typename: "Recording";
  id: string;
  duration: any;
  viewed: boolean;
  bookmarked: boolean;
  startPage: string;
  exitPage: string;
  pageViews: (string | null)[];
  pageCount: number;
  device: GetVisitor_site_visitor_recordings_items_device;
  sessionId: string;
  connectedAt: string | null;
  disconnectedAt: string | null;
}

export interface GetVisitor_site_visitor_recordings_pagination {
  __typename: "RecordingsPagination";
  pageSize: number;
  total: number;
  sort: RecordingsSort;
}

export interface GetVisitor_site_visitor_recordings {
  __typename: "Recordings";
  items: (GetVisitor_site_visitor_recordings_items | null)[];
  pagination: GetVisitor_site_visitor_recordings_pagination;
}

export interface GetVisitor_site_visitor_pages_items {
  __typename: "VisitorsPage";
  pageView: string;
  pageViewCount: number;
  averageTimeOnPage: number;
}

export interface GetVisitor_site_visitor_pages_pagination {
  __typename: "VisitorsPagePagination";
  pageSize: number;
  total: number;
  sort: VisitorsPagesSort;
}

export interface GetVisitor_site_visitor_pages {
  __typename: "VisitorsPages";
  items: (GetVisitor_site_visitor_pages_items | null)[];
  pagination: GetVisitor_site_visitor_pages_pagination;
}

export interface GetVisitor_site_visitor {
  __typename: "Visitor";
  id: string;
  visitorId: string;
  viewed: boolean | null;
  recordingsCount: GetVisitor_site_visitor_recordingsCount | null;
  firstViewedAt: string | null;
  lastActivityAt: string | null;
  language: string | null;
  devices: GetVisitor_site_visitor_devices[];
  pageViewsCount: GetVisitor_site_visitor_pageViewsCount | null;
  starred: boolean;
  attributes: string | null;
  recordings: GetVisitor_site_visitor_recordings;
  pages: GetVisitor_site_visitor_pages;
  pagesPerSession: number;
  averageSessionDuration: number;
}

export interface GetVisitor_site {
  __typename: "Site";
  id: string;
  name: string;
  visitor: GetVisitor_site_visitor | null;
}

export interface GetVisitor {
  site: GetVisitor_site | null;
}

export interface GetVisitorVariables {
  siteId: string;
  visitorId: string;
  recordingPage?: number | null;
  recordingSort?: RecordingsSort | null;
  pagesPage?: number | null;
  pagesSort?: VisitorsPagesSort | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetSitePages
// ====================================================

export interface GetSitePages_site {
  __typename: "Site";
  id: string;
  pageUrls: (string | null)[];
}

export interface GetSitePages {
  site: GetSitePages_site | null;
}

export interface GetSitePagesVariables {
  siteId: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetSiteTags
// ====================================================

export interface GetSiteTags_site_tags {
  __typename: "Tag";
  id: string;
  name: string;
}

export interface GetSiteTags_site {
  __typename: "Site";
  id: string;
  tags: (GetSiteTags_site_tags | null)[];
}

export interface GetSiteTags {
  site: GetSiteTags_site | null;
}

export interface GetSiteTagsVariables {
  siteId: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum FeedbackNpsResponseSort {
  timestamp__asc = "timestamp__asc",
  timestamp__desc = "timestamp__desc",
}

export enum FeedbackSentimentResponseSort {
  timestamp__asc = "timestamp__asc",
  timestamp__desc = "timestamp__desc",
}

export enum FiltersRange {
  Between = "Between",
  From = "From",
  GreaterThan = "GreaterThan",
  LessThan = "LessThan",
}

export enum FiltersSize {
  GreaterThan = "GreaterThan",
  LessThan = "LessThan",
}

export enum FiltersStart {
  After = "After",
  Before = "Before",
}

export enum FiltersStatus {
  New = "New",
  Viewed = "Viewed",
}

export enum HeatmapsDevice {
  Desktop = "Desktop",
  Mobile = "Mobile",
  Tablet = "Tablet",
}

export enum HeatmapsType {
  Click = "Click",
  Scroll = "Scroll",
}

export enum RecordingsSort {
  connected_at__asc = "connected_at__asc",
  connected_at__desc = "connected_at__desc",
  duration__asc = "duration__asc",
  duration__desc = "duration__desc",
  page_count__asc = "page_count__asc",
  page_count__desc = "page_count__desc",
}

export enum SitesDomainBlacklistTarget {
  domain = "domain",
  email = "email",
}

export enum VisitorsPagesSort {
  views_count__asc = "views_count__asc",
  views_count__desc = "views_count__desc",
}

export enum VisitorsSort {
  first_viewed_at__asc = "first_viewed_at__asc",
  first_viewed_at__desc = "first_viewed_at__desc",
  last_activity_at__asc = "last_activity_at__asc",
  last_activity_at__desc = "last_activity_at__desc",
}

/**
 * Autogenerated input type of FeedbackCreate
 */
export interface FeedbackCreateInput {
  type: string;
  subject: string;
  message: string;
  clientMutationId?: string | null;
}

/**
 * Autogenerated input type of FeedbackUpdate
 */
export interface FeedbackUpdateInput {
  siteId: string;
  npsEnabled?: boolean | null;
  npsAccentColor?: string | null;
  npsSchedule?: string | null;
  npsPhrase?: string | null;
  npsFollowUpEnabled?: boolean | null;
  npsContactConsentEnabled?: boolean | null;
  npsLayout?: string | null;
  sentimentEnabled?: boolean | null;
  sentimentAccentColor?: string | null;
  sentimentExcludedPages?: string[] | null;
  sentimentLayout?: string | null;
  clientMutationId?: string | null;
}

export interface FiltersDate {
  rangeType?: FiltersRange | null;
  fromType?: FiltersStart | null;
  fromDate?: string | null;
  betweenFromDate?: string | null;
  betweenToDate?: string | null;
}

export interface FiltersDuration {
  rangeType?: FiltersRange | null;
  fromType?: FiltersSize | null;
  fromDuration?: number | null;
  betweenFromDuration?: number | null;
  betweenToDuration?: number | null;
}

export interface FiltersRecordings {
  rangeType?: FiltersRange | null;
  count?: number | null;
}

export interface FiltersViewport {
  minWidth?: number | null;
  maxWidth?: number | null;
  minHeight?: number | null;
  maxHeight?: number | null;
}

/**
 * Autogenerated input type of RecordingsBookmarked
 */
export interface RecordingsBookmarkedInput {
  siteId: string;
  recordingId: string;
  bookmarked: boolean;
  clientMutationId?: string | null;
}

/**
 * Autogenerated input type of RecordingsDeleteBulk
 */
export interface RecordingsDeleteBulkInput {
  siteId: string;
  recordingIds: string[];
  clientMutationId?: string | null;
}

/**
 * Autogenerated input type of RecordingsDelete
 */
export interface RecordingsDeleteInput {
  siteId: string;
  recordingId: string;
  clientMutationId?: string | null;
}

export interface RecordingsFilters {
  browsers: string[];
  devices: string[];
  languages: string[];
  startUrl?: string | null;
  exitUrl?: string | null;
  visitedPages: string[];
  unvisitedPages: string[];
  status?: FiltersStatus | null;
  date: FiltersDate;
  duration: FiltersDuration;
  viewport: FiltersViewport;
}

/**
 * Autogenerated input type of RecordingsViewedBulk
 */
export interface RecordingsViewedBulkInput {
  siteId: string;
  recordingIds: string[];
  viewed: boolean;
  clientMutationId?: string | null;
}

/**
 * Autogenerated input type of RecordingsViewed
 */
export interface RecordingsViewedInput {
  siteId: string;
  recordingId: string;
  clientMutationId?: string | null;
}

/**
 * Autogenerated input type of SitesCreate
 */
export interface SitesCreateInput {
  name: string;
  url: string;
  clientMutationId?: string | null;
}

/**
 * Autogenerated input type of SitesDelete
 */
export interface SitesDeleteInput {
  siteId: string;
  clientMutationId?: string | null;
}

/**
 * Autogenerated input type of SitesDomainBlacklistCreate
 */
export interface SitesDomainBlacklistCreateInput {
  siteId: string;
  type: string;
  value: string;
  clientMutationId?: string | null;
}

/**
 * Autogenerated input type of SitesDomainBlacklistDelete
 */
export interface SitesDomainBlacklistDeleteInput {
  siteId: string;
  value: string;
  clientMutationId?: string | null;
}

/**
 * Autogenerated input type of SitesIpBlacklistCreate
 */
export interface SitesIpBlacklistCreateInput {
  siteId: string;
  name: string;
  value: string;
  clientMutationId?: string | null;
}

/**
 * Autogenerated input type of SitesIpBlacklistDelete
 */
export interface SitesIpBlacklistDeleteInput {
  siteId: string;
  value: string;
  clientMutationId?: string | null;
}

/**
 * Autogenerated input type of SitesUpdate
 */
export interface SitesUpdateInput {
  siteId: string;
  name?: string | null;
  url?: string | null;
  clientMutationId?: string | null;
}

/**
 * Autogenerated input type of SitesVerify
 */
export interface SitesVerifyInput {
  siteId: string;
  clientMutationId?: string | null;
}

/**
 * Autogenerated input type of TeamDelete
 */
export interface TeamDeleteInput {
  siteId: string;
  teamId: string;
  clientMutationId?: string | null;
}

/**
 * Autogenerated input type of TeamInviteAccept
 */
export interface TeamInviteAcceptInput {
  token: string;
  password?: string | null;
  clientMutationId?: string | null;
}

/**
 * Autogenerated input type of TeamInviteCancel
 */
export interface TeamInviteCancelInput {
  siteId: string;
  teamId: string;
  clientMutationId?: string | null;
}

/**
 * Autogenerated input type of TeamInvite
 */
export interface TeamInviteInput {
  siteId: string;
  email: string;
  role: number;
  clientMutationId?: string | null;
}

/**
 * Autogenerated input type of TeamInviteResend
 */
export interface TeamInviteResendInput {
  siteId: string;
  teamId: string;
  clientMutationId?: string | null;
}

/**
 * Autogenerated input type of TeamLeave
 */
export interface TeamLeaveInput {
  siteId: string;
  clientMutationId?: string | null;
}

/**
 * Autogenerated input type of TeamUpdate
 */
export interface TeamUpdateInput {
  siteId: string;
  teamId: string;
  role: number;
  clientMutationId?: string | null;
}

/**
 * Autogenerated input type of UsersPassword
 */
export interface UsersPasswordInput {
  password: string;
  passwordConfirmation: string;
  currentPassword: string;
  clientMutationId?: string | null;
}

/**
 * Autogenerated input type of UsersUpdate
 */
export interface UsersUpdateInput {
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  clientMutationId?: string | null;
}

export interface VisitorsFilters {
  status?: FiltersStatus | null;
  recordings: FiltersRecordings;
  firstVisited: FiltersDate;
  lastActivity: FiltersDate;
  languages: string[];
}

//==============================================================
// END Enums and Input Objects
//==============================================================
