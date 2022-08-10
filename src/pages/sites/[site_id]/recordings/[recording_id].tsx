import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { ServerSideProps, getServerSideProps } from 'lib/auth';
import { NotFound } from 'components/sites/not-found';
import { Error } from 'components/error';
import { PlayerWrapper } from 'components/sites/player/player-wrapper';
import { useRecording } from 'hooks/use-recording';
import { PlayerState, Action, PlayerStatus } from 'types/player';
import { Preference, Preferences } from 'lib/preferences';
import { EVENTS } from 'data/recordings/constants';
import type { EventName } from 'types/event';

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
  eventVisibility: [],
};

const SitesRecording: NextPage<ServerSideProps> = ({ user }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const { recording, events, error, loading, fetchMoreEvents } = useRecording();

  React.useEffect(() => {
    const savedActive = Preferences.getArray<EventName>(Preference.EVENTS_SHOW_TYPES);
    // If they have anything stored in the preferences then
    // show that, otherwise default to showing all of the types
    dispatch({
      type: 'eventVisibility',
      value: savedActive.length === 0 ? EVENTS.map(a => a.value) : savedActive,
    });
  }, []);

  if (error) {
    return <Error />;
  }

  if (!loading && !recording) {
    return <NotFound />;
  }

  if (!loading && !events.length) {
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
        events={events}
        recording={recording}
        dispatch={dispatch}
        fetchMoreEvents={fetchMoreEvents}
      />
    </>
  );
};

export default SitesRecording;
export { getServerSideProps };
