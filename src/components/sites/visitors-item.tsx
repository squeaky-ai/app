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
import type { Site } from 'types/site';
import type { Visitor, ExternalAttributes } from 'types/visitor';

interface Props {
  site: Site;
  query: string;
  visitor: Visitor;
}

export const VisitorsItem: FC<Props> = ({ site, visitor, query }) => {
  const router = useRouter();

  const onRowClick = (event: React.MouseEvent) => {
    const element = event.target as HTMLElement;
    const ignored = element.closest('button');

    if (ignored) {
      event.preventDefault();
    }
  };

  const attributes = visitor.attributes 
    ? JSON.parse(visitor.attributes) as ExternalAttributes
    : null;

  const toTimeStringDate = (value: string) => toNiceDate(Number(value));

  return (
    <Link href={`/sites/${router.query.site_id}/visitors/${visitor.id}`}>
      <a className='row' onClick={onRowClick}>
        <Cell>
          {visitor.viewed && (
            <Pill type='primary'>New</Pill>
          )}
        </Cell>
        <Cell>
          <VisitorStarred site={site} visitor={visitor} />
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
          {visitor.recordingsCount.total}
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
          <Tooltip positionX='right' button={<Device deviceType={visitor.deviceType} />}>
            {visitor.deviceType === 'Computer' ? 'Desktop or Laptop Device' : 'Mobile Device'}
          </Tooltip>
          <Highlighter value={query}>{visitor.viewportX}</Highlighter> x <Highlighter value={query}>{visitor.viewportY}</Highlighter>
        </Cell>
        <Cell>
          <Tooltip positionX='right' button={<Browser name={visitor.browser} height={24} width={24} />}>
            {visitor.browserString}
          </Tooltip>
        </Cell>
      </a>
    </Link>
  );
};
