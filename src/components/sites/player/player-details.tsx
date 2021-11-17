import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import { useRouter } from 'next/router';
import { Button } from 'components/button';
import type { Site } from 'types/site';
import type { Recording } from 'types/recording';
import { Pill } from 'components/pill';

interface Props {
  site: Site;
  recording: Recording;
}

export const PlayerDetails: FC<Props> = ({ site, recording }) => {
  const router = useRouter();

  const viewPrevious = async () => {
    if (recording.previousRecording) {
      await router.push(`/sites/${site.id}/recordings/${recording.previousRecording.id}`);
    }
  };

  const viewNext = async () => {
    if (recording.nextRecording) {
      await router.push(`/sites/${site.id}/recordings/${recording.nextRecording.id}`);
    }
  };

  return (
    <div className='recording-details'>
      <Button onClick={viewPrevious} className={classnames({ disabled: !recording?.previousRecording })}>
        <i className='ri-arrow-left-s-line' />
      </Button>
        <span className='session'> #{recording?.sessionId}</span>
        {recording?.viewed
          ? <Pill type='secondary'>Viewed</Pill>
          : <Pill type='tertiary'>New</Pill>
        }
      <Button onClick={viewNext} className={classnames({ disabled: !recording?.nextRecording })}>
        <i className='ri-arrow-right-s-line' />
      </Button>
    </div>
  );
};
