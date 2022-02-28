import { gql } from '@apollo/client';

export const CREATE_TAG_MUTATION = gql`
  mutation TagCreate($input: TagsCreateInput!) {
    tagCreate(input: $input) {
      id
      name
    }
  }
`;

export const REMOVE_TAG_MUTATION = gql`
  mutation TagRemove($input: TagsRemoveInput!) {
    tagRemove(input: $input) {
      id
    }
  }
`;

export const DELETE_TAG_MUTATION = gql`
  mutation TagDelete($input: TagsDeleteInput!) {
    tagDelete(input: $input) {
      id
    }
  }
`;

export const DELETE_TAGS_MUTATION = gql`
  mutation TagsDelete($input: TagsDeleteBulkInput!) {
    tagsDelete(input: $input) {
      id
    }
  }
`;

export const UPDATE_TAG_MUTATION = gql`
  mutation TagUpdate($input: TagsUpdateInput!) {
    tagUpdate(input: $input) {
      id
      name
    }
  }
`;

export const CREATE_NOTE_MUTATION = gql`
  mutation NoteCreate($input: NotesCreateInput!) {
    noteCreate(input: $input) {
      id
      body
      timestamp
      user {
        fullName
      }
    }
  }
`;

export const DELETE_NOTE_MUTATION = gql`
  mutation NoteDelete($input: NotesDeleteInput!) {
    noteDelete(input: $input) {
      id
    }
  }
`;

export const UPDATE_NOTE_MUTATION = gql`
  mutation NoteUpdate($input: NotesUpdateInput!) {
    noteUpdate(input: $input) {
      id
      body
      timestamp
      user {
        fullName
      }
    }
  }
`;

export const DELETE_RECORDING_MUTATION = gql`
  mutation DeleteRecording($input: RecordingsDeleteInput!) {
    recordingDelete(input: $input) {
      id
    }
  }
`;

export const VIEWED_RECORDING_MUTATION = gql`
  mutation ViewedRecording($input: RecordingsViewedInput!) {
    recordingViewed(input: $input) {
      id
      viewed
    }
  }
`;

export const BOOKMARK_RECORDING_MUTATION = gql`
  mutation BookmarkRecording($input: RecordingsBookmarkedInput!) {
    recordingBookmarked(input: $input) {
      id
      bookmarked
    }
  }
`;

export const DELETE_RECORDINGS_MUTATION = gql`
  mutation DeletedRecordings($input: RecordingsDeleteBulkInput!) {
    recordingsDelete(input: $input) {
      id
    }
  }
`;

export const VIEWED_RECORDINGS_MUTATION = gql`
  mutation ViewedRecordings($input: RecordingsViewedBulkInput!) {
    recordingsViewed(input: $input) {
      id
      viewed
    }
  }
`;
