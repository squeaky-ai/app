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
import { ValueOf } from 'types/common';

const reducer = (state: PlayerState, action: Action) => ({ 
  ...state,
  [action.type]: action.value, 
});

const initialState: PlayerState = {
  status: PlayerStatus.PLAYING,
  playbackSpeed: 1,
  activeTab: 0,
  skipInactivity: true,
  zoom: 1,
  eventVisibility: [],
  eventOptions: [],
};

const SitesRecording: NextPage<ServerSideProps> = ({ user }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const { recording, events, error, loading, fetchMoreEvents } = useRecording();

  const fetchAndDispatchValues = (
    preference: Preference,
    type: keyof PlayerState,
    fallback: ValueOf<PlayerState>
  ) => {
    const savedActive = Preferences.getArray<EventName>(preference);

    dispatch({
      type,
      value: savedActive.length === 0 ? fallback : savedActive,
    });
  };

  React.useEffect(() => {
    fetchAndDispatchValues(Preference.EVENTS_OPTIONS_TYPES, 'eventOptions', ['inactivity']);
    fetchAndDispatchValues(Preference.EVENTS_VISIBILITY_TYPES, 'eventVisibility', [...EVENTS.map(a => a.value), 'inactivity']);
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
