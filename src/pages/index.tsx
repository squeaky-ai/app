import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Container } from 'components/container';
import { Header } from 'components/public/header';
import { ServerSideProps, getServerSideProps } from 'lib/auth';
import { Input } from 'components/input';
import { Button } from 'components/button';

const Home: NextPage<ServerSideProps> = ({ user }) => (
  <div className='page home'>
    <Head>
      <title>Squeaky</title>
    </Head>

    <Header user={user} />

    <section className='section hero'>
      <Container className='lg centered'>
        <h1>Understand your users</h1>
        <p>Capture screen recordings and insightful data that help you <b>see exactly how visitors are using your website or app</b>.</p>
        <form>
          <Input placeholder='Enter your email ...' />
          <Button className='primary'>Sign Up</Button>
          <i>No credit card required</i>
        </form>
      </Container>
    </section>

    <section className='section demo'>
      <Container className='lg centered'>
        <h2>Simple yet powerful</h2>
        <p>Our tools make it easy for you to understand <b>who your users</b> are and <b>how they’re using your site</b>.</p>

        <div className='panels' id='recordings'>
          <div className='list'>
            <h3>Screen Recording</h3>
            <Button>
              <i className='ri-vidicon-line' />
              <span>Powerful search and filters</span>
              <i className='ri-add-line' />
              </Button>
            <Button>
              <i className='ri-cursor-line' />
              <span>Watch visitor sessions in real time</span>
              <i className='ri-add-line' />
            </Button>
            <Button>
              <i className='ri-information-line' />
              <span>Detailed session information</span>
              <i className='ri-add-line' />
            </Button>
            <Button>
              <i className='ri-compass-discover-line' />
              <span>Quickly navigate your recordings</span>
              <i className='ri-add-line' />
            </Button>
            <Button>
              <i className='ri-price-tag-3-line' />
              <span>Add notes and tags</span>
              <i className='ri-add-line' />
            </Button>
          </div>
          <div className='screen'>
            <img src='/screen.svg' />
          </div>
        </div>

        <div className='panels reverse' id='analytics'>
          <div className='list'>
            <h3>Analytics</h3>
            <Button>
              <i className='ri-equalizer-line' />
              <span>Precision filtering</span>
              <i className='ri-add-line' />
              </Button>
            <Button>
              <i className='ri-line-chart-line' />
              <span>Understand your traffic</span>
              <i className='ri-add-line' />
            </Button>
            <Button>
              <i className='ri-window-line' />
              <span>Determine which content matters</span>
              <i className='ri-add-line' />
            </Button>
            <Button>
              <i className='ri-group-line' />
              <span>Solve for the right users</span>
              <i className='ri-add-line' />
            </Button>
            <Button>
              <i className='ri-smartphone-line' />
              <span>Optimise for any device</span>
              <i className='ri-add-line' />
            </Button>
          </div>
          <div className='screen'>
            <img src='/screen.svg' />
          </div>
        </div>
      </Container>
    </section>

    <section className='section features' id='features'>
      <Container className='lg centered'>
        <h2>All The Right Features</h2>
        <div className='features-card'>
          <div>
            <h4>Flexible &amp; Easy To Use</h4>
            <ul>
              <li><i className='ri-check-line' />Easy installation</li>
              <li><i className='ri-check-line' />Unlimitied team members</li>
              <li><i className='ri-check-line' />Track users on any device</li>
              <li><i className='ri-check-line' />Reliable customer support</li>
            </ul>
            <h4>Amazing Recordings</h4>
            <ul>
              <li><i className='ri-check-line' />Session capture and playback</li>
              <li><i className='ri-check-line' />Add notes &amp; tags</li>
              <li><i className='ri-check-line' />Control playback speed</li>
              <li><i className='ri-check-line' />Session activity and page timeline</li>
              <li><i className='ri-check-line' />Filter and segment your recordings</li>
              <li><i className='ri-check-line' />Video exports</li>
            </ul>
          </div>
          <div>
            <h4>Insightful Analytics</h4>
            <ul>
              <li><i className='ri-check-line' />Visitor counts</li>
              <li><i className='ri-check-line' />Page views</li>
              <li><i className='ri-check-line' />Average session duration</li>
              <li><i className='ri-check-line' />Pages per session</li>
              <li><i className='ri-check-line' />Per page view counts</li>
              <li><i className='ri-check-line' />Average time on page</li>
              <li><i className='ri-check-line' />Browser and browser version</li>
              <li><i className='ri-check-line' />Visits by device</li>
              <li><i className='ri-check-line' />Filter and segment your visits</li>
            </ul>
          </div>
          <div>
            <div className='coming-soon'>

            </div>
          </div>
        </div>
        <h2>Plans For Everyone</h2>
        <p>We offer flexible and affordable pricing, so you can focus on the important part - improving your product.</p>
      </Container>
    </section>
  </div>
);

export default Home;
export { getServerSideProps };
