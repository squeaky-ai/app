import { BlogInput } from 'types/admin';
import { BlogPost } from 'types/graphql';

export const getAuthorByKey = (author: BlogInput['author']) => {
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

export const getAuthorKey = (author: BlogPost['author']): BlogInput['author'] => {
  switch(author.name) {
    case 'Lewis Monteith':
      return 'lewis';
    case 'Chris Pattison':
      return 'chris';
    default:
      return null;
  }
};

const formatStringForUrlSlug = (string: string) => string
  .trim()
  .toLowerCase()
  .replace(/ /g, '-')
  .replace(/[^a-z0-9-]/g, '');

const getSlug = (args: Pick<BlogInput, 'title' | 'category'>) => {
  const title = formatStringForUrlSlug(args.title);
  const category = formatStringForUrlSlug(args.category);

  return `/${category}/${title}`;
};

export const exportBlogPost = (input: BlogInput): Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'> => ({
  title: input.title.trim(),
  tags: input.tags.split(',').map(part => part.trim()).filter(part => !!part),
  author: getAuthorByKey(input.author),
  category: input.category.trim(),
  draft: input.draft,
  metaDescription: input.metaDescription.trim(),
  metaImage: `https://cdn.squeaky.ai/${input.metaImage}`,
  body: input.body,
  slug: getSlug(input),
  scripts: input.script.split(',').map(s => s.trim()).filter(s => !!s),
});

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

export const getInitialValues = (post: BlogPost): BlogInput => {
  if (!post) {
    return {
      title: '',
      tags: '',
      author: 'chris',
      category: '',
      draft: true,
      metaImage: '',
      metaDescription: '',
      body: '<p>Hello world</p>',
      script: '',
    };
  };

  return {
    title: post.title,
    tags: post.tags.join(', '),
    author: getAuthorKey(post.author),
    category: post.category,
    draft: post.draft,
    metaImage: post.metaImage.replace('https://cdn.squeaky.ai/', ''),
    metaDescription: post.metaDescription,
    body: post.body,
    script: post.scripts.join(','),
  }
};