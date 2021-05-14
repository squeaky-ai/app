import Head from 'next/head';
import React from 'react';
import type { FC } from 'react';
import squeakyTheme from 'theme/squeakyTheme';

const SEO: FC<SEOProps> = ({ author, description, image, title }) => (
  <Head>
    <title>{title ? `${title} • Squeaky App` : `Squeaky App`}</title>

    {author && <meta name="author" content={author} />}
    {description && <meta name="description" content={description} />}

    <meta property="og:title" content={title ? `${title} • Squeaky App` : `Squeaky App`} />
    {description && <meta property="og:description" content={description} />}
    {image && <meta property="og:image" content={image} />}
    <meta property="og:site_name" content="Squeaky" />
    <meta property="og:type" content="website" />

    <meta name="theme-color" content={squeakyTheme.colors.default.primary} />

    <meta name="twitter:title" content={title ? `${title} • Squeaky App` : `Squeaky App`} />
    {description && <meta name="twitter:description" content={description} />}
    {image && <meta name="twitter:image" content={image} />}
    <meta name="twitter:card" content="summary_large_image" />

    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
  </Head>
);

export interface SEOProps {
  /** Adds a specific author for the current page */
  author?: string;
  /** Description to use for the SEO of the pages, and open graph */
  description?: string;
  /** Image to use for open graph */
  image?: string;
  /** Title for the page, used for pages and social media thumbnails */
  title?: string;
}

export default SEO;
