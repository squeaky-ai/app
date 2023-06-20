import { formatStringForUrlSlug } from 'lib/text';
import { getAuthorByKey, getAuthorKey } from 'lib/admin/common';
import { BlogInput } from 'types/admin';
import { BlogPost } from 'types/graphql';

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
  coveringEnabled: input.coveringEnabled,
});

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
      coveringEnabled: true,
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
    coveringEnabled: post.coveringEnabled,
  }
};