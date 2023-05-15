import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import getConfig from 'next/config';
import { Main } from 'components/main';
import { BreadCrumbs } from 'components/admin/breadcrumbs';
import { PageLoading } from 'components/sites/page-loading';
import { ServerSideProps, getServerSideProps } from 'lib/auth';
import { Button } from 'components/button';
import { Tag } from 'components/tag';
import { Container } from 'components/container';
import { Input } from 'components/input';
import { Error } from 'components/error';
import { Cell, Row, Table, TableWrapper } from 'components/table';
import { useAdminAdTracking } from 'hooks/use-admin-ad-tracking';

const { publicRuntimeConfig } = getConfig();

const AdminAdTracking: NextPage<ServerSideProps> = () => {
  const [contentId, setContentId] = React.useState<string>('');
  const [utmContentIds, setUtmContentIds] = React.useState<string[]>([]);

  const { adTracking, error, loading } = useAdminAdTracking({ utmContentIds });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setUtmContentIds([...utmContentIds,contentId]);
    setContentId('');
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContentId(event.target.value);
  };

  const handleUtmContentRemove = (contentId: string) => () => {
    setUtmContentIds(utmContentIds.filter(u => u !== contentId));
  };

  if (error) {
    return <Error />;
  }

  return (
    <>
      <Head>
        <title>Squeaky | Admin | Ad Tracking</title>
      </Head>

      <Main>
        <BreadCrumbs items={[{ name: 'Admin', href: '/__admin/dashboard' }, { name: 'Ad Tracking' } ]} />

        <div className='admin-header'>
          <div className='search'>
            <h4 className='title'>
              Ad Tracking
            </h4>
          </div>
        </div>

        {loading && (
          <PageLoading />
        )}

        {!loading && adTracking.length > 0 && (
          <Container>
            <form className='content-id-form' onSubmit={handleSubmit}>
              {utmContentIds.map(contentId => (
                <Tag key={contentId} handleDelete={handleUtmContentRemove(contentId)}>
                  {contentId}
                </Tag>
              ))}
              <Input value={contentId} onChange={handleChange} />
              <Button className='primary' type='submit' disabled={!contentId}>
                Add
              </Button>
            </form>

            {adTracking.length > 0 && (
              <TableWrapper>
                <Table className='ad-tracking-table'>
                  <Row className='head'>
                    <Cell>
                      Visitor ID
                    </Cell>
                    <Cell>
                      User ID
                    </Cell>
                    <Cell>
                      User Name
                    </Cell>
                    <Cell>
                      User Created At
                    </Cell>
                    <Cell>
                      Site ID
                    </Cell>
                    <Cell>
                      Site Name
                    </Cell>
                    <Cell>
                      Site Plan
                    </Cell>
                    <Cell>
                      Site Created At
                    </Cell>
                    <Cell>
                      Site Verified At
                    </Cell>
                    <Cell>
                      UTM Content
                    </Cell>
                  </Row>
                  {adTracking.map((a, index) => (
                    <Row key={`${a.visitorId}-${index}`}>
                      <Cell>
                        <Link href={`/sites/${publicRuntimeConfig.squeakySiteId}/visitors/${a.visitorId}`}>{a.visitorId}</Link>
                      </Cell>
                      <Cell>
                        {a.userId
                          ? <Link href={`/__admin/users/${a.userId}`}>{a.userId}</Link>
                          : '-'
                        }
                      </Cell>
                      <Cell>
                        {a.userName || '-'}
                      </Cell>
                      <Cell>
                        {a.userCreatedAt?.niceDateTime || '-'}
                      </Cell>
                      <Cell>
                        {a.siteId
                          ? <Link href={`/__admin/sites/${a.siteId}`}>{a.siteId}</Link>
                          : '-'
                        }
                      </Cell>
                      <Cell>
                        {a.siteName || '-'}
                      </Cell>
                      <Cell>
                        {a.sitePlanName || '-'}
                      </Cell>
                      <Cell>
                        {a.siteCreatedAt?.niceDateTime || '-'}
                      </Cell>
                      <Cell>
                        {a.siteVerifiedAt?.niceDateTime || '-'}
                      </Cell>
                      <Cell>
                        {a.utmContent}
                      </Cell>
                    </Row>
                  ))}
                </Table>
              </TableWrapper>
            )}
          </Container>
        )} 
      </Main>
    </>
  );
};

export default AdminAdTracking;
export { getServerSideProps };
