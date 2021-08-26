import React from 'react';
import type { FC } from 'react';
import Link from 'next/link';
import { capitalize } from 'lodash';
import { Card } from 'components/card';
import { toNiceDate } from 'lib/dates';
import { Device } from 'components/device';
import { Browser } from 'components/browser';
import { VisitorStarred } from 'components/sites/visitor-starred';
import { Pill } from 'components/pill';
import type { Site } from 'types/site';
import type { Visitor } from 'types/visitor';

interface Props {
  site: Site;
  visitor: Visitor;
}

export const VisitorSummary: FC<Props> = ({ site, visitor }) => {
  const attributes = (() => {
    try {
      return JSON.parse(visitor.attributes);
    } catch {
      return null;
    }
  })();

  const normalizeKey = (key: string): string => {
    switch(key) {
      case 'id':
        return 'User ID';
      case 'name':
        return 'Name';
      case 'email':
        return 'Email';
      default:
        return capitalize(key);
    }
  };

  return (
    <Card className='summary'>
      <h3 className='title'>
        <i className='ri-user-line' />
        {visitor.visitorId}
      </h3>

      <div className='summary-data'>
        <div className='linked'>
          <p className='heading'>
            <i className='ri-link-m' />
            Linked Data
          </p>
          {!attributes && (
            <>
              <p>There is no linked data for this visitor.</p>
              <p><Link href='/developers'><a target='_blank'>Click here</a></Link> to discover how you can link Squeaky visitor records directly with data of logged in users in your application.</p>
            </>
          )}

          {attributes && (
            <div className='attributes'>
              {Object.entries(attributes).map(([key, value]) => (
                <div className='row' key={key}>
                  <dt>{normalizeKey(key)}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className='default'>
          <div className='row'>
            <dt>Visitor ID</dt>
            <dd>
              <VisitorStarred site={site} visitor={visitor} />
              {visitor.viewed && (
                <Pill type='tertiary'>New</Pill>
              )}
            </dd>
          </div>
          <div className='row'>
            <dt>First visited</dt>
            <dd>{toNiceDate(Number(visitor.firstViewedAt))}</dd>
          </div>
          <div className='row'>
            <dt>Last activity</dt>
            <dd>{toNiceDate(Number(visitor.lastActivityAt))}</dd>
          </div>
          <div className='row'>
            <dt>Language</dt>
            <dd>{visitor.language}</dd>
          </div>
          <div className='row'>
            <dt>Device &amp; Viewport (px)</dt>
            <dd>
              <Device deviceType={visitor.deviceType} />
              {visitor.viewportX} by {visitor.viewportY} pixels
            </dd>
          </div>
          <div className='row'>
            <dt>Browser</dt>
            <dd>
              <div className='browser'>
                <Browser name={visitor.browser} height={20} width={20} />
              </div>
              {visitor.browserString}
            </dd>
          </div>
        </div>
      </div>
    </Card>
  );
};
