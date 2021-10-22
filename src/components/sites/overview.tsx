import React from 'react';
import type { FC } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Card } from 'components/card';
import { Tooltip } from 'components/tooltip';
import { Divider } from 'components/divider';
import { PlayerPreview } from 'components/sites/player-preview';
import { VisitorStarred } from 'components/sites/visitor-starred';
import { useOverview } from 'hooks/use-overview';
import { toTimeString } from 'lib/dates';
import type { Site } from 'types/site';
import { Pill } from 'components/pill';
import { Spinner } from 'components/spinner';
import { OverviewActiveVisitorsCount } from 'components/sites/overview-active-visitors-count';

interface Props {
  site: Site;
}

export const Overview: FC<Props> = ({ site }) => {
  const router = useRouter();
  const { overview, loading } = useOverview();

  const { site_id } = router.query;

  const notes = overview.notes?.items;
  const recording = overview.recordingLatest;

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className='overview-grid'>
      <OverviewActiveVisitorsCount site={site} />

      <Card className='visitors'>
        <h3 className='sub-heading'>
          <i className='ri-group-line' />
          Visitors
        </h3>
        <h2>
          {overview.analytics.visitorsCount.total.toLocaleString()}
        </h2>
        <div className='bottom'>
          <Pill type='tertiary'>{overview.analytics.visitorsCount.new} New</Pill>

          <div className='link'>
            <Link href={`/sites/${site_id}/visitors`}>
              <a>View</a>
            </Link>
            <i className='ri-arrow-right-line' />
          </div>
        </div>
      </Card>

      <Card className='recordings'>
        <h3 className='sub-heading'>
          <i className='ri-vidicon-line' />
          Recordings
        </h3>
        <h2>
          {overview.analytics.recordingsCount.total.toLocaleString()}
        </h2>
        <div className='bottom'>
          <Pill type='tertiary'>{overview.analytics.recordingsCount.new} New</Pill>

          <div className='link'>
            <Link href={`/sites/${site_id}/recordings`}>
              <a>View</a>
            </Link>
            <i className='ri-arrow-right-line' />
          </div>
        </div>
      </Card>

      <Card className='pageviews'>
        <h3 className='sub-heading'>
          <i className='ri-pages-line' />
          Page Views
        </h3>
        <h2>{overview.analytics.pageViewCount.toLocaleString()}</h2>
        <div className='link'>
          <Link href={`/sites/${site_id}/analytics`}>
            <a>Analytics</a>
          </Link>
          <i className='ri-arrow-right-line' />
        </div>
      </Card>

      <Card className='latest-recording'>
        <h3 className='sub-heading'>
          Latest Recording
        </h3>

        {recording && (
          <div className='preview'>
            <Link href={`/sites/${site_id}/recordings/${recording.id}`}>
              <a className='recording-preview'>
                <PlayerPreview recording={recording} />
                <div className='play-button-wrapper'>
                  <div className='play-button'>
                    <i className='ri-play-fill' />
                    Play
                  </div>
                </div>
              </a>
            </Link>
            <ul className='details'>
              <li>
                <span className='name'>Visitor ID</span>
                <span className='value'>
                  <VisitorStarred site={site} visitor={recording.visitor} />
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
            <i className='ri-time-line' />
            <p>No data available</p>
          </div>
        )}
      </Card>

      <Card className='latest-notes'>
        <h3 className='sub-heading'>
          <i className='ri-sticky-note-line' />
          Latest Notes
        </h3>

        {notes.length === 0 && (
          <div className='notes-empty-state'>
            <i className='ri-time-line' />
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
                      <i className='ri-account-circle-line' />
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
