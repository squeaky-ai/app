import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import { useRouter } from 'next/router';
import { Icon } from 'components/icon';
import { Button } from 'components/button';
import { usePrevAndNextRecording } from 'hooks/use-prev-and-next-recording';
import type { Recording } from 'types/graphql';

interface Props {
  recording: Recording;
}

export const PlayerDetails: FC<Props> = ({ recording }) => {
  const router = useRouter();

  const { next, prev } = usePrevAndNextRecording({ recording });

  const viewPrevious = async () => {
    if (prev) await router.push(prev);
  };

  const viewNext = async () => {
    if (next) await router.push(next);
  };

  return (
    <div className='recording-details'>
      <Button onClick={viewPrevious} className={classnames({ disabled: !prev })}>
        <Icon name='arrow-left-line' />
      </Button>
        <span className='session'> #{recording?.sessionId}</span>
      <Button onClick={viewNext} className={classnames({ disabled: !next })}>
        <Icon name='arrow-right-line' />
      </Button>
    </div>
  );
};
