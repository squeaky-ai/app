import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { Main } from 'components/main';
import { TableWrapper, Table, Row, Cell } from 'components/table';
import { PageLoading } from 'components/sites/page-loading';
import { BlogPostRow } from 'components/admin/blog-post-row';
import { useBlogPosts } from 'hooks/use-blog-posts';
import { BreadCrumbs } from 'components/admin/breadcrumbs';
import { ServerSideProps, getServerSideProps } from 'lib/auth';

const AdminBlog: NextPage<ServerSideProps> = () => {
  const { posts, loading } = useBlogPosts();

  return (
    <>
      <Head>
        <title>Squeaky | Admin | Blog</title>
      </Head>

      <Main>
        <BreadCrumbs items={[{ name: 'Admin', href: '/__admin/dashboard' }, { name: 'Blog' }]} />

        <div className='admin-header'>
          <div className='search'>
            <h4 className='title'>
              Blog
              <Link href='/__admin/blog/create' className='button link'>
                + New Post
              </Link>
            </h4>
          </div>
        </div>

        {loading && (
          <PageLoading />
        )}

        {!loading && (
          <>
            <TableWrapper>
              <Table className='posts-table'>
                <Row className='head'>
                  <Cell>ID</Cell>
                  <Cell>Title</Cell>
                  <Cell>Category</Cell>
                  <Cell>Tags</Cell>
                  <Cell>Author</Cell>
                  <Cell>Draft</Cell>
                  <Cell>Created At</Cell>
                  <Cell>Updated At</Cell>
                  <Cell />
                </Row>
                {posts.posts.map(post => (
                  <BlogPostRow key={post.id} post={post} />
                ))}
              </Table>
            </TableWrapper>
          </>
        )}
      </Main>
    </>
  );
};

export default AdminBlog;
export { getServerSideProps };
