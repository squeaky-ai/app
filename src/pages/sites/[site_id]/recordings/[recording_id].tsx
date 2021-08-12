import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import type { Replayer } from 'rrweb';
import { ServerSideProps, getServerSideProps } from 'lib/auth';
import { PlayerWrapper } from 'components/sites/player-wrapper';
import { useRecording } from 'hooks/use-recording';
import { initReplayer } from 'lib/replayer';
import type { Event } from 'types/event';
import type { PlayerState, Action } from 'types/player';

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
  events: [],
  zoom: 1,
};

const SitesRecording: NextPage<ServerSideProps> = ({ user }) => {
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
    // Clean up between page views as the replayer lives in 
    // the global state
    return () => {
      replayer?.pause();
      document.querySelector('.replayer-wrapper')?.remove();
      replayer = null;

      // This could go on for a while and must be cancelled
      clearTimeout(nextPageTimer);
    };
  }, []);

  React.useEffect(() => {
    if (!recording) return;

    const { items, pagination } = recording.events;
    const { currentPage, totalPages } = pagination;

    const events: Event[] = JSON.parse(items);
    // Append the events to the list of the other events so that the
    // sidebar has the complete picture
    dispatch({ type: 'events', value: [...state.events, ...events] });
    
    if (replayer) {
      // Shove the new events into the replayer
      events.forEach(e => replayer.addEvent(e));
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
  }, [recording?.events?.pagination?.currentPage || 0]);

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
