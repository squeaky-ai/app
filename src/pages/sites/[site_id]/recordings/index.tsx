import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import classnames from 'classnames';
import UAParser from 'ua-parser-js';
import router, { useRouter } from 'next/router';
import { Main } from '../../../../components/main';
import { Header } from '../../../../components/sites/header';
import { Message } from '../../../../components/message';
import { Tabs } from '../../../../components/sites/tabs';
import { ServerSideProps, getServerSideProps } from '../../../../lib/auth';
import { useSite } from '../../../../hooks/sites';

const deviceIcon = (device: string = '') => {
  switch(device.toLowerCase()) {
    case 'mobile':
      return 'ri-smartphone-line';
    case 'tablet':
      return 'ri-tablet-line';
    default:
      return 'ri-computer-line';
  }
};

const SitesRecordings: NextPage<ServerSideProps> = () => {
  const [loading, site] = useSite();
  const parser = new UAParser();

  const viewRecording = async (id: string) => {
    await router.push(`/sites/${site.id}/recordings/${id}`);
  };

  return (
    <div className='page recordings'>
      <Head>
        <title>Squeaky / Site Recordings</title>
      </Head>

      <Header />

      {!loading && site && (
        <Main>
          <Tabs site={site} page='recordings' />

          {!site.recordings.items.length && (
            <>
              <h3 className='title empty'>Recordings</h3>
              <div className='empty-state'>
                <Image src='/empty-state-2.svg' height={240} width={320} />
                <h4>There are currently no recordings available.</h4>
                <Message
                  type='info'
                  message='If you have only recently installed or updated your tracking code it may take a little time before results appear.'
                />
              </div>
            </>
          )}

          {!!site.recordings.items.length && (
            <>
              <h3 className='title'>Recordings</h3>
              <div className='table'>
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
                    {site.recordings.items.map(recording => {
                      const useragent = parser.setUA(recording.useragent).getResult();
            
                      return (
                        <tr className='hover' key={recording.id} role='button' onClick={() => viewRecording(recording.id)}>
                          <td>
                            <span className={classnames('indicator', { active: recording.active })} />
                            {recording.active ? 'Active' : 'Recorded'}
                          </td>
                          <td>{recording.id}</td>
                          <td>{recording.viewerId}</td>
                          <td>{recording.locale}</td>
                          <td>{recording.duration}</td>
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
                            <i className={classnames('device', deviceIcon(useragent.device.type))} />
                            {useragent.device.type || 'Desktop'}
                          </td>
                          <td>{recording.viewportX} x {recording.viewportY}</td>
                          <td>
                            <Image src={`/browsers/${useragent.browser.name.toLowerCase()}.svg`} height={24} width={24} />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </Main>
      )}
    </div>
  );
};

export default SitesRecordings;
export { getServerSideProps };
