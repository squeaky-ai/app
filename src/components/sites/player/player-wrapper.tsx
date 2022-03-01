import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import { useRouter } from 'next/router';
import { Page } from 'components/sites/page';
import { Player } from 'components/sites/player/player';
import { Header } from 'components/header';
import { Spinner } from 'components/spinner';
import { BreadCrumbs } from 'components/sites/breadcrumbs';
import { PlayerActions } from 'components/sites/player/player-actions';
import { PlayerDetails } from 'components/sites/player/player-details';
import { PlayerFooter } from 'components/sites/player/player-footer';
import { Error } from 'components/error';
import { PlayerState, PlayerStatus } from 'types/player';
import type { User, Recording, RecordingsEvents } from 'types/graphql';
import type { Action } from 'types/player';

interface Props {
  user: User;
  state: PlayerState;
  recording: Recording;
  dispatch: React.Dispatch<Action>;
  fetchMoreEvents: (eventPage: number) => Promise<RecordingsEvents>;
}

let nextPageTimer: NodeJS.Timer;

export const PlayerWrapper: FC<Props> = ({ user, state, recording, dispatch, fetchMoreEvents }) => {
  const router = useRouter();
  const ref = React.useRef<Player>(null);

  const processNextBatchOfEvents = (page: number): void => {
    nextPageTimer = setTimeout(async () => {
      const { totalPages } = recording.events.pagination;

      // All of them are loaded now
      if (page > totalPages) return;
      // Fetch the next batch of events, and add them to the
      // replayer. There's no need to manage the events as 
      // part of the recording as the InMemoryCache will take
      // care of it
      const { items } = await fetchMoreEvents(page);
      items.forEach((e) => ref.current.replayer.addEvent(JSON.parse(e)));

      // // Start replaying now that there is more stuff to show
      ref.current.replayer.play(ref.current.replayer.getCurrentTime());

      // Recursively call it again, if it's been exceeded then
      // it will return early
      processNextBatchOfEvents(page + 1);
    }, 3000);
  };

  React.useEffect(() => {
    return () => {
      // This could go on for a while and must be cancelled
      clearTimeout(nextPageTimer);
      dispatch({ type: 'status', value: PlayerStatus.PLAYING });
    };
  }, [router.query.recording_id]);

  React.useEffect(() => {
    if (!recording) return;

    const { currentPage, totalPages } = recording.events.pagination;

    // We already have all the events to bail
    if (currentPage >= totalPages) return;
    // We can't load all of the events in one go as there's
    // potentially hundreds of thousands. This is a dumb way
    // to incrementally load them all. This will need to change
    // to load the next batch as the play time gets close
    processNextBatchOfEvents(2);
  }, [recording?.id]);

  if (state.status === PlayerStatus.FAILED) {
    return <Error />;
  }

  return (
    <div className={classnames('player-page', { open: state.activeTab !== null })}>
      <Page user={user} scope={[]}>
        {({ site, member }) => (
          <>
            <Header className='site-header'>
              <BreadCrumbs 
                site={site} 
                items={[{ name: 'Recordings', href: `/sites/${site.id}/recordings` }]} 
              />

              <PlayerDetails site={site} recording={recording} />
              <PlayerActions site={site} member={member} recording={recording} />
            </Header>

            {!recording && (
              <main id='player'>
                <Spinner />
              </main>
            )}
            
            {!!recording && (
              <Player
                key={`player-${recording.id}`} 
                ref={ref}
                site={site}
                state={state}
                recording={recording}
                dispatch={dispatch}
              />
            )}

            <PlayerFooter
              state={state}
              site={site}
              replayer={ref.current?.replayer}
              recording={recording}
              dispatch={dispatch}
            />
          </>
        )}
      </Page>
    </div>
  );
};
