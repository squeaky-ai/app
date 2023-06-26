import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { Main } from 'components/main';
import { TableWrapper, Table, Row, Cell } from 'components/table';
import { PageLoading } from 'components/sites/page-loading';
import { ChangelogPostRow } from 'components/admin/changelog-post-row';
import { EmptyState } from 'components/admin/empty-state';
import { useChangelogPosts } from 'hooks/use-changelog-posts';
import { BreadCrumbs } from 'components/admin/breadcrumbs';
import { ServerSideProps, getServerSideProps } from 'lib/auth';

const AdminChangelog: NextPage<ServerSideProps> = () => {
  const { posts, loading } = useChangelogPosts();

  return (
    <>
      <Head>
        <title>Squeaky | Admin | Changelog</title>
      </Head>

      <Main>
        <BreadCrumbs items={[{ name: 'Admin', href: '/__admin/dashboard' }, { name: 'Changelog' }]} />

        <div className='admin-header'>
          <div className='search'>
            <h4 className='title'>
              Changelog
              <Link href='/__admin/changelog/create' className='button link'>
                + New Post
              </Link>
            </h4>
          </div>
        </div>

        {loading && (
          <PageLoading />
        )}

        {!loading && posts.length === 0 && (
          <EmptyState 
            illustration='illustration-12' 
            title='Where are the changes?!' 
          />
        )}

        {!loading && posts.length > 0 && (
          <>
            <TableWrapper>
              <Table className='posts-table'>
                <Row className='head'>
                  <Cell>ID</Cell>
                  <Cell>Title</Cell>
                  <Cell>Author</Cell>
                  <Cell>Draft</Cell>
                  <Cell>Created At</Cell>
                  <Cell>Updated At</Cell>
                  <Cell />
                </Row>
                {posts.map(post => (
                  <ChangelogPostRow key={post.id} post={post} />
                ))}
              </Table>
            </TableWrapper>
          </>
        )}
      </Main>
    </>
  );
};

export default AdminChangelog;
export { getServerSideProps };
