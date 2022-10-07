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
import { Error } from 'components/error';
import { PageLoading } from 'components/sites/page-loading';
import { ActiveVisitors } from 'components/sites/active-visitors';
import { useDashboard } from 'hooks/use-dashboard';
import { toTimeString } from 'lib/dates';
import { getDateRange } from 'lib/dates';
import type { Site, Team } from 'types/graphql';
import type { TimePeriod } from 'types/common';

interface Props {
  site: Site;
  member?: Team;
  period: TimePeriod;
}

export const Dashboard: FC<Props> = ({ site, member, period }) => {
  const router = useRouter();
  const { 
    notes,
    analytics,
    recordingLatest,
    recordingLatestEvents,
    error,
    loading 
  } = useDashboard({ range: getDateRange(period) });

  const { site_id } = router.query;

  if (error) {
    return <Error />;
  }

  if (loading) {
    return <PageLoading />
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
          {analytics.visitorsCount.total.toLocaleString()}
        </h2>
        <div className='bottom'>
          <Pill type='tertiary'>{analytics.visitorsCount.new.toLocaleString()} New</Pill>

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
          {analytics.recordingsCount.total.toLocaleString()}
        </h2>
        <div className='bottom'>
          <Pill type='tertiary'>{analytics.recordingsCount.new.toLocaleString()} New</Pill>

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
        <h2>{analytics.pageViewCount.toLocaleString()}</h2>
        <div className='link'>
          <Link href={`/sites/${site_id}/analytics/site/traffic`}>
            <a>Analytics</a>
          </Link>
          <Icon name='arrow-right-line' />
        </div>
      </Card>

      <Card className='latest-recording'>
        <h5>
          Latest Recording
        </h5>

        {recordingLatest && (
          <div className='preview'>
            <Link href={`/sites/${site_id}/recordings/${recordingLatest.id}`}>
              <a className='recording-preview'>
                <PlayerPreview events={recordingLatestEvents} />
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
                  <VisitorsStarred site={site} member={member} visitor={recordingLatest.visitor} />
                </span>
              </li>
              <li>
                <span className='name'>Duration</span>
                <span className='value'>{toTimeString(recordingLatest.duration)}</span>
              </li>
              <li>
                <span className='name'>Pages</span>
                <span className='value no-overflow'>
                  <Tooltip positionX='right' button={recordingLatest.pageCount} buttonClassName='link'>
                    <ul className='tooltip-list'>
                      {recordingLatest.pageViews.map((page, i) => (
                        <li key={page + i}>{page}</li>
                      ))}
                    </ul>
                  </Tooltip>
                </span>
              </li>
              <li>
                <span className='name'>Start URL</span>
                <span className='value'>
                  <Tooltip fluid positionX='right' className='pages' button={recordingLatest.startPage}>
                    {recordingLatest.startPage}
                  </Tooltip>
                </span>
              </li>
              <li>
                <span className='name'>Exit URL</span>
                <span className='value'>
                  <Tooltip fluid positionX='right' className='pages' button={recordingLatest.exitPage}>
                    {recordingLatest.exitPage}
                  </Tooltip>
                </span>
              </li>
            </ul>
          </div>
        )}

        {!recordingLatest && !loading && (
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

        {notes.items.length === 0 && (
          <div className='notes-empty-state'>
            <Icon name='time-line' />
            <p>No data available</p>
          </div>
        )}

        {notes.items.length > 0 && (
          <>
            <Divider />

            <div className='notes-list'>
              <ul>
                {notes.items.map(note => (
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
