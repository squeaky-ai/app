import React from 'react';
import type { FC } from 'react';
import { Tooltip } from 'components/tooltip';
import { Browser } from 'components/browser';
import { Device } from 'components/device';
import { toNiceDate } from 'lib/dates';
import { Icon } from 'components/icon';
import { VisitorsStarred } from 'components/sites/visitors/visitors-starred';
import { VisitorsDelete } from 'components/sites/visitors/visitors-delete';
import { Cell, Row } from 'components/table';
import { Pill } from 'components/pill';
import { Dropdown } from 'components/dropdown';
import { Flag } from 'components/flag';
import { Highlighter } from 'components/highlighter';
import { getLinkedData, groupVisitorBrowsers, groupVisitorDevices, groupVisitorCountries } from 'lib/visitors';
import type { Site, Team } from 'types/graphql';
import type { ExternalAttributes } from 'types/visitors';
import type { Visitor } from 'types/graphql';

interface Props {
  site: Site;
  member?: Team;
  visitor: Visitor;
  search: string;
  style?: React.CSSProperties;
}

export const VisitorsLargeItem: FC<Props> = ({ site, member, visitor, search, style }) => {
  const rowActionsRef = React.useRef<Dropdown>();

  const linkedData = getLinkedData<ExternalAttributes>(visitor);
  const devices = groupVisitorDevices(visitor.devices);
  const browsers = groupVisitorBrowsers(visitor.devices);
  const countries = groupVisitorCountries(visitor.countries);

  const toTimeStringDate = (value: string) => toNiceDate(value);

  const onRowActionClose = () => {
    if (rowActionsRef.current) rowActionsRef.current.close();
  };

  return (
    <Row style={style}>
      <Cell>
        {visitor.viewed
          ? <Pill type='secondary'>Existing</Pill>
          : <Pill type='tertiary'>New</Pill>}
      </Cell>
      <Cell className='primary'>
        <VisitorsStarred 
          site={site}
          member={member}
          visitor={visitor} 
          search={search}
          link 
          highlight
        />
      </Cell>
      <Cell>
        <Highlighter value={search}>
          {linkedData?.id || '-'}
        </Highlighter>
      </Cell>
      <Cell>
        <Highlighter value={search}>
          {linkedData?.name || '-'}
        </Highlighter>
      </Cell>
      <Cell>
        <Highlighter value={search}>
          {linkedData?.email || '-'}
        </Highlighter>
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
      <Cell>
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
      </Cell>
      <Cell>
        <Dropdown portal button={<Icon name='more-2-fill' />} buttonClassName='options' ref={rowActionsRef}>
          <VisitorsDelete 
            site={site} 
            member={member}
            visitorId={visitor.id}
            onClose={onRowActionClose}
          />
        </Dropdown>
      </Cell>
    </Row>
  );
};
