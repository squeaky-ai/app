import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { ServerSideProps, getServerSideProps } from 'lib/auth';
import { NotFound } from 'components/sites/not-found';
import { Error } from 'components/error';
import { PlayerWrapper } from 'components/sites/player/player-wrapper';
import { useRecording } from 'hooks/use-recording';
import { PlayerState, Action, PlayerStatus } from 'types/player';

const reducer = (state: PlayerState, action: Action) => ({ 
  ...state,
  [action.type]: action.value, 
});

const initialState: PlayerState = {
  status: PlayerStatus.PLAYING,
  playbackSpeed: 1,
  activeTab: 0,
  skipInactivity: true,
  incomplete: false,
  zoom: 1,
};

const SitesRecording: NextPage<ServerSideProps> = ({ user }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const { recording, error, loading, fetchMoreEvents } = useRecording();

  if (error) {
    return <Error />;
  }

  if (!loading && !recording) {
    return <NotFound />;
  }

  if (!loading && !recording.events.items.length) {
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
        recording={recording}
        dispatch={dispatch}
        fetchMoreEvents={fetchMoreEvents}
      />
    </>
  );
};

export default SitesRecording;
export { getServerSideProps };
