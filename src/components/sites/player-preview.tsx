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

  const { device, events } = recording;
  const { viewportX, viewportY } = device;

  React.useEffect(() => {
    const items: Event[] = events.items.map(e => JSON.parse(e));

    if (items.length === 0) return undefined;

    const replayer = new Replayer(items, {
      root: document.getElementById('preview-wrapper'),
      skipInactive: true,
      mouseTail: false,
    });

    const { height } = ref.current.getBoundingClientRect();

    setScale(`scale(${height / viewportY})`);

    replayer.play();

    // Can't have users tabbing around in there!
    ref.current.querySelector('iframe').setAttribute('tabindex', '-1');

    return () => {
      replayer?.pause();
    };
  }, []);

  return (
    <div ref={ref} className='preview-container' style={{ transform: scale }}>
      <div id='preview-wrapper' style={{ width: `${viewportX}px`, height: `${viewportY}px` }} />
    </div>
  );
};
