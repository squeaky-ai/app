import React from 'react';
import type { FC } from 'react';
import { PlayerIframe } from 'components/sites/player-iframe';
import { usePlayerState } from 'hooks/player-state';
import type { Site } from 'types/site';

interface Props {
  site: Site;
}

const Player: FC<Props> = React.memo(({ site }) => {
  const [state] = usePlayerState();

  return (
    <PlayerIframe
      site={site}
      events={state.recording.events}
      playing={state.playing}
      progress={state.progress}
      height={state.recording.viewportY}
      width={state.recording.viewportX}
      zoom={state.zoom}
    />
  );
});

export default Player;
