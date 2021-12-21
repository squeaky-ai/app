import React from 'react';
import type { FC } from 'react';
import Link from 'next/link';
import classnames from 'classnames';
import { Icon } from 'components/icon';
import { Tooltip } from 'components/tooltip';
import { useToasts } from 'hooks/use-toasts';
import { recordingBookmarked } from 'lib/api/graphql';
import type { Recording, Site } from 'types/graphql';

interface Props {
  link?: boolean;
  site: Site;
  recording: Recording;
}

export const RecordingStarred: FC<Props> = ({ link, site, recording }) => {
  const toasts = useToasts();

  const handleBookmark = async () => {
    try {
      await recordingBookmarked({ 
        siteId: site.id, 
        recordingId: recording.id,
        bookmarked: !recording.bookmarked,
      });
    } catch {
      toasts.add({ type: 'error', body: 'There was an error bookmarking your recording. Please try again.' });
    }
  };

  return (
    <>
      <Tooltip
        button={
          <span onClick={handleBookmark} className={classnames('bookmark', { active: recording.bookmarked })}>
            <Icon name='bookmark-3-line' />
          </span>
        }
        buttonClassName='recording-starred'
      >
        {recording.bookmarked ? 'Bookmarked' : 'Not bookmarked'}
      </Tooltip>
      {link && (
        <Link href={`/sites/${site.id}/recordings/${recording.id}`}>
          <a>
            {recording.sessionId}
          </a>
        </Link>
      )}
      {!link && <span>{recording.sessionId}</span>}
    </>
  );
};
