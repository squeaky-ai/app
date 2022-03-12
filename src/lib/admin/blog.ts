import { BlogInput, BlogOutput } from 'types/admin';

const getAuthor = (author: BlogInput['author']) => {
  switch(author) {
    case 'lewis':
      return {
        name: 'Lewis Monteith',
        image: 'https://squeaky.ai/stallions/lewis.webp'
      };
    case 'chris':
      return {
        name: 'Chris Pattison',
        image: 'https://squeaky.ai/stallions/chris.webp'
      };
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

export const exportBlogMeta = (input: BlogInput): BlogOutput => ({
  title: input.title.trim(),
  tags: input.tags.split(',').map(part => part.trim()).filter(part => !!part),
  author: getAuthor(input.author),
  category: input.category.trim(),
  date: `${input.date}T${input.time}:00Z`,
  draft: input.draft,
  metaDescription: input.metaDescription.trim(),
  metaImage: input.metaImage,
  body: input.body,
  slug: getSlug(input),
});
