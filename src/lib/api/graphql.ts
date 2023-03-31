import { uniq } from 'lodash';
import { ApolloClient, InMemoryCache, TypedDocumentNode, gql } from '@apollo/client';
import { Preference, Preferences } from 'lib/preferences';

import {
  Query,
  FeedbackUpdateInput,
  ConsentUpdateInput,
  NotesCreateInput,
  NotesDeleteInput,
  NotesUpdateInput,
  RecordingsBookmarkedInput,
  RecordingsDeleteBulkInput,
  RecordingsDeleteInput,
  RecordingsEvents,
  RecordingsViewedBulkInput,
  RecordingsViewedInput,
  Site,
  SitesDeleteInput,
  SitesDomainBlacklistCreateInput,
  SitesDomainBlacklistDeleteInput,
  SitesIpBlacklistCreateInput,
  SitesIpBlacklistDeleteInput,
  SitesUpdateInput,
  SitesVerifyInput,
  TagsCreateInput,
  TagsDeleteBulkInput,
  TagsDeleteInput,
  TagsRemoveInput,
  TagsUpdateInput,
  User,
  UsersInvitation,
  VisitorsStarredInput,
  VisitorsDeleteInput,
  Team,
  Tag,
  Note,
  Recording,
  Visitor,
  Feedback,
  Consent,
  UsersCommunication,
  UsersCommunicationInput,
  NpsDeleteInput,
  SentimentDeleteInput,
  BlogPost,
  AdminBlogPostDeleteInput,
  AdminUserDeleteInput,
  AdminSiteDeleteInput,
  SitesMagicErasureUpdateInput,
  SitesCssSelectorBlacklistCreateInput,
  SitesCssSelectorBlacklistDeleteInput,
  AdminSitePlanUpdateInput,
  AdminSiteAssociateCustomerInput,
  AdminSiteIngestUpdateInput,
  AnonymisePreferencesUpdateInput,
  SitesSuperuserAccessUpdateInput,
  EventCaptureDeleteInput,
  EventCaptureDeleteBulkInput,
  EventGroupDeleteInput,
  EventCaptureCreateInput,
  EventsCaptureItem,
  EventGroupCreateInput,
  EventsGroup,
  EventAddToGroupInput,
  EventCaptureUpdateInput,
  SitesRoutesUpdateInput,
  AdminReferralDeleteInput,
  UsersReferralCreateInput,
  UsersReferral,
  UsersReferralDeleteInput,
  AdminUserPartnerCreateInput,
  AdminPartnerInvoiceUpdateInput,
  UsersInvoiceCreateInput,
  UsersInvoice,
  UsersInvoiceDeleteInput,
  SitesCreateInput,
  SitesTrackingCodeInstructionsInput,
  AdminSiteTeamDeleteInput,
  AdminSiteTeamUpdateRoleInput,
  SitesApiKeyCreateInput,
  SitesBundle,
  AdminSiteBundlesCreateInput,
  DataExportCreateInput,
  DataExportDeleteInput,
} from 'types/graphql';

import {
  GET_SITES_QUERY
} from 'data/sites/queries';

import { 
  CREATE_SITE_MUTATION, 
  UPDATE_SITE_MUTATION,
  DELETE_SITE_MUTATION,
  VERIFY_SITE_MUTATION,
  CREATE_IP_BLACKLIST_MUTATION,
  DELETE_IP_BLACKLIST_MUTATION,
  CREATE_DOMAIN_BLACKLIST_MUTATION,
  DELETE_DOMAIN_BLACKLIST_MUTATION,
  MAGIC_ERASURE_ENABLED_MUTATION,
  CSS_SELECTOR_BLACKLIST_CREATE_MUTATION,
  CSS_SELECTOR_BLACKLIST_DELETE_MUTATION,
  ANONYMISE_PREFERENCES_UPDATE_MUTATION,
  ADMIN_SITE_PLAN_UPDATE_MUTATION,
  ADMIN_SITE_ASSOCIATE_CUSTOMER_MUTATION,
  ADMIN_SITE_INGEST_UPDATE,
  ADMIN_SITE_TEAM_DELETE,
  ADMIN_SITE_TEAM_ROLE_UPDATE,
  ADMIN_SITE_BUNDLE_CREATE,
  SUPERUSER_ACESSS_UPDATE,
  ADMIN_SITE_DELETE_MUTATION,
  ROUTES_UPDATE_MUTATION,
  SEND_TRACKING_CODE_INSTRUCTIONS,
  SITE_API_KEY_CREATE,
  SITE_DATA_EXPORT_CREATE,
  SITE_DATA_EXPORT_DELETE,
} from 'data/sites/mutations';

