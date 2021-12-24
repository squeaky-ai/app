import { ApolloClient, InMemoryCache } from '@apollo/client';

import {
  Query,
  FeedbackUpdateInput,
  NotesCreateInput,
  NotesDeleteInput,
  NotesUpdateInput,
  RecordingsBookmarkedInput,
  RecordingsDeleteBulkInput,
  RecordingsDeleteInput,
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
  FEEDBACK_UPDATE_MUTATION,
} from 'data/feedback/mutations';

import { 
  VISITOR_STARRED_MUTATION,
  VISITOR_DELETE_MUTATION,
} from 'data/visitors/mutations';

export const cache = new InMemoryCache();

export const client = new ApolloClient({
  cache,
  uri: '/api/graphql',
  ssrMode: typeof window === 'undefined',
});

// Done
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

// Done
export const updateSite = async (input: SitesUpdateInput): Promise<Site> => {
  const { data } = await client.mutate({
    mutation: UPDATE_SITE_MUTATION,
    variables: { input }
  });

  return data.siteUpdate;
};

// Done
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

// Done
export const verifySite = async (input: SitesVerifyInput): Promise<Site> => {
  const { data } = await client.mutate({
    mutation: VERIFY_SITE_MUTATION,
    variables: { input }
  });

  return data.siteVerify;
};

// Done
export const ipBlacklistCreate = async (input: SitesIpBlacklistCreateInput): Promise<Site> => {
  const { data } = await client.mutate({
    mutation: CREATE_IP_BLACKLIST_MUTATION,
    variables: { input }
  });

  return data.ipBlacklist;
};

// Done
export const ipBlacklistDelete = async (input: SitesIpBlacklistDeleteInput): Promise<Site> => {
  const { data } = await client.mutate({
    mutation: DELETE_IP_BLACKLIST_MUTATION,
    variables: { input }
  });

  return data.ipBlacklist;
};

// Done
export const domainBlacklistCreate = async (input: SitesDomainBlacklistCreateInput): Promise<Site> => {
  const { data } = await client.mutate({
    mutation: CREATE_DOMAIN_BLACKLIST_MUTATION,
    variables: { input }
  });

  return data.domainBlacklist;
};

// Done
export const domainBlacklistDelete = async (input: SitesDomainBlacklistDeleteInput): Promise<Site> => {
  const { data } = await client.mutate({
    mutation: DELETE_DOMAIN_BLACKLIST_MUTATION,
    variables: { input }
  });

  return data.domainBlacklist;
};

// Done
export const updateUser = async (input: UsersUpdateInput): Promise<User> => {
  const { data } = await client.mutate({
    mutation: UPDATE_USER_MUTATION,
    variables: { input }
  });

  return data.userUpdate;
};

// Done
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

// Done
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

// Done
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

// Done
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

// Done
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

// Done
export const tagCreate = async (input: TagsCreateInput): Promise<Tag> => {
  const { data } = await client.mutate({
    mutation: CREATE_TAG_MUTATION,
    variables: input
  });

  cache.modify({
    id: cache.identify({ id: input.recordingId, __typename: 'Recording' }),
    fields: {
      tags(existingTagRefs = []) {
        return [{ _ref: `Tag:${data.id}` }, ...existingTagRefs];
      },
    },
  });

  return data.tagCreate;
};

// Done
export const tagRemove = async (input: TagsRemoveInput): Promise<null> => {
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

// Done
export const tagDelete = async (input: TagsDeleteInput): Promise<null> => {
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

// Done
export const tagsDelete = async (input: TagsDeleteBulkInput): Promise<null> => {
  const { data } = await client.mutate({
    mutation: DELETE_TAGS_MUTATION,
    variables: input,
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

// Done
export const tagUpdate = async (input: TagsUpdateInput): Promise<Tag> => {
  const { data } = await client.mutate({
    mutation: UPDATE_TAG_MUTATION,
    variables: input
  });

  return data.tagUpdate;
};

// Done
export const noteCreate = async (input: NotesCreateInput): Promise<Note> => {
  const { data } = await client.mutate({
    mutation: CREATE_NOTE_MUTATION,
    variables: input
  });

  cache.modify({
    id: cache.identify({ id: input.recordingId, __typename: 'Recording' }),
    fields: {
      notes(existingNoteRefs = []) {
        return [{ _ref: `Note:${data.id}` }, ...existingNoteRefs];
      },
    },
  });

  return data.noteCreate;
};

// Done
export const noteDelete = async (input: NotesDeleteInput): Promise<null> => {
  const { data } = await client.mutate({
    mutation: DELETE_NOTE_MUTATION,
    variables: input,
    update(cache) {
      const normalizedId = cache.identify({ id: input.noteId, __typename: 'Note' });
      cache.evict({ id: normalizedId });
      cache.gc();
    }
  });

  return data.noteDelete;
};

// Done
export const noteUpdate = async (input: NotesUpdateInput): Promise<Note> => {
  const { data } = await client.mutate({
    mutation: UPDATE_NOTE_MUTATION,
    variables: input
  });

  return data.noteUpdate;
};

// Done
export const recordingViewed = async (input: RecordingsViewedInput): Promise<Recording> => {
  const { data } = await client.mutate({
    mutation: VIEWED_RECORDING_MUTATION,
    variables: { input }
  });

  return data.recordingViewed;
};

// Done
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

// Done
export const recordingBookmarked = async (input: RecordingsBookmarkedInput): Promise<Recording> => {
  const { data } = await client.mutate({
    mutation: BOOKMARK_RECORDING_MUTATION,
    variables: { input }
  });

  return data.recordingBookmarked;
};

// Done
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

// Done
export const recordingsViewed = async (input: RecordingsViewedBulkInput): Promise<Recording[]> => {
  const { data } = await client.mutate({
    mutation: VIEWED_RECORDINGS_MUTATION,
    variables: { input }
  });

  return data.recordingsViewed;
};

// Done
export const visitorStarred = async (input: VisitorsStarredInput): Promise<Visitor> => {
  const { data } = await client.mutate({
    mutation: VISITOR_STARRED_MUTATION,
    variables: input
  });

  return data.visitorStarred;
};

// Done
export const feedbackUpdate = async (input: FeedbackUpdateInput): Promise<Feedback> => {
  const { data } = await client.mutate({
    mutation: FEEDBACK_UPDATE_MUTATION,
    variables: { input }
  });

  return data.feedback;
};

// Done
export const visitorDelete = async (input: VisitorsDeleteInput): Promise<null> => {
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
