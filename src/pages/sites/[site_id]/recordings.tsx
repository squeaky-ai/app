import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import classnames from 'classnames';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { Main } from 'components/main';
import { Header } from 'components/sites/header';
import { Message } from 'components/message';
import { Container } from 'components/container';
import { Tabs } from 'components/sites/tabs';
import { Pagination } from 'components/pagination';
import { Input } from 'components/input';
import { GET_RECORDINGS_QUERY } from 'data/recordings/queries';
import { ServerSideProps, getServerSideProps } from 'lib/auth';
import { getDeviceIcon, getDuration } from 'lib/sites';
import type { Site } from 'types/site';

const SitesRecordings: NextPage<ServerSideProps> = ({ user }) => {
  const router = useRouter();
  const [page, setPage] = React.useState<number>(0);
  const [query, setQuery] = React.useState<string>('');
  
  const { data } = useQuery<{ site: Site }>(GET_RECORDINGS_QUERY, {
    variables: { id: router.query.site_id as string, page, size: 15 }
  });

  return (
    <div className='page recordings'>
      <Head>
        <title>Squeaky / Site Recordings</title>
      </Head>

      <Header />

      {data && (
        <>
          <Tabs site={data.site} user={user} page='recordings' />

          {!data.site.recordings.items.length && (
            <Container className='xl centered empty-state'>
              <h3 className='title empty'>Recordings</h3>
              <div className='empty-state-contents'>
                <Image src='/empty-state-2.svg' height={240} width={320} />
                <h4>There are currently no recordings available.</h4>
                <Message
                  type='info'
                  message='If you have only recently installed or updated your tracking code it may take a little time before results appear.'
                />
              </div>
            </Container>
        )}

          {!!data.site.recordings.items.length && (
            <Main>
              <h3 className='title'>
                Recordings
                <div className='search'>
                  <Input type='search' placeholder='Search...' value={query} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setQuery(event.target.value)} />
                  <i className='ri-search-line' /> 
                </div>
              </h3>
              <div className='table recordings-list'>
                <table cellSpacing='0'>
                  <thead>
                    <tr>
                      <th>Status</th>
                      <th>Session #</th>
                      <th>User</th>
                      <th>Language</th>
                      <th>Duration</th>
                      <th>Pages</th>
                      <th>Start &amp; Exit URL</th>
                      <th>Device type</th>
                      <th>Viewport (px)</th>
                      <th>Browser</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.site.recordings.items.map(recording => (
                      <tr className='hover' key={recording.id} role='button' onClick={() => router.push(`/sites/${data.site.id}/player?recording_id=${recording.id}`)}>
                        <td>
                          <span className={classnames('indicator', { active: recording.active })} />
                          {recording.active ? 'Active' : 'Recorded'}
                        </td>
                        <td>{recording.id}</td>
                        <td>{recording.viewerId}</td>
                        <td>{recording.language}</td>
                        <td>{getDuration(recording.duration)}</td>
                        <td><a href='#'>{recording.pageCount}</a></td>
                        <td>
                          <table className='start-exit-page'>
                            <tbody>
                              <tr>
                                <td>START URL</td>
                                <td>{recording.startPage}</td>
                              </tr>
                              <tr>
                                <td>EXIT URL</td>
                                <td>{recording.exitPage}</td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                        <td>
                          <i className={classnames('device', getDeviceIcon(recording.deviceType))} />
                          {recording.deviceType || 'Unknown'}
                        </td>
                        <td>{recording.viewportX} x {recording.viewportY}</td>
                        <td>
                          <Image src={`/browsers/${recording.browser.toLowerCase()}.svg`} height={24} width={24} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <Pagination 
                page={page} 
                setPage={setPage}
                {...data.site.recordings.pagination}
              />
            </Main>
          )}
        </>
      )}
    </div>
  );
};

export default SitesRecordings;
export { getServerSideProps };
