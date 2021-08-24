import React from 'react';
import type { FC } from 'react';
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

export const VisitorSummary: FC<Props> = ({ site, visitor }) => (
  <div className='summary'>
    <Card className='info'>
      <div className='row'>
        <dt>Visitor ID</dt>
        <dd>
          <VisitorStarred site={site} visitor={visitor} />
          {visitor.viewed && (
            <Pill type='primary'>New</Pill>
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
            <Browser name={visitor.browser} height={16} width={16} />
          </div>
          {visitor.browserString}
        </dd>
      </div>
    </Card>
    <Card className='recordings'>
      <h3>Recordings</h3>
      <h2>{visitor.recordingsCount.total}</h2>
      <Pill>{visitor.recordingsCount.new} New</Pill>
    </Card>
    <Card className='page-views'>
      <h3>Page Views</h3>
      <h2>{visitor.pageViewsCount.total}</h2>
      <Pill>{visitor.pageViewsCount.unique} Unique</Pill>
    </Card>
  </div>
);