import {
  TeamInviteInput,
  TeamInviteCancelInput, 
  TeamInviteResendInput,
  TeamUpdateRoleInput,
  TeamUpdateInput,
  TeamInviteAcceptInput,
  TeamLeaveInput, 
  TeamDeleteInput,
  UsersUpdateInput,
  UsersPasswordInput,
  AdminBlogPostCreateInput,
  AdminBlogPostUpdateInput,
} from 'types/graphql';

import { 
  TEAM_INVITE_MUTATION, 
  TEAM_INVITE_CANCEL_MUTATION, 
  TEAM_INVITE_ACCEPT_MUTATION,
  TEAM_INVITE_RESEND_MUTATION,
  TEAM_UPDATE_ROLE_MUTATION,
  TEAM_UPDATE_MUTATION,
  TEAM_LEAVE_MUTATION,
  TEAM_DELETE_MUTATION
} from 'data/teams/mutations';

import { 
  USER_INVITATION_QUERY
} from 'data/users/queries';

import { 
  UPDATE_USER_MUTATION,
  USER_DELETE_MUTATION,
  USER_PASSWORD_MUTATION,
  UPDATE_USER_COMMUNICATION,
  USER_CREATE_REFERRAL_MUTATION,
  USER_CREATE_INVOICE_MUTATION,
  USER_DELETE_INVOICE_MUTATION,
  ADMIN_USER_DELETE_MUTATION,
  ADMIN_REFERRAL_DELETE_MUTATION,
  ADMIN_USER_PARTNER_CREATE_MUTATION,
  ADMIN_PARTNER_INVOICE_UPDATE,
  USER_REFERRAL_DELETE_MUTATION,
} from 'data/users/mutations';

import { 
  GET_RECORDINGS_QUERY 
} from 'data/recordings/queries';

import {
  CREATE_TAG_MUTATION,
  REMOVE_TAG_MUTATION,
  DELETE_TAG_MUTATION,
  DELETE_TAGS_MUTATION,
  UPDATE_TAG_MUTATION,
  CREATE_NOTE_MUTATION,
  DELETE_NOTE_MUTATION,
  UPDATE_NOTE_MUTATION,
  DELETE_RECORDING_MUTATION,
  VIEWED_RECORDING_MUTATION,
  BOOKMARK_RECORDING_MUTATION,
  DELETE_RECORDINGS_MUTATION,
  VIEWED_RECORDINGS_MUTATION,
} from 'data/recordings/mutations';

import {
  FEEDBACK_UPDATE_MUTATION,
} from 'data/feedback/mutations';

import {
  CONSENT_UPDATE_MUTATION,
} from 'data/consent/mutations';

import { 
  VISITOR_STARRED_MUTATION,
  VISITOR_DELETE_MUTATION,
} from 'data/visitors/mutations';

import { 
  NPS_DELETE_MUTATION,
} from 'data/nps/mutations';

import {
  SENTIMENT_DELETE_MUTATION,
} from 'data/sentiment/mutations';

import {
  ADMIN_BLOG_POST_CREATE_MUTATION,
  ADMIN_BLOG_POST_UPDATE_MUTATION,
  ADMIN_BLOG_POST_DELETE_MUTATION,
} from 'data/blog/mutations';

import { 
  GET_BLOG_POSTS_QUERY 
} from 'data/blog/queries';

import {
  DELETE_EVENT_CAPTURE_MUTATION,
  BULK_DELETE_EVENT_CAPTURE_MUTATION,
  DELETE_EVENT_GROUP_MUTATION,
  CREATE_EVENT_CAPTURE_MUTATION,
  CREATE_EVENT_GROUP_MUTATION,
  ADD_TO_GROUP_MUTATION,
  UPDATE_EVENT_CAPTURE_MUTATION,
} from 'data/events/mutations';

import {
  GET_ADMIN_SITES_BUNDLES_QUERY,
} from 'data/admin/queries';

export const cache = new InMemoryCache({
  typePolicies: {
    Recording: {
      fields: {
        events: {
          // Is Apollo even designed for humans to work with? This is madness!
          // In order to build up the list of events, the caching by any of the
          // arguments (in this case, page) needs to be disabled. The fetchMore
          // function is used in conjunction with these merging rules to build
          // the full list
          keyArgs: false,
          merge(existing: RecordingsEvents, incoming: RecordingsEvents) {
            if (!incoming) return existing;
            if (!existing) return incoming;

            return {
              ...incoming,
              // A small amount of the events may have been loaded to show a preview,
              // in this case the events will be merged with the existing ones which
              // causes duplicates. I'm sure this is horrendous for performance but
              // we can cross that bridge another day
              items: uniq([...existing.items, ...incoming.items]),
            };
          }
        }
      }
    },
    Heatmaps: {
      merge: true,
    },
  }
});

