import { format } from 'date-fns';
import { formatStringForUrlSlug } from 'lib/text';
import { ChangelogInput } from 'types/admin';
import { ChangelogPost } from 'types/graphql';
import { getAuthorByKey, getAuthorKey } from 'lib/admin/common';

export const defaultBody = `<h2>New Features</h2>

<ul>
  <li> </li>
  <li> </li>
  <li> </li>
</ul>

<h2>Updates & Improvements</h2>

<ul>
  <li> </li>
  <li> </li>
  <li> </li>
</ul>

<h2>Bug Fixes</h2>

<ul>
  <li> </li>
  <li> </li>
  <li> </li>
</ul>
`;


const getSlug = (args: Pick<ChangelogInput, 'title'>) => {
  const title = formatStringForUrlSlug(args.title);

  return `/${title}`;
};

export const exportChangelogPost = (input: ChangelogInput): Omit<ChangelogPost, 'id' | 'createdAt' | 'updatedAt'> => ({
  title: input.title.trim(),
  author: getAuthorByKey(input.author),
  draft: input.draft,
  metaDescription: input.metaDescription.trim(),
  metaImage: `https://cdn.squeaky.ai/${input.metaImage}`,
  body: input.body,
  slug: getSlug(input),
});

export const getInitialValues = (post: ChangelogPost): ChangelogInput => {
  if (!post) {
    return {
      title: format(new Date(), 'LLLL do, uuuu'),
      author: 'chris',
      draft: true,
      metaImage: '',
      metaDescription: '',
      body: defaultBody,
    };
  };

  return {
    title: post.title,
    author: getAuthorKey(post.author),
    draft: post.draft,
    metaImage: post.metaImage.replace('https://cdn.squeaky.ai/', ''),
    metaDescription: post.metaDescription,
    body: post.body,
  };
};