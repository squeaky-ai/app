import React from 'react';
import type { FC } from 'react';
import Link from 'next/link';
import classnames from 'classnames';
import { useRouter } from 'next/router';
import { Button } from 'components/button';
import { recordingDelete, recordingBookmarked } from 'lib/api/graphql';
import { useToasts } from 'hooks/toasts';
import type { Site } from 'types/site';
import type { Recording } from 'types/recording';

interface Props {
  site: Site;
  recording: Recording;
}

export const PlayerActions: FC<Props> = ({ site, recording }) => {
  const toast = useToasts();
  const router = useRouter();

  const handleDelete = async () => {
    try {
      await recordingDelete({ 
        siteId: site.id, 
        recordingId: recording.id 
      });

      await router.push(`/sites/${site.id}/recordings`);

      toast.add({ type: 'success', body: 'Recording deleted' });
    } catch {
      toast.add({ type: 'error', body: 'There was an error deleteing your recording. Please try again.' });
    }
  };

  const handleBookmark = async () => {
    try {
      await recordingBookmarked({ 
        siteId: site.id, 
        recordingId: recording.id,
        bookmarked: !recording.bookmarked,
      });
    } catch {
      toast.add({ type: 'error', body: 'There was an error bookmarking your recording. Please try again.' });
    }
  };

  return (
    <div className='recording-actions'>
      <Link href={`/sites/${site.id}/recordings`}>
        <a className='button'>
          <i className='ri-close-line' />
        </a>
      </Link>
      <Button onClick={handleBookmark} className={classnames('boookmark', { active: recording?.bookmarked })}>
        <i className='ri-bookmark-3-line' />
      </Button>
      <Button onClick={handleDelete} className='delete'>
        <i className='ri-delete-bin-line' />
      </Button>
    </div>
  );
};
