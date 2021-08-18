import React from 'react';
import type { FC } from 'react';
import { Replayer } from 'rrweb';
import type { Event } from 'types/event';
import type { Recording } from 'types/recording';

interface Props {
  recording: Recording;
}

export const PlayerPreview: FC<Props> = ({ recording }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [scale, setScale] = React.useState<string>('');

  const { viewportX, viewportY, events } = recording;

  React.useEffect(() => {
    const items: Event[] = events.items.map(e => JSON.parse(e));

    if (items.length === 0) return;

    const replayer = new Replayer(items, {
      root: document.getElementById('preview-wrapper'),
      skipInactive: true,
      mouseTail: false,
    });

    let multiplier = 1;

    const { width } = ref.current.getBoundingClientRect();

    while((viewportX * multiplier) > width) {
      multiplier -= .01;
    }

    setScale(`scale(${Number(multiplier.toFixed(1))})`);

    replayer.play();
  }, []);

  return (
    <div ref={ref} className='preview-container' style={{ transform: scale }}>
      <div id='preview-wrapper' style={{ width: `${viewportX}px`, height: `${viewportY}px` }}>

      </div>
    </div>
  );
};
