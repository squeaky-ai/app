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

const getSlug = (args: Pick<BlogInput, 'title' | 'category'>) => {
  const category = args.category
    .trim()
    .toLowerCase();

  const title = args.title
    .trim()
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^a-z-]/g, '')

  return `/${category}/${title}`;
};

export const exportBlogPost = (input: BlogInput): Omit<BlogPost, 'id'> => ({
  title: input.title.trim(),
  tags: input.tags.split(',').map(part => part.trim()).filter(part => !!part),
  author: getAuthorByKey(input.author),
  category: input.category.trim(),
  draft: input.draft,
  metaDescription: input.metaDescription.trim(),
  metaImage: `https://cdn.squeaky.ai/${input.metaImage}`,
  body: input.body,
  slug: getSlug(input),
  createdAt: `${input.date}T${input.time}:00Z`,
  updatedAt: `${input.date}T${input.time}:00Z`,
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

const splitDateString = (date = new Date()): [string, string] => {
  const parts = date.toLocaleString().split(', ');

  return [
    parts[0].split('/').reverse().join('-'),
    parts[1].slice(0, 5),
  ];
};

export const getInitialValues = (post: BlogPost): BlogInput => {
  if (!post) {
    const [dateString, timeString] = splitDateString();

    return {
      title: '',
      tags: '',
      author: 'chris',
      category: '',
      date: dateString,
      time: timeString,
      draft: true,
      metaImage: '',
      metaDescription: '',
      body: '<p>Hello world</p>',
    };
  };

  const [dateString, timeString] = splitDateString(new Date(post.createdAt));

  return {
    title: post.title,
    tags: post.tags.join(', '),
    author: getAuthorKey(post.author),
    category: post.category,
    date: dateString,
    time: timeString,
    draft: post.draft,
    metaImage: post.metaImage.replace('https://cdn.squeaky.ai/', ''),
    metaDescription: post.metaDescription,
    body: post.body,
  }
};