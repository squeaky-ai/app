import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Spinner } from 'components/spinner';
import { Page } from 'components/admin/page';
import { Icon } from 'components/icon';
import { BlogEdit } from 'components/admin/blog-edit';
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

  const handleCreate = async (post: Omit<BlogPost, 'id'>) => {
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


      <Page tab='blog'>
        {() => (
          <>
            <div className='posts-header'>
              <Link href='/__admin/blog'>
                <a className='back'><Icon name='arrow-left-line' /> All Posts</a>
              </Link>
            </div>

            {loading && (
              <Spinner />
            )}

            {!loading && (
              <BlogEdit
                images={admin.blogImagesAdmin}
                refetchImages={refetch}
                onChange={handleCreate}
              />
            )}
          </>
        )}
      </Page>
    </>
  );
};

export default AdminBlogCreate;
export { getServerSideProps };