export const client = new ApolloClient({
  cache,
  uri: '/api/graphql',
  ssrMode: typeof window === 'undefined',
  headers: {
    'x-squeaky-timezone': typeof window === 'undefined' ? 'UTC' : Preferences.getString(Preference.TIMEZONE) || 'UTC', 
  },
});

export const getGqlString = (document: TypedDocumentNode): string => (
  document.loc?.source?.body
);

export const createSite = async (input: SitesCreateInput): Promise<Site> => {
  const { data } = await client.mutate({
    mutation: CREATE_SITE_MUTATION,
    variables: { input },
  });

  const query = cache.readQuery<Query>({ query: GET_SITES_QUERY });

  if (query?.sites) {
    cache.writeQuery({
      query: GET_SITES_QUERY,
      data: { sites: [...query.sites, data.siteCreate] }
    });
  }

  return data.siteCreate;
};

export const updateSite = async (input: SitesUpdateInput): Promise<Site> => {
  const { data } = await client.mutate({
    mutation: UPDATE_SITE_MUTATION,
    variables: { input }
  });

  return data.siteUpdate;
};

export const deleteSite = async (input: SitesDeleteInput): Promise<null> => {
  await client.mutate({
    mutation: DELETE_SITE_MUTATION,
    variables: { input }
  });

  const { sites } = cache.readQuery<Query>({ query: GET_SITES_QUERY });

  cache.writeQuery({
    query: GET_SITES_QUERY,
    data: { sites: sites.filter(site => site.id !== input.siteId) }
  });

  return null;
};

export const verifySite = async (input: SitesVerifyInput): Promise<Site> => {
  const { data } = await client.mutate({
    mutation: VERIFY_SITE_MUTATION,
    variables: { input }
  });

  return data.siteVerify;
};

export const sendTrackingCodeInstructions = async (input: SitesTrackingCodeInstructionsInput): Promise<void> => {
  await client.mutate({
    mutation: SEND_TRACKING_CODE_INSTRUCTIONS,
    variables: { input }
  });
};

export const ipBlacklistCreate = async (input: SitesIpBlacklistCreateInput): Promise<Site> => {
  const { data } = await client.mutate({
    mutation: CREATE_IP_BLACKLIST_MUTATION,
    variables: { input }
  });

  return data.ipBlacklist;
};

export const ipBlacklistDelete = async (input: SitesIpBlacklistDeleteInput): Promise<Site> => {
  const { data } = await client.mutate({
    mutation: DELETE_IP_BLACKLIST_MUTATION,
    variables: { input }
  });

  return data.ipBlacklist;
};

export const domainBlacklistCreate = async (input: SitesDomainBlacklistCreateInput): Promise<Site> => {
  const { data } = await client.mutate({
    mutation: CREATE_DOMAIN_BLACKLIST_MUTATION,
    variables: { input }
  });

  return data.domainBlacklist;
};

export const domainBlacklistDelete = async (input: SitesDomainBlacklistDeleteInput): Promise<Site> => {
  const { data } = await client.mutate({
    mutation: DELETE_DOMAIN_BLACKLIST_MUTATION,
    variables: { input }
  });

  return data.domainBlacklist;
};

export const magicErasureUpdate = async (input: SitesMagicErasureUpdateInput): Promise<Site> => {
  const { data } = await client.mutate({
    mutation: MAGIC_ERASURE_ENABLED_MUTATION,
    variables: { input }
  });

  return data.magicErasureUpdate;
};

export const cssSelectorBlacklistCreate = async (input: SitesCssSelectorBlacklistCreateInput): Promise<Site> => {
  const { data } = await client.mutate({
    mutation: CSS_SELECTOR_BLACKLIST_CREATE_MUTATION,
    variables: { input }
  });

  return data.cssSelectorBlacklist;
};

export const cssSelectorBlacklistDelete = async (input: SitesCssSelectorBlacklistDeleteInput): Promise<Site> => {
  const { data } = await client.mutate({
    mutation: CSS_SELECTOR_BLACKLIST_DELETE_MUTATION,
    variables: { input }
  });

  return data.cssSelectorBlacklist;
};

export const anonymisePreferencesUpdate = async (input: AnonymisePreferencesUpdateInput): Promise<Site> => {
  const { data } = await client.mutate({
    mutation: ANONYMISE_PREFERENCES_UPDATE_MUTATION,
    variables: { input }
  });

  return data.anonymisePreferencesUpdate;
};

export const updateUser = async (input: UsersUpdateInput): Promise<User> => {
  const { data } = await client.mutate({
    mutation: UPDATE_USER_MUTATION,
    variables: { input }
  });

  return data.userUpdate;
};

