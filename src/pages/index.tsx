import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { Container } from 'components/container';
import { Header } from 'components/public/header';
import { Input } from 'components/input';
import { Button } from 'components/button';
import { Select, Option } from 'components/select';
import { Footer } from 'components/public/footer';
import { Main } from 'components/main';
import { ServerSideProps, getServerSideProps } from 'lib/auth';

const Home: NextPage<ServerSideProps> = ({ user }) => (
  <div className='page home'>
    <Head>
      <title>Squeaky</title>
    </Head>

    <Header user={user} />
    
    <Main>
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

      <section className='section demo' id='recordings'>
        <Container className='lg centered'>
          <h2>Simple yet powerful</h2>
          <p>Our tools make it easy for you to understand <b>who your users</b> are and <b>how they’re using your site</b>.</p>

          <div className='panels'>
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
            <div className='star'>
              <Image src='/star.svg' height={256} width={273} />
            </div>
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
                <p className='title'>
                  <img src='/fire.svg' />
                  <b>Coming Soon!</b>
                </p>
                <p>We’re moving at lightning-pace to keep the amazing features coming, next up on our roadmap:</p>
                <ul>
                  <li>
                    <i className='ri-download-cloud-line' />
                    Analytics Exports
                  </li>
                  <li>
                    <i className='ri-line-chart-line' />
                    Automated Email Reports
                  </li>
                  <li>
                    <i className='ri-cursor-line' />
                    Heatmaps and clickmaps
                  </li>
                  <li>
                    <i className='ri-lightbulb-line' />
                    Insights &amp; Tips
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </section>
      <section className='section plan' id='pricing'>
        <Container className='lg centered'>
          <h2>Plans For Everyone</h2>
          <p>We offer flexible and affordable pricing, so you can focus on the important part - improving your product.</p>
          <Select className='price-select'>
            <Option>USD ($)</Option>
            <Option>GBP (£)</Option>
            <Option>EUR (€)</Option>
          </Select>
          <div className='plans'>
            <div className='plan-card'>
              <h3>Free</h3>
              <h4 className='price'>$0</h4>
              <p>forever</p>
              <ul>
                <li>Unlimited team members</li>
                <li>100 recordings per month</li>
                <li>30 day analytics history</li>
              </ul>
              <div className='cta'>
                <Link href='/auth/signup'>
                  <a className='button secondary'>
                    Get Started Free
                  </a>
                </Link>
              </div>
            </div>
            <div className='plan-card important'>
              <h3>Plus</h3>
              <h4 className='price'>$50</h4>
              <p>per month</p>
              <ul>
                <li>Unlimited team members</li>
                <li>500 recordings per month</li>
                <li>36 month analytics history</li>
              </ul>
              <div className='cta'>
                <Link href='/auth/signup'>
                  <a className='button primary'>
                    Get Started Free
                  </a>
                </Link>
              </div>
            </div>
            <div className='plan-card'>
              <h3>Pro</h3>
              <h4 className='price'>$150</h4>
              <p>per month</p>
              <ul>
                <li>Unlimited team members</li>
                <li>5000 recordings per month</li>
                <li>1 year analytics history</li>
              </ul>
              <div className='cta'>
                <Link href='/auth/signup'>
                  <a className='button secondary'>
                    Get Started Free
                  </a>
                </Link>
              </div>
            </div>
            <div className='plan-card'>
              <h3>Enterprise</h3>
              <h4 className='price small'>Contact Sales</h4>
              <p>TEL: +31 681171234</p>
              <ul>
                <li>Unlimited team members</li>
                <li>Unlimited recordings</li>
                <li>Unlimited analytics history</li>
              </ul>
              <div className='cta'>
                <Link href='#'>
                  <a className='button secondary'>
                    Get In Touch
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
      <section className='section info'>
        <Container className='lg centered'>
          <img src='/basketball.svg' className='image basketball' />
          <img src='/cheese-legs.svg' className='image cheese-legs' />

          <h2>Looking For<br />More Information?</h2>
          <p>Schedule a demo using the button below and we’ll give you a guided tour of Squeaky and answer any questions you might have.</p>
          <Link href='#'>
            <a className='button primary'>
              Schedule Demo
            </a>
          </Link>
        </Container>
      </section>
    </Main>

    <Footer />
  </div>
);

export default Home;
export { getServerSideProps };
