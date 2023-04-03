import React from 'react';
import type { FC } from 'react';
import Link from 'next/link';
import { Pill } from 'components/pill';
import { Icon } from 'components/icon';
import { toHyphenedDate } from 'lib/dates';
import type { Site, Visitor } from 'types/graphql';

interface Props {
  site: Site;
  visitor: Visitor;
}

export const VisitorsSmallItem: FC<Props> = ({ site, visitor }) => (
  <Link href={`/sites/${site.id}/visitors/${visitor.id}`} className='card'>
    <div className='heading'>
      <p>{visitor.visitorId}</p>
      {visitor.viewed
        ? <Pill type='secondary'>Existing</Pill>
        : <Pill type='tertiary'>New</Pill>
      }
    </div>
    <div className='details'>
      <p>
        <Icon name='earth-line' />
        {visitor.countries[0]?.code}
      </p>
      <p>
        <Icon name='vidicon-line' />
        {visitor.recordingCount.total} recording{visitor.recordingCount.total === 1 ? '' : 's'}
      </p>
      <p>
        <Icon name='calendar-line' />
        {toHyphenedDate(visitor.lastActivityAt.iso8601)}
      </p>
    </div>
  </Link>
);
