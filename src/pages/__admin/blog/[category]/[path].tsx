import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Spinner } from 'components/spinner';
import { Main } from 'components/main';
import { useBlogPost } from 'hooks/use-blog-post';
import { ServerSideProps, getServerSideProps } from 'lib/auth';
import { BlogEdit } from 'components/admin/blog-edit';
import { BreadCrumbs } from 'components/admin/breadcrumbs';
import { updateBlogPost } from 'lib/api/graphql';
import { getAuthorKey } from 'lib/admin/blog';
import { useToasts } from 'hooks/use-toasts';
import type { BlogPost } from 'types/graphql';

const AdminBlogEdit: NextPage<ServerSideProps> = () => {
  const toasts = useToasts();

  const { post, loading, refetch } = useBlogPost();

  const handleUpdate = async (post: Omit<BlogPost, 'createdAt' | 'updatedAt'>) => {
    try {
      await updateBlogPost({ ...post, author: getAuthorKey(post.author) });
      toasts.add({ type: 'success', body: 'Blog post updated' });
    } catch(error) {
      console.error(error);
      toasts.add({ type: 'error', body: 'Failed to update blog post' });
    }
  };

  return (
    <>
      <Head>
        <title>Squeaky | Admin | Edit Blog Post</title>
      </Head>

      <Main>
        <BreadCrumbs items={[{ name: 'Admin', href: '/__admin/dashboard' }, { name: 'Blog', href: '/__admin/blog' }, { name: 'Edit' }]} />

        <h3 className='title'>
          Edit Post
        </h3>

        {loading && (
          <Spinner />
        )}

        {!loading && !post.blogPost && (
          <p>Post not found</p>
        )}

        {!loading && post.blogPost && (
          <>
            <BlogEdit
              post={post.blogPost}
              images={post.admin.blogImages}
              onChange={handleUpdate}
              refetchImages={refetch}
            />
          </>
        )}
      </Main>
    </>
  );
};

export default AdminBlogEdit;
export { getServerSideProps };