export const updateUserCommunication = async (input: UsersCommunicationInput): Promise<UsersCommunication> => {
  const { data } = await client.mutate({
    mutation: UPDATE_USER_COMMUNICATION,
    variables: { input }
  });

  return data;
};

export const teamInvite = async (input: TeamInviteInput): Promise<Team> => {
  const { data } = await client.mutate({
    mutation: TEAM_INVITE_MUTATION,
    variables: { input }
  });

  cache.modify({
    id: cache.identify({ id: input.siteId, __typename: 'Site' }),
    fields: {
      team(existingTeamRefs = []) {
        return [{ _ref: `Team:${data.id}` }, ...existingTeamRefs];
      },
    },
  });

  return data.teamInvite;
};

export const teamInviteCancel = async (input: TeamInviteCancelInput): Promise<null> => {
  const { data } = await client.mutate({
    mutation: TEAM_INVITE_CANCEL_MUTATION,
    variables: { input },
    update(cache) {
      const normalizedId = cache.identify({ id: input.teamId, __typename: 'Team' });
      cache.evict({ id: normalizedId });
      cache.gc();
    }
  });

  return data.teamInviteCancel;
};

export const teamInviteAccept = async (input: TeamInviteAcceptInput): Promise<Team> => {
  const { data } = await client.mutate({
    mutation: TEAM_INVITE_ACCEPT_MUTATION,
    variables: { input }
  });

  return data.teamInviteCancel;
};

export const teamInviteResend = async (input: TeamInviteResendInput): Promise<Team> => {
  const { data } = await client.mutate({
    mutation: TEAM_INVITE_RESEND_MUTATION,
    variables: { input }
  });

  return data.teamInviteResend;
};

export const userInvitation = async (token: string): Promise<UsersInvitation> => {
  const { data } = await client.query({
    query: USER_INVITATION_QUERY,
    variables: { token }
  });

  return data.userInvitation;
};

export const userDelete = async (): Promise<null> => {
  const { data } = await client.mutate({ 
    mutation: USER_DELETE_MUTATION 
  });

  return data;
};

export const userPassword = async (input: UsersPasswordInput): Promise<User> => {
  const { data } = await client.mutate({
    mutation: USER_PASSWORD_MUTATION,
    variables: { input }
  });

  return data.userPassword;
}

export const teamUpdateRole = async (input: TeamUpdateRoleInput): Promise<Team> => {
  const { data } = await client.mutate({
    mutation: TEAM_UPDATE_ROLE_MUTATION,
    variables: { input }
  });

  return data.teamUpdateRole;
};

export const teamUpdate = async (input: TeamUpdateInput): Promise<Team> => {
  const { data } = await client.mutate({
    mutation: TEAM_UPDATE_MUTATION,
    variables: { input }
  });

  return data.teamUpdate;
};

export const teamLeave = async (input: TeamLeaveInput): Promise<null> => {
  await client.mutate({
    mutation: TEAM_LEAVE_MUTATION,
    variables: { input }
  });

  return null;
};

export const teamDelete = async (input: TeamDeleteInput): Promise<null> => {
  const { data } = await client.mutate({
    mutation: TEAM_DELETE_MUTATION,
    variables: { input },
    update(cache) {
      const normalizedId = cache.identify({ id: input.teamId, __typename: 'Team' });
      cache.evict({ id: normalizedId });
      cache.gc();
    }
  });

  return data.teamDelete;
};

export const tagCreate = async (input: TagsCreateInput): Promise<Tag> => {
  const { data } = await client.mutate<{ tagCreate: Tag }>({
    mutation: CREATE_TAG_MUTATION,
    variables: { input },
  });

  cache.modify({
    id: cache.identify({ id: input.recordingId, __typename: 'Recording' }),
    fields: {
      tags(existingTagRefs = []) {
        const newTagRef = cache.writeFragment({
          data: data.tagCreate,
          fragment: gql`
            fragment NewTag on Tag {
              id
              name
            }
          `
        });

        return [newTagRef, ...existingTagRefs];
      },
    },
  });

  return data.tagCreate;
};

export const tagRemove = async (input: TagsRemoveInput): Promise<null> => {
  const { data } = await client.mutate({
    mutation: REMOVE_TAG_MUTATION,
    variables: { input },
    update(cache) {
      const normalizedId = cache.identify({ id: input.tagId, __typename: 'Tag' });
      cache.evict({ id: normalizedId });
      cache.gc();
    }
  });

  return data.tagRemove;
};

