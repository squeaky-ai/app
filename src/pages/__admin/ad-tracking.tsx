import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import getConfig from 'next/config';
import { useLazyQuery } from '@apollo/client';
import { Main } from 'components/main';
import { BreadCrumbs } from 'components/admin/breadcrumbs';
import { PageLoading } from 'components/sites/page-loading';
import { ServerSideProps, getServerSideProps } from 'lib/auth';
import { TextArea } from 'components/textarea';
import { Button } from 'components/button';
import { Container } from 'components/container';
import { GET_AD_TRACKING_QUERY } from 'data/admin/queries';
import { Admin, AdminAdTracking } from 'types/graphql';
import { Error } from 'components/error';
import { Cell, Row, Table, TableWrapper } from 'components/table';
import Link from 'next/link';

const { publicRuntimeConfig } = getConfig();

const AdminAdTracking: NextPage<ServerSideProps> = () => {
  const [contentIds, setContentIds] = React.useState<string>('');
  const [adTracking, setAdTracking] = React.useState<AdminAdTracking[]>([]);

  const [getAdTracking, { loading, error }] = useLazyQuery<{ admin: Admin }>(GET_AD_TRACKING_QUERY);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const utmContentIds = contentIds.split('\n').map(id => id.trim());
    const { data } = await getAdTracking({ variables: { utmContentIds } });

    setAdTracking(data.admin.adTracking);
  }

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContentIds(event.target.value);
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

        {!loading && adTracking.length === 0 && (
          <Container className='sm'>
            <form onSubmit={handleSubmit}>
              <TextArea
                rows={10}
                value={contentIds}
                onChange={handleChange} 
              />
              <Button className='primary' type='submit'>
                Generate
              </Button>
            </form>
          </Container>
        )}

        {!loading && adTracking.length > 0 && (
          <Container>
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
          </Container>
        )} 
      </Main>
    </>
  );
};

export default AdminAdTracking;
export { getServerSideProps };
