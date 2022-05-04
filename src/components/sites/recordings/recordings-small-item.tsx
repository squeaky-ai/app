import React from 'react';
import type { FC } from 'react';
import Link from 'next/link';
import { Pill } from 'components/pill';
import { Icon } from 'components/icon';
import { toIsoDate, toTimeString, toHyphenedDate } from 'lib/dates';
import type { Recording, Site } from 'types/graphql';

interface Props {
  site: Site;
  recording: Recording;
}

export const RecordingSmallItem: FC<Props> = ({ site, recording }) => (
  <Link href={`/sites/${site.id}/recordings/${recording.id}`}>
    <a className='card'>
      <div className='heading'>
        <p>{recording.sessionId}</p>
        {recording.viewed
          ? <Pill type='secondary'>Viewed</Pill>
          : <Pill type='tertiary'>New</Pill>
        }
      </div>
      <div className='details'>
        <p>
          <Icon name='calendar-line' />
          {toHyphenedDate(toIsoDate(new Date(recording.connectedAt)))}
        </p>
        <p>
          <Icon name='pages-line' />
          {recording.pageCount} pages
        </p>
        <p>
          <Icon name='time-line' />
          {toTimeString(recording.duration).slice(3)}
        </p>
      </div>
    </a>
  </Link>
);