export const tagDelete = async (input: TagsDeleteInput): Promise<null> => {
  const { data } = await client.mutate({
    mutation: DELETE_TAG_MUTATION,
    variables: { input },
    update(cache) {
      const normalizedId = cache.identify({ id: input.tagId, __typename: 'Tag' });
      cache.evict({ id: normalizedId });
      cache.gc();
    }
  });

  return data.tagDelete;
};

export const tagsDelete = async (input: TagsDeleteBulkInput): Promise<null> => {
  const { data } = await client.mutate({
    mutation: DELETE_TAGS_MUTATION,
    variables: { input },
    update(cache) {
      input.tagIds.forEach(id => {
        const normalizedId = cache.identify({ id, __typename: 'Tag' });
        cache.evict({ id: normalizedId });
      });

      cache.gc();
    }
  });

  return data.tagsDelete;
};

export const tagUpdate = async (input: TagsUpdateInput): Promise<Tag> => {
  const { data } = await client.mutate({
    mutation: UPDATE_TAG_MUTATION,
    variables: { input },
  });

  return data.tagUpdate;
};

export const noteCreate = async (input: NotesCreateInput): Promise<Note> => {
  const { data } = await client.mutate<{ noteCreate: Note }>({
    mutation: CREATE_NOTE_MUTATION,
    variables: { input },
  });

  cache.modify({
    id: cache.identify({ id: input.recordingId, __typename: 'Recording' }),
    fields: {
      notes(existingNoteRefs = []) {
        const newNoteRef = cache.writeFragment({
          data: data.noteCreate,
          fragment: gql`
            fragment NewNote on Note {
              id
              timestamp
              body
              user {
                fullName
              }
            }
          `
        });

        return [newNoteRef, ...existingNoteRefs];
      },
    }
  });

  return data.noteCreate;
};

export const noteDelete = async (input: NotesDeleteInput): Promise<null> => {
  const { data } = await client.mutate({
    mutation: DELETE_NOTE_MUTATION,
    variables: { input },
    update(cache) {
      const normalizedId = cache.identify({ id: input.noteId, __typename: 'Note' });
      cache.evict({ id: normalizedId });
      cache.gc();
    }
  });

  return data.noteDelete;
};

export const noteUpdate = async (input: NotesUpdateInput): Promise<Note> => {
  const { data } = await client.mutate({
    mutation: UPDATE_NOTE_MUTATION,
    variables: { input },
  });

  return data.noteUpdate;
};

export const recordingViewed = async (input: RecordingsViewedInput): Promise<Recording> => {
  const { data } = await client.mutate({
    mutation: VIEWED_RECORDING_MUTATION,
    variables: { input }
  });

  return data.recordingViewed;
};

export const recordingDelete = async (input: RecordingsDeleteInput): Promise<null> => {
  const { data } = await client.mutate({
    mutation: DELETE_RECORDING_MUTATION,
    variables: { input },
    update(cache) {
      const normalizedId = cache.identify({ id: input.recordingId, __typename: 'Recording' });
      cache.evict({ id: normalizedId });
      cache.gc();
    }
  });

  return data.recordingDelete;
};

export const recordingBookmarked = async (input: RecordingsBookmarkedInput): Promise<Recording> => {
  const { data } = await client.mutate({
    mutation: BOOKMARK_RECORDING_MUTATION,
    variables: { input }
  });

  return data.recordingBookmarked;
};

export const recordingsDelete = async (input: RecordingsDeleteBulkInput): Promise<null> => {
  const { data } = await client.mutate({
    mutation: DELETE_RECORDINGS_MUTATION,
    variables: { input },
    refetchQueries: [
      GET_RECORDINGS_QUERY,
    ],
  });

  return data.recordingsDelete;
};

export const recordingsViewed = async (input: RecordingsViewedBulkInput): Promise<Recording[]> => {
  const { data } = await client.mutate({
    mutation: VIEWED_RECORDINGS_MUTATION,
    variables: { input }
  });

  return data.recordingsViewed;
};

export const visitorStarred = async (input: VisitorsStarredInput): Promise<Visitor> => {
  const { data } = await client.mutate({
    mutation: VISITOR_STARRED_MUTATION,
    variables: { input },
  });

  return data.visitorStarred;
};

export const feedbackUpdate = async (input: FeedbackUpdateInput): Promise<Feedback> => {
  const { data } = await client.mutate({
    mutation: FEEDBACK_UPDATE_MUTATION,
    variables: { input },
  });

  return data.feedback;
};

export const consentUpdate = async (input: ConsentUpdateInput): Promise<Consent> => {
  const { data } = await client.mutate({
    mutation: CONSENT_UPDATE_MUTATION,
    variables: { input },
  });

  return data.consent;
};

