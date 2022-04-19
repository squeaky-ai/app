import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { Main } from 'components/main';
import { Pill } from 'components/pill';
import { TableWrapper, Table, Row, Cell, RowSkeleton } from 'components/table';
import { useBlogPosts } from 'hooks/use-blog-posts';
import { toNiceDate } from 'lib/dates';
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
            <h3 className='title'>
              Blog
              <Link href='/__admin/blog/create'>
                <a className='button link'>+ New Post</a>
              </Link>
            </h3>
          </div>
        </div>

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
              </Row>
              {loading && (
                <RowSkeleton count={25} />
              )}

              {!loading && posts.posts.map(post => (
                <Row key={post.slug}>
                  <Cell>{post.id}</Cell>
                  <Cell>
                    <Link href={`/__admin/blog${post.slug}`}>
                      <a>{post.title}</a>
                    </Link>
                  </Cell>
                  <Cell>{post.category}</Cell>
                  <Cell>{post.tags.join(', ')}</Cell>
                  <Cell className='author'>
                    <img src={post.author.image} height={24} width={24} />
                    {post.author.name}
                  </Cell>
                  <Cell>
                    {post.draft 
                      ? <Pill className='tertiary'>Yes</Pill>
                      : <Pill className='primary'>No</Pill>
                    }
                  </Cell>
                  <Cell>{toNiceDate(post.createdAt)}</Cell>
                  <Cell>{toNiceDate(post.updatedAt)}</Cell>
                </Row>
              ))}
            </Table>
          </TableWrapper>
        </>
      </Main>
    </>
  );
};

export default AdminBlog;
export { getServerSideProps };
