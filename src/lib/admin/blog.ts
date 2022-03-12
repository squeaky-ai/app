import { BlogInput, BlogOutput } from 'types/admin';

const getAuthor = (author: BlogInput['author']) => {
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
  metaImage: `https://cdn.squeaky.ai/${input.metaImage}`,
  body: input.body,
  slug: getSlug(input),
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

export const objectToYaml = (input: BlogOutput) => {
  return `---
title: ${input.title}
tags:
${input.tags.map(t => `  - ${t}`).join('\n')}
author:
  name: ${input.author.name}
  image: ${input.author.image}
category: ${input.category}
date: ${input.date}
draft: ${input.draft}
metaImage: ${input.metaImage}
metaDescription: ${input.metaDescription}
slug: ${input.slug}
---

${input.body}`;
};