export const visitorDelete = async (input: VisitorsDeleteInput): Promise<null> => {
  const { data } = await client.mutate({
    mutation: VISITOR_DELETE_MUTATION,
    variables: { input },
    update(cache) {
      const normalizedId = cache.identify({ id: input.visitorId, __typename: 'Visitor' });
      cache.evict({ id: normalizedId });
      cache.gc();
    }
  });

  return data.visitorDelete;
};

export const npsDelete = async (input: NpsDeleteInput): Promise<null> => {
  const { data } = await client.mutate({
    mutation: NPS_DELETE_MUTATION,
    variables: { input },
    update(cache) {
      const normalizedId = cache.identify({ id: input.npsId, __typename: 'FeedbackNpsResponseItem' });
      cache.evict({ id: normalizedId });
      cache.gc();
    }
  });

  return data.npsDelete
};

export const sentimentDelete = async (input: SentimentDeleteInput): Promise<null> => {
  const { data } = await client.mutate({
    mutation: SENTIMENT_DELETE_MUTATION,
    variables: { input },
    update(cache) {
      const normalizedId = cache.identify({ id: input.sentimentId, __typename: 'FeedbackSentimentResponseItem' });
      cache.evict({ id: normalizedId });
      cache.gc();
    }
  });

  return data.npsDelete
};

export const createBlogPost = async (input: AdminBlogPostCreateInput): Promise<BlogPost> => {
  const { data } = await client.mutate({
    mutation: ADMIN_BLOG_POST_CREATE_MUTATION,
    variables: { input },
  });

  const { blogPosts } = cache.readQuery<Query>({ query: GET_BLOG_POSTS_QUERY });

  cache.writeQuery({
    query: GET_BLOG_POSTS_QUERY,
    data: {
      blogPosts: {
        ...blogPosts,
        posts: [...blogPosts.posts, data.adminBlogPostCreate],
      }
    }
  });

  return data.adminBlogPostCreate;
};

export const updateBlogPost = async (input: AdminBlogPostUpdateInput): Promise<BlogPost> => {
  const { data } = await client.mutate({
    mutation: ADMIN_BLOG_POST_UPDATE_MUTATION,
    variables: { input },
  });

  return data.adminBlogPostUpdate;
};

export const deleteBlogPost = async (input: AdminBlogPostDeleteInput): Promise<void> => {
  await client.mutate({
    mutation: ADMIN_BLOG_POST_DELETE_MUTATION,
    variables: { input },
    update(cache) {
      const normalizedId = cache.identify({ id: input.id, __typename: 'BlogPost' });
      cache.evict({ id: normalizedId });
      cache.gc();
    }
  });
};

export const adminUserDelete = async (input: AdminUserDeleteInput): Promise<void> => {
  await client.mutate({
    mutation: ADMIN_USER_DELETE_MUTATION,
    variables: { input },
    update(cache) {
      const normalizedId = cache.identify({ id: input.id, __typename: 'User' });
      cache.evict({ id: normalizedId });
      cache.gc();
    }
  });
};

export const adminSiteDelete = async (input: AdminSiteDeleteInput): Promise<void> => {
  await client.mutate({
    mutation: ADMIN_SITE_DELETE_MUTATION,
    variables: { input },
    update(cache) {
      const normalizedId = cache.identify({ id: input.id, __typename: 'Site' });
      cache.evict({ id: normalizedId });
      cache.gc();
    }
  })
};

export const adminSitePlanUpdate = async (input: AdminSitePlanUpdateInput): Promise<Site> => {
  const { data } = await client.mutate({
    mutation: ADMIN_SITE_PLAN_UPDATE_MUTATION,
    variables: { input },
  });

  return data.adminSitePlanUpdate;
};

export const adminSiteAssociateCustomer = async (input: AdminSiteAssociateCustomerInput): Promise<Site> => {
  const { data } = await client.mutate({
    mutation: ADMIN_SITE_ASSOCIATE_CUSTOMER_MUTATION,
    variables: { input },
  });

  return data.adminSiteAssociateCustomer;
};

export const adminSiteIngestUpdate = async (input: AdminSiteIngestUpdateInput): Promise<Site> => {
  const { data } = await client.mutate({
    mutation: ADMIN_SITE_INGEST_UPDATE,
    variables: { input },
  });

  return data.adminSiteIngestUpdate;
};

export const adminSiteTeamDelete = async (input: AdminSiteTeamDeleteInput): Promise<void> => {
  await client.mutate({
    mutation: ADMIN_SITE_TEAM_DELETE,
    variables: { input },
    update(cache) {
      const normalizedId = cache.identify({ id: input.id, __typename: 'Team' });
      cache.evict({ id: normalizedId });
      cache.gc();
    }
  })
};

