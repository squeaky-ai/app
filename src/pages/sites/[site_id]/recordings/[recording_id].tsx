import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import type { Replayer } from 'rrweb';
import { useRouter } from 'next/router';
import { ServerSideProps, getServerSideProps } from 'lib/auth';
import { NotFound } from 'components/sites/not-found';
import { Error } from 'components/error';
import { PlayerWrapper } from 'components/sites/player-wrapper';
import { useRecording } from 'hooks/use-recording';
import { initReplayer } from 'lib/replayer';
import { PlayerState, Action, PlayerStatus } from 'types/player';

let replayer: Replayer = null;
let nextPageTimer: NodeJS.Timer;

const reducer = (state: PlayerState, action: Action) => ({ 
  ...state,
  [action.type]: action.value 
});

const initialState: PlayerState = {
  status: PlayerStatus.PLAYING,
  playbackSpeed: 1,
  activeTab: null,
  skipInactivity: true,
  zoom: 1,
};

const SitesRecording: NextPage<ServerSideProps> = ({ user }) => {
  const router = useRouter();
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const { recording, error, loading, fetchMoreEvents } = useRecording();

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
      items.forEach((e) => replayer.addEvent(JSON.parse(e)));

      // Start replaying now that there is more stuff to show
      replayer.play(replayer.getCurrentTime());

      // Recursively call it again, if it's been exceeded then
      // it will return early
      processNextBatchOfEvents(page + 1);
    }, 3000);
  };

  React.useEffect(() => {
    // Keep on trying to init the app, if it succeeds 
    // then it will return immediately
    replayer = initReplayer({
      replayer,
      recording,
      failed: state.status === PlayerStatus.FAILED,
      dispatch,
    });
  });

  React.useEffect(() => {
    return () => {
      // When this component unmounts the replayer should be
      // completely destroyed
      replayer?.pause();
      replayer = null;
      // Clean up the contents of the div (this is not controlled
      // by react, it's injected by the player)
      document.querySelector('.replayer-wrapper')?.remove();
      // This could go on for a while and must be cancelled
      clearTimeout(nextPageTimer);
      dispatch({ type: 'status', value: PlayerStatus.FAILED });
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

  if (error) {
    return <Error />;
  }

  if (!loading && !recording) {
    return <NotFound />;
  }

  return (
    <>
      <Head>
        <title>Squeaky | Site Player</title>
      </Head>

      <PlayerWrapper 
        user={user} 
        state={state}
        replayer={replayer} 
        recording={recording}
        dispatch={dispatch}
      />
    </>
  );
};

export default SitesRecording;
export { getServerSideProps };
