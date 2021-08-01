import React from 'react';
import type { FC } from 'react';
import { debounce } from 'lodash';
import { useRouter } from 'next/router';
import { Spinner } from 'components/spinner';
import { useReplayer } from 'hooks/replayer';
import { usePlayerState } from 'hooks/player-state';
import { recordingViewed } from 'lib/api/graphql';

const MAIN_PADDING_SIZE = 24;

export const Player: FC = React.memo(() => {
  const router = useRouter();
  const ref = React.useRef<HTMLDivElement>(null);

  const [replayer, init] = useReplayer();
  const [state, dispatch] = usePlayerState();

  const markAsViewed = async () => {
    if (state.recording && !state.recording.viewed) {
      await recordingViewed({ 
        siteId: router.query.site_id as string,
        recordingId: state.recording.id 
      });
    }
  };

  function squidgeToFit() {
    const container = document.getElementById('player');

    if (!container) return;

    const { width, height } = container.getBoundingClientRect();
    const { viewportX, viewportY } = state.recording;

    let multiplier = 1;

    // Keep shrinking the multiplier until the viewport of the player
    // window fits inside the bounds of the page
    while((viewportX * multiplier) > (width - MAIN_PADDING_SIZE) || (viewportY * multiplier) > (height - MAIN_PADDING_SIZE)) {
      multiplier -= .1;
    }

    // Once JS gets to .4, the precision goes to shit and it ends up
    // as 0.40000000000000013, so it must be fixed (to a string?! 🤦‍♂️)
    // and then cast back to a number
    dispatch({ type: 'zoom', value: Number(multiplier.toFixed(1)) });
  }

  React.useEffect(() => {
    const container = document.getElementById('player');

    const observer = new ResizeObserver(debounce(() => {
      if (state.recording) {
        squidgeToFit();
      }
    }, 100));

    observer.observe(container);

    return () => { observer.disconnect() };
  }, []);

  React.useEffect(() => {
    if (!state.recording) return;

    init(ref.current, state.recording);
    // Work out the sizing once it's loaded
    squidgeToFit();
    // Fire and forget here, should be okay
    markAsViewed();
  }, [state.recording]);

  return (
    <main id='player'>
      <div className='player-container' ref={ref} style={{ transform: `scale(${state.zoom})` }}>
        {!replayer && <Spinner />}
      </div>
    </main>
  );
});

Player.displayName = 'Player';
