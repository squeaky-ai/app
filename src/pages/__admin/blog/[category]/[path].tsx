import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { Spinner } from 'components/spinner';
import { Page } from 'components/admin/page';
import { Icon } from 'components/icon';
import { useBlogPost } from 'hooks/use-blog-post';
import { ServerSideProps, getServerSideProps } from 'lib/auth';
import { BlogEdit } from 'components/admin/blog-edit';
import { BlogDelete } from 'components/admin/blog-delete';
import { updateBlogPost } from 'lib/api/graphql';
import { getAuthorKey } from 'lib/admin/blog';
import { useToasts } from 'hooks/use-toasts';
import type { BlogPost } from 'types/graphql';

const AdminBlogEdit: NextPage<ServerSideProps> = () => {
  const toasts = useToasts();

  const { post, loading, refetch } = useBlogPost();

  const handleUpdate = async (post: BlogPost) => {
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

      <Page tab='blog'>
        {() => (
          <>
            <div className='posts-header'>
              <Link href='/__admin/blog'>
                <a className='back'><Icon name='arrow-left-line' /> All Posts</a>
              </Link>

              <BlogDelete id={post.blogPost?.id} />
            </div>

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
                  images={post.blogImagesAdmin}
                  onChange={handleUpdate}
                  refetchImages={refetch}
                />
              </>
            )}
          </>
        )}
      </Page>
    </>
  );
};

export default AdminBlogEdit;
export { getServerSideProps };
