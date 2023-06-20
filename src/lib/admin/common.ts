import { ChangelogInput, BlogInput } from 'types/admin';
import { ChangelogPost, BlogPost } from 'types/graphql';

type Post = ChangelogPost | BlogPost;

type Input = ChangelogInput | BlogInput;

export const getAuthorByKey = (author: Input['author']) => {
  switch(author) {
    case 'lewis':
      return {
        name: 'Lewis Monteith',
        image: `https://cdn.squeaky.ai/blog/lewis.jpg`,
      };
    case 'chris':
      return {
        name: 'Chris Pattison',
        image: `https://cdn.squeaky.ai/blog/chris.jpg`,
      };
  }
};

export const getAuthorKey = (author: Post['author']): Input['author'] => {
  switch(author.name) {
    case 'Lewis Monteith':
      return 'lewis';
    case 'Chris Pattison':
      return 'chris';
    default:
      return null;
  }
};

export const uploadFile = async (
  file: File,
  createSignedLink: Function,
) => {
  const { data } = await createSignedLink({
    variables: {
      input: { filename: file.name },
    }
  });

  const form = new FormData();

  // Add the fields S3 wants
  for (const [key, value] of Object.entries(JSON.parse(data.adminBlogSignImage.fields))) {
    form.append(key, '' + value);
  }

  // Add the image
  form.append('file', file);

  await fetch(data.adminBlogSignImage.url, { 
    method: 'POST', 
    body: form,
  });
};
