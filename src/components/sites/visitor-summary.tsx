import React from 'react';
import type { FC } from 'react';
import Link from 'next/link';
import { Card } from 'components/card';
import { toNiceDate } from 'lib/dates';
import { Device } from 'components/device';
import { Tooltip } from 'components/tooltip';
import { Browser } from 'components/browser';
import { VisitorStarred } from 'components/sites/visitor-starred';
import { Pill } from 'components/pill';
import { getAttributes, normalizeKey, groupVisitorBrowsers, groupVisitorDevices } from 'lib/visitors';
import type { Site } from 'types/site';
import type { Visitor } from 'types/visitor';

interface Props {
  site: Site;
  visitor: Visitor;
}

export const VisitorSummary: FC<Props> = ({ site, visitor }) => {
  const attributes = getAttributes(visitor);
  const devices = groupVisitorDevices(visitor.devices);
  const browsers = groupVisitorBrowsers(visitor.devices);

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
              {!visitor.viewed && (
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
              {devices.length === 1 && (
                <>
                  <Device deviceType={devices[0].deviceType} />
                  {devices[0].viewportX} by {devices[0].viewportY} pixels
                </>
              )}
              {devices.length > 1 && (
                 <Tooltip positionX='right' button={devices.length}>
                  <ul>
                    {devices.map(device => (
                      <li key={`${device.viewportX}_${device.viewportY}_${device.deviceType}`}>
                        <Device deviceType={device.deviceType} />
                        <span>{device.viewportX} x {device.viewportY}</span>
                      </li>
                    ))}
                  </ul>
                </Tooltip>
              )}
            </dd>
          </div>
          <div className='row'>
            <dt>Browser</dt>
            <dd>
              {browsers.length === 1 && (
                <>
                  <div className='browser'>
                    <Browser name={browsers[0].browserName} height={16} width={16} />
                  </div>
                  {browsers[0].browserDetails}
                </>
              )}
              {browsers.length > 1 && (
                <Tooltip positionX='right' button={browsers.length}>
                  <ul>
                    {browsers.map(device => (
                      <li key={device.browserName}>
                        <Browser name={device.browserName} height={20} width={20} />
                        <span>{device.browserName}</span>
                      </li>
                    ))}
                  </ul>
                </Tooltip>
              )}
            </dd>
          </div>
        </div>
      </div>
    </Card>
  );
};
