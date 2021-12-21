import { cloneDeep, uniq } from 'lodash';
import { ApolloClient, InMemoryCache } from '@apollo/client';

import {
  Query,
  FeedbackCreateInput,
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
  USER_PASSWORD_MUTATION
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
  FEEDBACK_CREATE_MUTATION, 
  FEEDBACK_UPDATE_MUTATION,
} from 'data/feedback/mutations';

import { 
  VISITOR_STARRED_MUTATION,
  VISITOR_DELETE_MUTATION,
} from 'data/visitors/mutations';

const ACCEPT_INCOMING = <E, I>(_existing: E, incoming: I[]): I[] => cloneDeep(incoming);

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        sites: { merge: ACCEPT_INCOMING },
      },
    },
    Site: {
      fields: {
        team: { merge: ACCEPT_INCOMING },
        recordings: { merge: ACCEPT_INCOMING },
        tags: { merge: ACCEPT_INCOMING },
      }
    },
    Recording: {
      fields: {
        notes: { merge: ACCEPT_INCOMING },
        tags: { merge: ACCEPT_INCOMING },
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
    Visitor: {
      merge: ACCEPT_INCOMING
    },
  }
});

export const client = new ApolloClient({
  cache,
  uri: '/api/graphql',
  ssrMode: typeof window === 'undefined',
});

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

export const updateUser = async (input: UsersUpdateInput): Promise<User> => {
  const { data } = await client.mutate({
    mutation: UPDATE_USER_MUTATION,
    variables: { input }
  });

  return data.userUpdate;
};

export const teamInvite = async (input: TeamInviteInput): Promise<Site> => {
  const { data } = await client.mutate({
    mutation: TEAM_INVITE_MUTATION,
    variables: { input }
  });

  return data.teamInvite;
};

export const teamInviteCancel = async (input: TeamInviteCancelInput): Promise<Site> => {
  const { data } = await client.mutate({
    mutation: TEAM_INVITE_CANCEL_MUTATION,
    variables: { input }
  });

  return data.teamInviteCancel;
};

export const teamInviteAccept = async (input: TeamInviteAcceptInput): Promise<Site> => {
  const { data } = await client.mutate({
    mutation: TEAM_INVITE_ACCEPT_MUTATION,
    variables: { input }
  });

  return data.teamInviteCancel;
};

export const teamInviteResend = async (input: TeamInviteResendInput): Promise<Site> => {
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

export const teamUpdate = async (input: TeamUpdateInput): Promise<Site> => {
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

export const teamDelete = async (input: TeamDeleteInput): Promise<Site> => {
  const { data } = await client.mutate({
    mutation: TEAM_DELETE_MUTATION,
    variables: { input }
  });

  return data.teamDelete;
};

export const tagCreate = async (input: TagsCreateInput): Promise<Site> => {
  const { data } = await client.mutate({
    mutation: CREATE_TAG_MUTATION,
    variables: input
  });

  return data.tagCreate;
};

export const tagRemove = async (input: TagsRemoveInput): Promise<Site> => {
  const { data } = await client.mutate({
    mutation: REMOVE_TAG_MUTATION,
    variables: input,
    update(cache) {
      const normalizedId = cache.identify({ id: input.tagId, __typename: 'Tag' });
      cache.evict({ id: normalizedId });
      cache.gc();
    }
  });

  return data.tagRemove;
};

export const tagDelete = async (input: TagsDeleteInput): Promise<Site> => {
  const { data } = await client.mutate({
    mutation: DELETE_TAG_MUTATION,
    variables: input,
    update(cache) {
      const normalizedId = cache.identify({ id: input.tagId, __typename: 'Tag' });
      cache.evict({ id: normalizedId });
      cache.gc();
    }
  });

  return data.tagDelete;
};

export const tagsDelete = async (input: TagsDeleteBulkInput): Promise<Site> => {
  const { data } = await client.mutate({
    mutation: DELETE_TAGS_MUTATION,
    variables: input
  });

  return data.tagsDelete;
};

export const tagUpdate = async (input: TagsUpdateInput): Promise<Site> => {
  const { data } = await client.mutate({
    mutation: UPDATE_TAG_MUTATION,
    variables: input
  });

  return data.tagUpdate;
};

export const noteCreate = async (input: NotesCreateInput): Promise<Site> => {
  const { data } = await client.mutate({
    mutation: CREATE_NOTE_MUTATION,
    variables: input
  });

  return data.noteCreate;
};

export const noteDelete = async (input: NotesDeleteInput): Promise<Site> => {
  const { data } = await client.mutate({
    mutation: DELETE_NOTE_MUTATION,
    variables: input
  });

  return data.noteDelete;
};

export const noteUpdate = async (input: NotesUpdateInput): Promise<Site> => {
  const { data } = await client.mutate({
    mutation: UPDATE_NOTE_MUTATION,
    variables: input
  });

  return data.noteUpdate;
};

export const recordingViewed = async (input: RecordingsViewedInput): Promise<Site> => {
  const { data } = await client.mutate({
    mutation: VIEWED_RECORDING_MUTATION,
    variables: { input }
  });

  return data.recordingViewed;
};

export const recordingDelete = async (input: RecordingsDeleteInput): Promise<Site> => {
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

export const recordingBookmarked = async (input: RecordingsBookmarkedInput): Promise<Site> => {
  const { data } = await client.mutate({
    mutation: BOOKMARK_RECORDING_MUTATION,
    variables: { input }
  });

  return data.recordingBookmarked;
};

export const recordingsDelete = async (input: RecordingsDeleteBulkInput): Promise<Site> => {
  const { data } = await client.mutate({
    mutation: DELETE_RECORDINGS_MUTATION,
    variables: { input },
    refetchQueries: [
      GET_RECORDINGS_QUERY,
    ],
  });

  return data.recordingsDelete;
};

export const recordingsViewed = async (input: RecordingsViewedBulkInput): Promise<Site> => {
  const { data } = await client.mutate({
    mutation: VIEWED_RECORDINGS_MUTATION,
    variables: { input }
  });

  return data.recordingsViewed;
};

export const feedbackCreate = async (input: FeedbackCreateInput): Promise<void> => {
  await client.mutate({
    mutation: FEEDBACK_CREATE_MUTATION,
    variables: { input }
  });
};

export const visitorStarred = async (input: VisitorsStarredInput): Promise<Site> => {
  const { data } = await client.mutate({
    mutation: VISITOR_STARRED_MUTATION,
    variables: input
  });

  return data.visitorStarred;
};

export const feedbackUpdate = async (input: FeedbackUpdateInput): Promise<Site> => {
  const { data } = await client.mutate({
    mutation: FEEDBACK_UPDATE_MUTATION,
    variables: { input }
  });

  return data.feedback;
};

export const visitorDelete = async (input: VisitorsDeleteInput): Promise<Site> => {
  const { data } = await client.mutate({
    mutation: VISITOR_DELETE_MUTATION,
    variables: input,
    update(cache) {
      const normalizedId = cache.identify({ id: input.visitorId, __typename: 'Visitor' });
      cache.evict({ id: normalizedId });
      cache.gc();
    }
  });

  return data.visitorDelete;
};
