import { gql } from '@apollo/client';

export const ADMIN_CHANGELOG_POST_CREATE_MUTATION = gql`
  mutation AdminChangelogPostCreate($input: AdminChangelogPostCreateInput!) {
    adminChangelogPostCreate(input: $input) {
      id
      title
      author {
        name
        image
      }
      draft
      metaImage
      metaDescription
      slug
      body
      createdAt {
        iso8601
        niceDateTime
      }
      updatedAt {
        iso8601
        niceDateTime
      }
    }
  }
`;

export const ADMIN_CHANGELOG_POST_UPDATE_MUTATION = gql`
  mutation AdminChangelogPostUpdate($input: AdminChangelogPostUpdateInput!) {
    adminChangelogPostUpdate(input: $input) {
      id
      title
      author {
        name
        image
      }
      draft
      metaImage
      metaDescription
      slug
      body
    }
  }
`;

export const ADMIN_CHANGELOG_POST_DELETE_MUTATION = gql`
   mutation AdminChangelogPostDelete($input: AdminChangelogPostDeleteInput!) {
    adminChangelogPostDelete(input: $input) {
      id
    }
  }
`;
