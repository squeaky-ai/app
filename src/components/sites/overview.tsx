import React from 'react';
import type { FC } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Card } from 'components/card';
import { Tooltip } from 'components/tooltip';
import { Divider } from 'components/divider';
import { PlayerPreview } from 'components/sites/player-preview';
import { useOverview } from 'hooks/use-overview';

export const Overview: FC = () => {
  const router = useRouter();
  const { overview, loading } = useOverview();

  const { site_id } = router.query;

  const notes = overview.notes?.items;
  const recording = overview.recordings?.items[0];

  return (
    <div className='overview-grid'>
      <Card className='visitors'>
        <h3 className='sub-heading'>
          <i className='ri-group-line' />
          Visitors
        </h3>
        <h2>{overview.analytics.visitors}</h2>
        <div className='link'>
          <Link href={`/sites/${site_id}/visitors`}>
            <a>View All</a>
          </Link>
          <i className='ri-arrow-right-line' />
        </div>
      </Card>

      <Card className='recordings'>
        <h3 className='sub-heading'>
          <i className='ri-vidicon-line' />
          Recordings
        </h3>
        <h2>{overview.analytics.recordingsCount}</h2>
        <div className='link'>
          <Link href={`/sites/${site_id}/recordings`}>
            <a>View All</a>
          </Link>
          <i className='ri-arrow-right-line' />
        </div>
      </Card>

      <Card className='pageviews'>
        <h3 className='sub-heading'>
          <i className='ri-pages-line' />
          Page Views
        </h3>
        <h2>{overview.analytics.pageViews}</h2>
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
                <span>Visitor ID</span>
                <span>{recording.visitorId}</span>
              </li>
              <li>
                <span>Duration</span>
                <span>{recording.duration}</span>
              </li>
              <li>
                <span>Pages</span>
                <span className='no-overflow'>
                  <Tooltip button={recording.pageCount} buttonClassName='link'>
                    <ul className='tooltip-list'>
                      {recording.pageViews.map((page, i) => (
                        <li key={page + i}>{page}</li>
                      ))}
                    </ul>
                  </Tooltip>
                </span>
              </li>
              <li>
                <span>Start URL</span>
                <span>{recording.startPage}</span>
              </li>
              <li>
                <span>Exit URL</span>
                <span>{recording.exitPage}</span>
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
