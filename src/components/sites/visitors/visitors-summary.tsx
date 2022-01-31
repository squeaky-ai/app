import React from 'react';
import type { FC } from 'react';
import { useRouter } from 'next/router';
import { Icon } from 'components/icon';
import { Card } from 'components/card';
import { toNiceDate } from 'lib/dates';
import { Device } from 'components/device';
import { Tooltip } from 'components/tooltip';
import { Browser } from 'components/browser';
import { Flag } from 'components/flag';
import { VisitorsDelete } from 'components/sites/visitors/visitors-delete';
import { VisitorsStarred } from 'components/sites/visitors/visitors-starred';
import { Pill } from 'components/pill';
import { getLinkedData, normalizeKey, groupVisitorBrowsers, groupVisitorDevices, groupVisitorCountries } from 'lib/visitors';
import type { Site } from 'types/graphql';
import type { Visitor } from 'types/graphql';

interface Props {
  site: Site;
  visitor: Visitor;
}

export const VisitorsSummary: FC<Props> = ({ site, visitor }) => {
  const router = useRouter();

  const linkedData = getLinkedData(visitor);
  const devices = groupVisitorDevices(visitor.devices);
  const browsers = groupVisitorBrowsers(visitor.devices);
  const countries = groupVisitorCountries(visitor.countries);

  const onVisitorDelete = async () => {
    await router.push(`/sites/${site.id}/visitors`);
  };

  return (
    <Card className='summary'>
      <h4 className='title'>
        <Icon name='user-line' />
        {visitor.visitorId}
        <VisitorsDelete site={site} visitorId={visitor.id} onDelete={onVisitorDelete} />
      </h4>

      <div className='summary-data'>
        <div className='linked'>
          <p className='heading'>
            <Icon name='link-m' />
            Linked Data
          </p>
          {!linkedData && (
            <>
              <p>There is no linked data for this visitor.</p>
              <p><a target='_blank' href='/developers'>Click here</a> to discover how you can link Squeaky visitor records directly with data of logged in users in your application.</p>
            </>
          )}

          {linkedData && (
            <div className='attributes'>
              {Object.entries(linkedData).map(([key, value]) => (
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
              <VisitorsStarred site={site} visitor={visitor} />
              {!visitor.viewed && (
                <Pill type='tertiary'>New</Pill>
              )}
            </dd>
          </div>
          <div className='row'>
            <dt>First visited</dt>
            <dd>{toNiceDate(visitor.firstViewedAt)}</dd>
          </div>
          <div className='row'>
            <dt>Last activity</dt>
            <dd>{toNiceDate(visitor.lastActivityAt)}</dd>
          </div>
          <div className='row'>
            <dt>Language</dt>
            <dd>{visitor.language}</dd>
          </div>
          <div className='row'>
            <dt>Device(s)</dt>
            <dd>
              {devices.length === 1 && (
                <>
                  <Device deviceType={devices[0].deviceType} />
                  {devices[0].deviceX} by {devices[0].deviceY} pixels
                </>
              )}
              {devices.length > 1 && (
                 <Tooltip positionX='right' button={devices.length}>
                  <ul>
                    {devices.map(device => (
                      <li key={`${device.deviceX}_${device.deviceY}_${device.deviceType}`}>
                        <Device deviceType={device.deviceType} />
                        <span>{device.deviceX} x {device.deviceY}</span>
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
                  <Browser name={browsers[0].browserName} height={20} width={20} />
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
          <div className='row'>
            <dt>Country</dt>
            <dd>
              {countries.length === 1 && (
                <Tooltip positionX='right' button={<Flag code={countries[0].code} />}>
                  {countries[0].name}
                </Tooltip>
              )}
              {countries.length > 1 && (
                <Tooltip fluid positionX='right' button={countries.length} buttonClassName='link'>
                  <ul>
                    {countries.map(country => (
                      <li key={country.code}>
                        <Flag code={country.code} />
                        <span>{country.name}</span>
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