export const adminSiteTeamUpdateRole = async (input: AdminSiteTeamUpdateRoleInput): Promise<Team> => {
  const { data } = await client.mutate({
    mutation: ADMIN_SITE_TEAM_ROLE_UPDATE,
    variables: { input },
  });

  return data.adminSiteTeamRoleUpdate;
};

export const adminSiteBundleCreate = async (input: AdminSiteBundlesCreateInput): Promise<SitesBundle> => {
  const { data } = await client.mutate({
    mutation: ADMIN_SITE_BUNDLE_CREATE,
    variables: { input },
    refetchQueries: [
      GET_ADMIN_SITES_BUNDLES_QUERY,
    ]
  });

  return data.adminSiteBundlesCreate;
}

export const superuserAccessUpdate = async (input: SitesSuperuserAccessUpdateInput): Promise<Site> => {
  const { data } = await client.mutate({
    mutation: SUPERUSER_ACESSS_UPDATE,
    variables: { input },
  });

  return data.superuserAccessUpdate;
};

export const eventsCaptureDelete = async (input: EventCaptureDeleteInput): Promise<null> => {
  const { data } = await client.mutate({
    mutation: DELETE_EVENT_CAPTURE_MUTATION,
    variables: { input },
    update(cache) {
      const normalizedId = cache.identify({ id: input.eventId, __typename: 'EventsCaptureItem' });
      cache.evict({ id: normalizedId });
      cache.gc();
    }
  });

  return data.eventCapture;
};

export const eventsCaptureDeleteBulk = async (input: EventCaptureDeleteBulkInput): Promise<null> => {
  const { data } = await client.mutate({
    mutation: BULK_DELETE_EVENT_CAPTURE_MUTATION,
    variables: { input },
    update(cache) {
      input.eventIds.forEach(id => {
        const normalizedId = cache.identify({ id, __typename: 'EventsCaptureItem' });
        cache.evict({ id: normalizedId });
      });

      cache.gc();
    }
  });

  return data.eventCapture;
};

export const eventsGroupDelete = async (input: EventGroupDeleteInput): Promise<null> => {
  const { data } = await client.mutate({
    mutation: DELETE_EVENT_GROUP_MUTATION,
    variables: { input },
    update(cache) {
      const normalizedId = cache.identify({ id: input.groupId, __typename: 'EventsGroup' });
      cache.evict({ id: normalizedId });
      cache.gc();
    }
  });

  return data.eventGroups;
};

export const eventsCaptureCreate = async (input: EventCaptureCreateInput): Promise<EventsCaptureItem> => {
  const { data } = await client.mutate({
    mutation: CREATE_EVENT_CAPTURE_MUTATION,
    variables: { input },
  });

  cache.modify({
    id: cache.identify({ id: input.siteId, __typename: 'Site' }),
    fields: {
      eventCapture(existingRefs = {}) {
        const newRef = cache.writeFragment({
          data: data.eventCaptureCreate,
          fragment: gql`
            fragment NewEventsCaptureItem on EventsCaptureItem {
              id
              name
              type
              rules {
                condition
                matcher
                value
                field
              }
              groupNames
              count
              lastCountedAt
            }
          `
        });

        return {
          items: [...existingRefs.items, newRef],
          pagination: {
            ...existingRefs.pagination,
            total: existingRefs.pagination.total + 1,
          }
        };
      },
    },
  });

  return data.eventCaptureCreate;
};

export const eventsGroupCreate = async (input: EventGroupCreateInput): Promise<EventsGroup> => {
  const { data } = await client.mutate({
    mutation: CREATE_EVENT_GROUP_MUTATION,
    variables: { input },
  });

  cache.modify({
    id: cache.identify({ id: input.siteId, __typename: 'Site' }),
    fields: {
      eventGroups(existingRefs = []) {
        const newRef = cache.writeFragment({
          data: data.eventGroupCreate,
          fragment: gql`
            fragment NewEventsGroup on EventsGroup {
              id
              name
            }
          `
        });     

        return [...existingRefs, newRef];
      },
    },
  });

  return data.eventGroupCreate;
};

export const eventsAddToGroup = async (input: EventAddToGroupInput): Promise<EventsCaptureItem[]> => {
  const { data } = await client.mutate({
    mutation: ADD_TO_GROUP_MUTATION,
    variables: { input },
  });

  return data.eventAddToGroup;
};

export const eventsCaptureUpdate = async (input: EventCaptureUpdateInput): Promise<EventsCaptureItem> => {
  const { data } = await client.mutate({
    mutation: UPDATE_EVENT_CAPTURE_MUTATION,
    variables: { input },
  });

  return data.eventCaptureUpdate;
};

