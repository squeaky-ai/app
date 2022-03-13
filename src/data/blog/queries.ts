import { gql } from '@apollo/client';

export const GET_BLOG_POSTS_QUERY = gql`
  query GetBlogPosts { 
    blogPosts {
      categories
      tags
      posts {
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
  }
`;

export const GET_BLOG_POST_QUERY = gql`
  query GetBlogPost($slug: String!) { 
    blogImagesAdmin
    blogPost(slug: $slug) {      
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
