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
  const [page, _setPage] = React.useState<number>(1);
  const { recording } = useRecording({ page });

  const [state, dispatch] = React.useReducer(reducer, initialState);

  const init = (): void => {
    if (replayer || !recording || state.failed) { 
      // We don't want to be creating more than 1! But at the same
      // time there are multiple times when it could be ready to
      // init, so the responsibility falls here to make sure it
      // returns early
      return;
    }

    const element = document.querySelector('.player-container');

    if (!element) {
      // The recording is ready, but the DOM is not. We should 
      // wait until the div exists before trying to init the replayer
      // or it will cry
      return;
    }

    const events: Event[] = JSON.parse(recording.events.items);

    if (events.length === 0) {
      // Shouldn't be possible to create a recording without events
      // but someone could have deleted something
      dispatch({ type: 'failed', value: true });
      return;
    }

    replayer = initReplayer({
      events,
      element,
      dispatch
    });

    replayer.play();
  };

  React.useEffect(() => {
    // Keep on trying to init the app, if it succeeds 
    // then it will return immediately
    init();
  });
  
  React.useEffect(() => {
    // Clean up between page views as the replayer lives in 
    // the global state
    return () => {
      replayer?.pause();
      document.querySelector('.replayer-wrapper')?.remove();
      replayer = null;
    };
  }, []);

  React.useEffect(() => {
    if (!recording) return;

    const { currentPage, totalPages } = recording.events.pagination;
    console.log(`Currently loaded page ${currentPage} of ${totalPages}`);
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