export const routesUpdate = async (input: SitesRoutesUpdateInput): Promise<Site> => {
  const { data } = await client.mutate({
    mutation: ROUTES_UPDATE_MUTATION,
    variables: { input },
  });

  return data.routesUpdate;
};

export const referralDelete = async (input: UsersReferralDeleteInput): Promise<void> => {
  await client.mutate({
    mutation: USER_REFERRAL_DELETE_MUTATION,
    variables: { input },
    update(cache) {
      const normalizedId = cache.identify({ id: input.id, __typename: 'UsersReferral' });
      cache.evict({ id: normalizedId });
      cache.gc();
    }
  });

  return null;
};

export const adminReferralDelete = async (input: AdminReferralDeleteInput): Promise<void> => {
  await client.mutate({
    mutation: ADMIN_REFERRAL_DELETE_MUTATION,
    variables: { input },
    update(cache) {
      const normalizedId = cache.identify({ id: input.id, __typename: 'UsersReferral' });
      cache.evict({ id: normalizedId });
      cache.gc();
    }
  });

  return null;
};

export const adminPartnerCreate = async (input: AdminUserPartnerCreateInput): Promise<void> => {
  await client.mutate({
    mutation: ADMIN_USER_PARTNER_CREATE_MUTATION,
    variables: { input },
  });

  return null;
};

export const adminPartnerInvoiceUpdate = async (input: AdminPartnerInvoiceUpdateInput): Promise<void> => {
  await client.mutate({
    mutation: ADMIN_PARTNER_INVOICE_UPDATE,
    variables: { input },
  });

  return null;
};

export const referralCreate = async (partnerId: string, input: UsersReferralCreateInput): Promise<UsersReferral> => {
  const { data } = await client.mutate({
    mutation: USER_CREATE_REFERRAL_MUTATION,
    variables: { input },
  });

  cache.modify({
    id: cache.identify({ id: partnerId, __typename: 'UsersPartner' }),
    fields: {
      referrals(existingRefs = []) {
        const newRef = cache.writeFragment({
          data: data.userReferralCreate,
          fragment: gql`
            fragment NewUserReferral on UserReferral {
              id
              url
            }
          `
        });     

        return [...existingRefs, newRef];
      },
    },
  });

  return data.userReferralCreate;
};

export const invoiceCreate = async (partnerId: string, input: UsersInvoiceCreateInput): Promise<UsersInvoice> => {
  const { data } = await client.mutate({
    mutation: USER_CREATE_INVOICE_MUTATION,
    variables: { input },
  });

  cache.modify({
    id: cache.identify({ id: partnerId, __typename: 'UsersPartner' }),
    fields: {
      invoices(existingRefs = []) {
        const newRef = cache.writeFragment({
          data: data.userInvoiceCreate,
          fragment: gql`
            fragment NewUserInvoice on UserInvoice {
              id
              currency
              dueAt
              filename
              invoiceUrl
              issuedAt
              paidAt
              status
            }
          `
        });     

        return [...existingRefs, newRef];
      },
    },
  });

  return data.userInvoiceCreate;
};

export const invoiceDelete = async (input: UsersInvoiceDeleteInput): Promise<void> => {
  await client.mutate({
    mutation: USER_DELETE_INVOICE_MUTATION,
    variables: { input },
    update(cache) {
      const normalizedId = cache.identify({ id: input.id, __typename: 'UsersInvoice' });
      cache.evict({ id: normalizedId });
      cache.gc();
    }
  });

  return null;
};

export const generateApiKey = async (input: SitesApiKeyCreateInput): Promise<Site> => {
  const { data } = await client.mutate({
    mutation: SITE_API_KEY_CREATE,
    variables: { input },
  });

  return data.apiKeyCreate;
};

export const createDataExport = async (input: DataExportCreateInput): Promise<Site> => {
  const { data } = await client.mutate({
    mutation: SITE_DATA_EXPORT_CREATE,
    variables: { input },
  });

  cache.modify({
    id: cache.identify({ id: input.siteId, __typename: 'Site' }),
    fields: {
      dataExports(existingDataExports = []) {
        return [{ _ref: `DataExport:${data.id}` }, ...existingDataExports];
      },
    },
  });

  return data.dataExportCreate;
};

export const deleteDataExport = async (input: DataExportDeleteInput): Promise<void> => {
  await client.mutate({
    mutation: SITE_DATA_EXPORT_DELETE,
    variables: { input },
    update(cache) {
      const normalizedId = cache.identify({ id: input.dataExportId, __typename: 'DataExport' });
      cache.evict({ id: normalizedId });
      cache.gc();
    }
  });

  return null;
};
