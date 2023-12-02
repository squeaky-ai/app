import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { PageLoading } from 'components/sites/page-loading';
import { Main } from 'components/main';
import { ChangelogEdit } from 'components/admin/changelog-edit';
import { BreadCrumbs } from 'components/admin/breadcrumbs';
import { PageProps } from 'types/page';
import { useAdminBlog } from 'hooks/use-admin-blog';
import { useToasts } from 'hooks/use-toasts';
import { getAuthorKey } from 'lib/admin/common';
import { createChangelogPost } from 'lib/api/graphql';
import type { ChangelogPost } from 'types/graphql';

const AdminChangelogCreate: NextPage<PageProps> = () => {
  const toasts = useToasts();
  const router = useRouter();

  const { admin, loading, refetch } = useAdminBlog();

  const handleCreate = async (post: Omit<ChangelogPost, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      await createChangelogPost({ ...post, author: getAuthorKey(post.author) });
      toasts.add({ type: 'success', body: 'Blog post created' });
      await router.push('/__admin/changelog');
    } catch(error) {
      console.error(error);
      toasts.add({ type: 'error', body: 'Failed to create blog post' });
    }
  };

  return (
    <>
      <Head>
        <title>Squeaky | Admin | Create Changelog Post</title>
      </Head>

      <Main>
        <BreadCrumbs items={[{ name: 'Admin', href: '/__admin/dashboard' }, { name: 'Changelog', href: '/__admin/changelog' }, { name: 'Create' }]} />

        <h4 className='title'>
          Create Post
        </h4>

        {loading && (
          <PageLoading />
        )}

        {!loading && (
          <ChangelogEdit
            images={admin.blogImages}
            refetchImages={refetch}
            onChange={handleCreate}
          />
        )}
      </Main>
    </>
  );
};

export default AdminChangelogCreate;
