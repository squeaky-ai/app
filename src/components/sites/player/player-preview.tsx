import React from 'react';
import type { FC } from 'react';
import { Replayer } from 'rrweb';
import type { Event } from 'types/event';
import type { Recording } from 'types/graphql';

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

    new Replayer(items, {
      root: document.getElementById('preview-wrapper'),
      skipInactive: true,
      mouseTail: false,
    });

    const { width } = ref.current.getBoundingClientRect();

    setScale(`scale(${width / viewportX})`);

    // Can't have users tabbing around in there!
    ref.current.querySelector('iframe').setAttribute('tabindex', '-1');
  }, []);

  return (
    <div ref={ref}>
      <div className='preview-container' style={{ transform: scale }}>
        <div id='preview-wrapper' style={{ width: `${viewportX}px`, height: `${viewportY}px` }} />
      </div>
    </div>
  );
};
