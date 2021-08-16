import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import type { Replayer } from 'rrweb';
import { useRouter } from 'next/router';
import { ServerSideProps, getServerSideProps } from 'lib/auth';
import { PlayerWrapper } from 'components/sites/player-wrapper';
import { useRecording } from 'hooks/use-recording';
import { initReplayer } from 'lib/replayer';
import type { Event } from 'types/event';
import type { PlayerState, Action } from 'types/player';
import type { Recording } from 'types/recording';

let replayer: Replayer = null;
let nextPageTimer: NodeJS.Timer;

const reducer = (state: PlayerState, action: Action) => {
  return { ...state, [action.type]: action.value };
};

const initialState: PlayerState = {
  failed: false,
  playing: false,
  playbackSpeed: 1,
  activeTab: null,
  skipInactivity: true,
  zoom: 1,
};

const SitesRecording: NextPage<ServerSideProps> = ({ user }) => {
  const router = useRouter();

  const [page, setPage] = React.useState<number>(1);
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const { recording } = useRecording({ page });

  React.useEffect(() => {
    // Keep on trying to init the app, if it succeeds 
    // then it will return immediately
    replayer = initReplayer({
      replayer,
      recording,
      failed: state.failed,
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
      dispatch({ type: 'failed', value: false });
    };
  }, [router.query.recording_id]);

  React.useEffect(() => {
    if (!recording) return;

    const { items, pagination } = recording.events;
    const { currentPage, totalPages } = pagination;

    const events: Event[] = items.map(i => JSON.parse(i));
    
    if (replayer) {
      // Shove the new events into the replayer
      console.log(events);
      // events.forEach(e => replayer.addEvent(e));
    }

    if (currentPage < totalPages) {
      // We can't load all of the events in one go as there's
      // potentially hundreds of thousands. This is a dumb way
      // to incrementally load them all. This will need to change
      // to load the next batch as the play time gets close
      nextPageTimer = setTimeout(() => {
        setPage(currentPage + 1);
      }, 3000);
    }
  }, [recording?.events?.pagination?.currentPage || 1]);

  return (
    <>
      <Head>
        <title>Squeaky / Site Player</title>
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
