import React from 'react';
import type { FC } from 'react';
import { useRouter } from 'next/router';
import { Icon } from 'components/icon';
import { Button } from 'components/button';
import { useHistory } from 'hooks/use-history';
import type { Site } from 'types/graphql';

interface Props {
  site: Site;
}

export const PlayerClose: FC<Props> = ({ site }) => {
  const router = useRouter();
  const { history } = useHistory();

  const onBackButton = () => {
    // The last url will be the current one,
    // so go back one further
    const prevRoute = history[history.length - 2];

    router.push(prevRoute?.path || `/sites/${site.id}/recordings`);
  };

  return (
    <div className='recording-actions'>
      <Button className='close' onClick={onBackButton}>
        <Icon name='close-line' />
      </Button>
    </div>
  );
};
