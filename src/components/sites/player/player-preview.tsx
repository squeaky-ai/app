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
  const [zoom, setZoom] = React.useState<number>(1);

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

    const { height, width } = ref.current.getBoundingClientRect();

    const constraint = Math.min(
      width / viewportX,
      height / viewportY,
    );

    setZoom(Number(constraint.toFixed(1)));

    // Can't have users tabbing around in there!
    ref.current.querySelector('iframe').setAttribute('tabindex', '-1');
  }, []);

  return (
    <div ref={ref}>
      <div id='preview-wrapper' className='preview-container' style={{ transform: `scale(${zoom})` }} />
    </div>
  );
};
