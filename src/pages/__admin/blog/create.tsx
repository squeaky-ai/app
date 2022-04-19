import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { PageLoading } from 'components/sites/page-loading';
import { Main } from 'components/main';
import { BlogEdit } from 'components/admin/blog-edit';
import { BreadCrumbs } from 'components/admin/breadcrumbs';
import { ServerSideProps, getServerSideProps } from 'lib/auth';
import { useAdminBlog } from 'hooks/use-admin-blog';
import { useToasts } from 'hooks/use-toasts';
import { getAuthorKey } from 'lib/admin/blog';
import { createBlogPost } from 'lib/api/graphql';
import type { BlogPost } from 'types/graphql';

const AdminBlogCreate: NextPage<ServerSideProps> = () => {
  const toasts = useToasts();
  const router = useRouter();

  const { admin, loading, refetch } = useAdminBlog();

  const handleCreate = async (post: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      await createBlogPost({ ...post, author: getAuthorKey(post.author) });
      toasts.add({ type: 'success', body: 'Blog post created' });
      await router.push('/__admin/blog');
    } catch(error) {
      console.error(error);
      toasts.add({ type: 'error', body: 'Failed to create blog post' });
    }
  };

  return (
    <>
      <Head>
        <title>Squeaky | Admin | Create Blog Post</title>
      </Head>

      <Main>
        <BreadCrumbs items={[{ name: 'Admin', href: '/__admin/dashboard' }, { name: 'Blog', href: '/__admin/blog' }, { name: 'Create' }]} />

        <h3 className='title'>
          Create Post
        </h3>

        {loading && (
          <PageLoading />
        )}

        {!loading && (
          <BlogEdit
            images={admin.blogImages}
            refetchImages={refetch}
            onChange={handleCreate}
          />
        )}
      </Main>
    </>
  );
};

export default AdminBlogCreate;
export { getServerSideProps };
