import { uniq } from 'lodash';
import { ApolloClient, InMemoryCache, TypedDocumentNode, gql } from '@apollo/client';

import {
  Query,
  FeedbackUpdateInput,
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
  UsersCommunication,
  UsersCommunicationInput,
  NpsDeleteInput,
  SentimentDeleteInput,
  BlogPost,
  AdminBlogPostDeleteInput,
  AdminUserDeleteInput,
  SitesMagicErasureUpdateInput,
  SitesCssSelectorBlacklistCreateInput,
  SitesCssSelectorBlacklistDeleteInput,
  AdminSitePlanUpdateInput,
  AdminSiteAssociateCustomerInput,
  AnonymiseFormInputsUpdateInput,
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
  ANONYMISE_FORM_INPUTS_UPDATE_MUTATION,
  ADMIN_SITE_PLAN_UPDATE_MUTATION,
  ADMIN_SITE_ASSOCIATE_CUSTOMER_MUTATION,
} from 'data/sites/mutations';

import {
  TeamInviteInput,
  TeamInviteCancelInput, 
  TeamInviteResendInput,
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
  ADMIN_USER_DELETE_MUTATION,
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
    }
  }
});

export const client = new ApolloClient({
  cache,
  uri: '/api/graphql',
  ssrMode: typeof window === 'undefined',
});

export const getGqlString = (document: TypedDocumentNode): string => (
  document.loc?.source?.body
);

export const createSite = async (name: string, url: string): Promise<Site> => {
  const { data } = await client.mutate({
    mutation: CREATE_SITE_MUTATION,
    variables: { input: { name, url } },
  });

  const { sites } = cache.readQuery<Query>({ query: GET_SITES_QUERY });

  cache.writeQuery({
    query: GET_SITES_QUERY,
    data: { sites: [...sites, data.siteCreate] }
  });

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

export const anonymiseFormInputsUpdate = async (input: AnonymiseFormInputsUpdateInput): Promise<Site> => {
  const { data } = await client.mutate({
    mutation: ANONYMISE_FORM_INPUTS_UPDATE_MUTATION,
    variables: { input }
  });

  return data.anonymiseFormInputs;
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
