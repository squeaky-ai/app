import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { PageLoading } from 'components/sites/page-loading';
import { Main } from 'components/main';
import { useChangelogPost } from 'hooks/use-changelog-post';
import { PageProps } from 'types/page';
import { ChangelogEdit } from 'components/admin/changelog-edit';
import { Button } from 'components/button';
import { Icon } from 'components/icon';
import { BreadCrumbs } from 'components/admin/breadcrumbs';
import { updateChangelogPost } from 'lib/api/graphql';
import { getAuthorKey } from 'lib/admin/common';
import { useToasts } from 'hooks/use-toasts';
import type { ChangelogPost } from 'types/graphql';

const AdminChangelogEdit: NextPage<PageProps> = () => {
  const toasts = useToasts();

  const { post, loading, refetch } = useChangelogPost();

  const handleUpdate = async (post: Omit<ChangelogPost, 'createdAt' | 'updatedAt'>) => {
    try {
      await updateChangelogPost({ ...post, author: getAuthorKey(post.author) });
      toasts.add({ type: 'success', body: 'Changelog post updated' });
    } catch(error) {
      console.error(error);
      toasts.add({ type: 'error', body: 'Failed to update changelog post' });
    }
  };

  const handleToggleStatus = () => {
    const { __typename, createdAt, updatedAt, ...rest } = post.changelogPost;
    handleUpdate({ ...rest, draft: !post.changelogPost.draft });
  };

  return (
    <>
      <Head>
        <title>Squeaky | Admin | Edit Blog Post</title>
      </Head>

      <Main>
        <BreadCrumbs items={[{ name: 'Admin', href: '/__admin/dashboard' }, { name: 'Changelog', href: '/__admin/changelog' }, { name: 'Edit' }]} />

        <h4 className='title'>
          Edit Post

          {post.changelogPost && (
            <Button type='button' className='icon publish-status' onClick={handleToggleStatus}>
              <Icon name={post.changelogPost.draft ? 'eye-off-line' : 'eye-line'} />
              Status: <span>{post.changelogPost.draft ? 'Unpublished' : 'Published'}</span>
            </Button>
          )}
        </h4>

        {loading && (
          <PageLoading />
        )}

        {!loading && !post.changelogPost && (
          <p>Post not found</p>
        )}

        {!loading && post.changelogPost && (
          <>
            <ChangelogEdit
              post={post.changelogPost}
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

export default AdminChangelogEdit;
