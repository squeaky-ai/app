import { gql } from '@apollo/client';

export const ADMIN_BLOG_POST_CREATE_MUTATION = gql`
  mutation AdminBlogPostCreate($input: AdminBlogPostCreateInput!) {
    adminBlogPostCreate(input: $input) {
      id
      title
      tags
      author {
        name
        image
      }
      category
      draft
      metaImage
      metaDescription
      slug
      body
      createdAt
      updatedAt
    }
  }
`;

export const ADMIN_BLOG_POST_UPDATE_MUTATION = gql`
  mutation AdminBlogPostUpdate($input: AdminBlogPostUpdateInput!) {
    adminBlogPostUpdate(input: $input) {
      id
      title
      tags
      author {
        name
        image
      }
      category
      draft
      metaImage
      metaDescription
      slug
      body
      createdAt
      updatedAt
    }
  }
`;

export const ADMIN_BLOG_POST_DELETE_MUTATION = gql`
   mutation AdminBlogPostDelete($input: AdminBlogPostDeleteInput!) {
    adminBlogPostDelete(input: $input) {
      id
    }
  }
`;
