import React from 'react';
import type { FC } from 'react';
import { Spinner } from 'components/spinner';
import { useReplayer } from 'hooks/replayer';
import { usePlayerState } from 'hooks/player-state';

export const Player: FC = React.memo(() => {
  const ref = React.useRef<HTMLDivElement>(null);

  const [replayer, init] = useReplayer();
  const [state, dispatch] = usePlayerState();

  React.useEffect(() => {
    if (!state.recording) return;

    init(ref.current, state.recording);

    const container = document.getElementById('player');

    const { width, height } = container.getBoundingClientRect();
    const { viewportX, viewportY } = state.recording;

    let multiplier = 1;

    // Keep shrinking the multiplier until the viewport of the player
    // window fits inside the bounds of the page
    while((viewportX * multiplier) > width || (viewportY * multiplier) > height) {
      multiplier -= .1;
    }

    // Once JS gets to .4, the precision goes to shit and it ends up
    // as 0.40000000000000013, so it must be fixed (to a string?! 🤦‍♂️)
    // and then cast back to a number
    dispatch({ type: 'zoom', value: Number(multiplier.toFixed(1)) });
  }, [state.recording]);

  return (
    <main id='player'>
      <div className='player-container' ref={ref} style={{ transform: `scale(${state.zoom})` }}>
        {!replayer && <Spinner />}
      </div>
    </main>
  );
});

