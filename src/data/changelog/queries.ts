import { gql } from '@apollo/client';

export const GET_CHANGELOG_POSTS_QUERY = gql`
  query GetChangelogPosts { 
    changelogPosts {
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

export const GET_CHANGELOG_POST_QUERY = gql`
  query GetChangelogPost($slug: String!) { 
    admin {
      blogImages
    }
    changelogPost(slug: $slug) {      
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
