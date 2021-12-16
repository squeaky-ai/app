import React from 'react';
import type { FC } from 'react';
import { Tooltip } from 'components/tooltip';
import { Browser } from 'components/browser';
import { Device } from 'components/device';
import { toNiceDate } from 'lib/dates';
import { VisitorsStarred } from 'components/sites/visitors/visitors-starred';
import { Cell } from 'components/table';
import { Pill } from 'components/pill';
import { getAttributes, groupVisitorBrowsers, groupVisitorDevices } from 'lib/visitors';
import type { Site } from 'types/graphql';
import type { ExternalAttributes } from 'types/visitors';
import type { Visitor } from 'types/graphql';

interface Props {
  site: Site;
  visitor: Visitor;
  style?: React.CSSProperties;
}

export const VisitorsItem: FC<Props> = ({ site, visitor, style }) => {
  const attributes = getAttributes<ExternalAttributes>(visitor);
  const devices = groupVisitorDevices(visitor.devices);
  const browsers = groupVisitorBrowsers(visitor.devices);

  const toTimeStringDate = (value: string) => toNiceDate(new Date(value).valueOf());

  return (
    <div className='row' style={style}>
      <Cell>
        {visitor.viewed
          ? <Pill type='secondary'>Existing</Pill>
          : <Pill type='tertiary'>New</Pill>}
      </Cell>
      <Cell className='primary'>
        <VisitorsStarred site={site} visitor={visitor} link />
      </Cell>
      <Cell>
        {attributes?.id || '-'}
      </Cell>
      <Cell>
        {attributes?.name || '-'}
      </Cell>
      <Cell>
        {attributes?.email || '-'}
      </Cell>
      <Cell>
        {visitor.recordingCount?.total || 0}
      </Cell>
      <Cell>
        {toTimeStringDate(visitor.firstViewedAt)}
      </Cell>
      <Cell>
        {toTimeStringDate(visitor.lastActivityAt)}
      </Cell>
      <Cell>
        {visitor.language}
      </Cell>
      <Cell>
        {devices.length === 1 && (
          <>
            <Tooltip positionX='right' button={<Device deviceType={devices[0].deviceType} />}>
              {devices[0].deviceType === 'Computer' ? 'Desktop or Laptop Device' : 'Mobile Device'}
            </Tooltip>
            {devices[0].deviceX} x {devices[0].deviceY}
          </>
        )}
        {devices.length > 1 && (
          <Tooltip positionX='right' button={devices.length} buttonClassName='link'>
            <ul>
              {devices.map(device => (
                <li key={`${device.deviceX}_${device.deviceY}`}>
                  <Device deviceType={device.deviceType} />
                  <span>{device.deviceX} x {device.deviceY}</span>
                </li>
              ))}
            </ul>
          </Tooltip>
        )}
      </Cell>
      <Cell>
        {browsers.length === 1 && (
          <Tooltip positionX='right' button={<Browser name={browsers[0].browserName} height={24} width={24} />}>
            {browsers[0].browserDetails}
          </Tooltip>
        )}
        {browsers.length > 1 && (
          <Tooltip fluid positionX='right' button={browsers.length} buttonClassName='link'>
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
      </Cell>
    </div>
  );
};
