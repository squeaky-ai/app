import React from 'react';
import type { FC } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Icon } from 'components/icon';
import { Card } from 'components/card';
import { Tooltip } from 'components/tooltip';
import { Divider } from 'components/divider';
import { PlayerPreview } from 'components/sites/player/player-preview';
import { VisitorsStarred } from 'components/sites/visitors/visitors-starred';
import { Pill } from 'components/pill';
import { Spinner } from 'components/spinner';
import { Error } from 'components/error';
import { ActiveVisitors } from './active-visitors';
import { useDashboard } from 'hooks/use-dashboard';
import { toTimeString } from 'lib/dates';
import { getDateRange } from 'lib/dates';
import type { Site } from 'types/graphql';
import type { TimePeriod } from 'types/common';

interface Props {
  site: Site;
  period: TimePeriod;
}

export const Dashboard: FC<Props> = ({ site, period }) => {
  const router = useRouter();
  const { dashboard, error, loading } = useDashboard({ range: getDateRange(period) });

  const { site_id } = router.query;

  const notes = dashboard.notes?.items;
  const recording = dashboard.recordingLatest;

  if (error) {
    return <Error />;
  }

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className='dashboard-grid'>
      <Card className='visitors'>
        <h5>
          <Icon name='group-line' />
          <span>Visitors</span>
          <Tooltip portalClassName='active-users-portal' button={
            <Pill className='small'>
              <Icon name='flashlight-line' />
              <ActiveVisitors />
            </Pill>
          }>
            Active visitors
          </Tooltip>
        </h5>
        <h2>
          {dashboard.analytics.visitorsCount.total.toLocaleString()}
        </h2>
        <div className='bottom'>
          <Pill type='tertiary'>{dashboard.analytics.visitorsCount.new.toLocaleString()} New</Pill>

          <div className='link'>
            <Link href={`/sites/${site_id}/visitors`}>
              <a>View</a>
            </Link>
            <Icon name='arrow-right-line' />
          </div>
        </div>
      </Card>

      <Card className='recordings'>
        <h5>
          <Icon name='vidicon-line' />
          Recordings
        </h5>
        <h2>
          {dashboard.analytics.recordingsCount.total.toLocaleString()}
        </h2>
        <div className='bottom'>
          <Pill type='tertiary'>{dashboard.analytics.recordingsCount.new.toLocaleString()} New</Pill>

          <div className='link'>
            <Link href={`/sites/${site_id}/recordings`}>
              <a>View</a>
            </Link>
            <Icon name='arrow-right-line' />
          </div>
        </div>
      </Card>

      <Card className='pageviews'>
        <h5>
          <Icon name='pages-line' />
          Page Views
        </h5>
        <h2>{dashboard.analytics.pageViewCount.toLocaleString()}</h2>
        <div className='link'>
          <Link href={`/sites/${site_id}/analytics`}>
            <a>Analytics</a>
          </Link>
          <Icon name='arrow-right-line' />
        </div>
      </Card>

      <Card className='latest-recording'>
        <h5>
          Latest Recording
        </h5>

        {recording && (
          <div className='preview'>
            <Link href={`/sites/${site_id}/recordings/${recording.id}`}>
              <a className='recording-preview'>
                <PlayerPreview recording={recording} />
                <div className='play-button-wrapper'>
                  <div className='play-button'>
                    <Icon name='play-fill' />
                    Play
                  </div>
                </div>
              </a>
            </Link>
            <ul className='details'>
              <li>
                <span className='name'>Visitor ID</span>
                <span className='value'>
                  <VisitorsStarred site={site} visitor={recording.visitor} />
                </span>
              </li>
              <li>
                <span className='name'>Duration</span>
                <span className='value'>{toTimeString(recording.duration)}</span>
              </li>
              <li>
                <span className='name'>Pages</span>
                <span className='value no-overflow'>
                  <Tooltip positionX='right' button={recording.pageCount} buttonClassName='link'>
                    <ul className='tooltip-list'>
                      {recording.pageViews.map((page, i) => (
                        <li key={page + i}>{page}</li>
                      ))}
                    </ul>
                  </Tooltip>
                </span>
              </li>
              <li>
                <span className='name'>Start URL</span>
                <span className='value'>
                  <Tooltip fluid positionX='right' className='pages' button={recording.startPage}>
                    {recording.startPage}
                  </Tooltip>
                </span>
              </li>
              <li>
                <span className='name'>Exit URL</span>
                <span className='value'>
                  <Tooltip fluid positionX='right' className='pages' button={recording.exitPage}>
                    {recording.exitPage}
                  </Tooltip>
                </span>
              </li>
            </ul>
          </div>
        )}

        {!recording && !loading && (
          <div className='preview-empty-state'>
            <Icon name='time-line' />
            <p>No data available</p>
          </div>
        )}
      </Card>

      <Card className='latest-notes'>
        <h5>
          <Icon name='sticky-note-line' />
          Latest Notes
        </h5>

        {notes.length === 0 && (
          <div className='notes-empty-state'>
            <Icon name='time-line' />
            <p>No data available</p>
          </div>
        )}

        {notes.length > 0 && (
          <>
            <Divider />

            <div className='notes-list'>
              <ul>
                {notes.map(note => (
                  <li key={note.id}>
                    <p className='title'>
                      Recording ID: <Link href={`/sites/${site_id}/recordings/${note.recordingId}`}><a>{note.sessionId}</a></Link>
                    </p>
                    <p className='body'>{note.body}</p>
                    <p className='user'>
                      <Icon name='account-circle-line' />
                      <span>
                        {note.user
                          ? note.user.fullName
                          : 'No user'
                        }
                      </span>
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            <div className='fader' />
          </>
        )}
      </Card>
    </div>
  );
};
