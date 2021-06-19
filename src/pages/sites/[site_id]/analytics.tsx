import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { Main } from '../../../components/main';
import { Header } from '../../../components/sites/header';
import { Tabs } from '../../../components/sites/tabs';
import { Message } from '../../../components/message';
import { ServerSideProps, getServerSideProps } from '../../../lib/auth';
import { useSite } from '../../../hooks/sites';

const SitesAnalytics: NextPage<ServerSideProps> = ({ user }) => {
  const [loading, site] = useSite();

  return (
    <div className='page analytics'>
      <Head>
        <title>Squeaky / Site Analytics</title>
      </Head>

      <Header />

      {!loading && site && (
        <>
          <Tabs site={site} user={user} page='analytics' />

          {!site.recordings.items.length && (
            <>
              <h3 className='title empty'>Analytics</h3>
              <div className='empty-state'>
                <Image src='/empty-state-3.svg' height={240} width={320} />
                <h4>There are currently no analytics available.</h4>
                <Message
                  type='info'
                  message='If you have only recently installed or updated your tracking code it may take a little time before results appear.'
                />
              </div>
            </>
          )}

          {!!site.recordings.items.length && (
            <Main>
              <h3 className='title'>Analytics</h3>

              <div className='analytics-grid'>
                <div className='card graph'>
                </div>
                <div className='card visitors'>
                  <h4>Visitors</h4>
                  <h2>0</h2>
                </div>
                <div className='card views'>
                  <h4>Views</h4>
                  <h2>0</h2>
                </div>
                <div className='card session-duration'>
                  <h4>Average Session Duration</h4>
                  <h2>0m 0s</h2>
                </div>
                <div className='card session-pages'>
                  <h4>Pages Per Session</h4>
                  <h2>0</h2>
                </div>
                <div className='card basic page-browser'>
                  <div className='grid'>
                    <div className='card basic pages'>
                      <h4>Pages</h4>
                      <div className='table'>
                        <table cellSpacing='0'>
                          <thead>
                            <tr>
                              <th>Page</th>
                              <th>Views</th>
                              <th>Average time on page</th>
                            </tr>
                          </thead>
                          <tbody>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className='card basic browser'>
                      <h4>Browser</h4>
                      <div className='card'>

                      </div>
                    </div>
                  </div>
                </div>
                <div className='card basic devices'>
                  <h4>Devices</h4>
                  <div className='grid'>
                    <div className='card'>
                      <i className='ri-computer-line' />
                      <div className='stats'>
                        <p><b>Desktop / Laptop</b></p>
                        <h3>0 <span>0%</span></h3>
                      </div>
                    </div>
                    <div className='card'>
                      <i className='ri-tablet-line' />
                      <div className='stats'>
                        <p><b>Tablet</b></p>
                        <h3>0 <span>0%</span></h3>
                      </div>
                    </div>
                    <div className='card'>
                      <i className='ri-smartphone-line' />
                      <div className='stats'>
                        <p><b>Mobile</b></p>
                        <h3>0 <span>0%</span></h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Main>
          )}
        </>
      )}
    </div>
  );
};

export default SitesAnalytics;
export { getServerSideProps };
