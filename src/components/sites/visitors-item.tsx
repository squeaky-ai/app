import React from 'react';
import type { FC } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Tooltip } from 'components/tooltip';
import { Browser } from 'components/browser';
import { Highlighter } from 'components/highlighter';
import { Device } from 'components/device';
import { toNiceDate } from 'lib/dates';
import { VisitorStarred } from 'components/sites/visitor-starred';
import { Cell } from 'components/table';
import { Pill } from 'components/pill';
import { getAttributes, groupVisitorBrowsers, groupVisitorDevices } from 'lib/visitors';
import type { Site } from 'types/site';
import type { Visitor, ExternalAttributes } from 'types/visitor';

interface Props {
  site: Site;
  query: string;
  visitor: Visitor;
  style?: React.CSSProperties;
}

export const VisitorsItem: FC<Props> = ({ site, visitor, query, style }) => {
  const router = useRouter();

  const onRowClick = (event: React.MouseEvent) => {
    const element = event.target as HTMLElement;
    const ignored = element.closest('button');

    if (ignored) {
      event.preventDefault();
    }
  };

  const attributes = getAttributes<ExternalAttributes>(visitor);
  const devices = groupVisitorDevices(visitor.devices);
  const browsers = groupVisitorBrowsers(visitor.devices);

  const toTimeStringDate = (value: string) => toNiceDate(new Date(value).valueOf());

  return (
    <Link href={`/sites/${router.query.site_id}/visitors/${visitor.id}`}>
      <a className='row' onClick={onRowClick} style={style}>
        <Cell>
          {visitor.viewed
            ? <Pill type='secondary'>Existing</Pill>
            : <Pill type='tertiary'>New</Pill>}
        </Cell>
        <Cell className='primary'>
          <VisitorStarred site={site} visitor={visitor} />
        </Cell>
        <Cell>
          <Highlighter value={query}>{attributes?.id || '-'}</Highlighter>
        </Cell>
        <Cell>
          <Highlighter value={query}>{attributes?.name || '-'}</Highlighter>
        </Cell>
        <Cell>
          <Highlighter value={query}>{attributes?.email || '-'}</Highlighter>
        </Cell>
        <Cell>
          {visitor.recordingsCount?.total || '😰'}
        </Cell>
        <Cell>
          <Highlighter value={query}>
            {toTimeStringDate(visitor.firstViewedAt)}
          </Highlighter>
        </Cell>
        <Cell>
          <Highlighter value={query}>
            {toTimeStringDate(visitor.lastActivityAt)}
          </Highlighter>
        </Cell>
        <Cell>
          <Highlighter value={query}>
            {visitor.language}
          </Highlighter>
        </Cell>
        <Cell>
          {devices.length === 1 && (
            <>
              <Tooltip positionX='right' button={<Device deviceType={devices[0].deviceType} />}>
                {devices[0].deviceType === 'Computer' ? 'Desktop or Laptop Device' : 'Mobile Device'}
              </Tooltip>
              <Highlighter value={query}>{devices[0].viewportX}</Highlighter> x <Highlighter value={query}>{devices[0].viewportY}</Highlighter>
            </>
          )}
          {devices.length > 1 && (
            <Tooltip positionX='right' button={devices.length} buttonClassName='link'>
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
      </a>
    </Link>
  );
};
