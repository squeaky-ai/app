import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { PageLoading } from 'components/sites/page-loading';
import { Main } from 'components/main';
import { useBlogPost } from 'hooks/use-blog-post';
import { ServerSideProps, getServerSideProps } from 'lib/auth';
import { BlogEdit } from 'components/admin/blog-edit';
import { Button } from 'components/button';
import { Icon } from 'components/icon';
import { BreadCrumbs } from 'components/admin/breadcrumbs';
import { updateBlogPost } from 'lib/api/graphql';
import { getAuthorKey } from 'lib/admin/common';
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

  const handleToggleStatus = () => {
    const { __typename, createdAt, updatedAt, ...rest } = post.blogPost;
    handleUpdate({ ...rest, draft: !post.blogPost.draft });
  };

  return (
    <>
      <Head>
        <title>Squeaky | Admin | Edit Blog Post</title>
      </Head>

      <Main>
        <BreadCrumbs items={[{ name: 'Admin', href: '/__admin/dashboard' }, { name: 'Blog', href: '/__admin/blog' }, { name: 'Edit' }]} />

        <h4 className='title'>
          Edit Post

          {post.blogPost && (
            <Button type='button' className='icon publish-status' onClick={handleToggleStatus}>
              <Icon name={post.blogPost.draft ? 'eye-off-line' : 'eye-line'} />
              Status: <span>{post.blogPost.draft ? 'Unpublished' : 'Published'}</span>
            </Button>
          )}
        </h4>

        {loading && (
          <PageLoading />
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
