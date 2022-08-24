import React from 'react';
import type { FC } from 'react';
import { Replayer } from 'rrweb';
import type { Event } from 'types/event';

interface Props {
  events: Event[];
}

export const PlayerPreview: FC<Props> = ({ events }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = React.useState<number>(1);

  const squidgeToFit = (replayer: Replayer) => setTimeout(() => {
    const { height, width } = ref.current.getBoundingClientRect();

    const constraint = Math.min(
      width / Number(replayer.iframe.width),
      height / Number(replayer.iframe.height),
    );

    setZoom(constraint);

    // Can't have users tabbing around in there!
    ref.current.querySelector('iframe').setAttribute('tabindex', '-1');
  }, 0);

  React.useEffect(() => {
    if (events.length === 0) return undefined;

    const replayer = new Replayer(events, {
      root: document.getElementById('preview-wrapper'),
      skipInactive: true,
      mouseTail: false,
      pauseAnimation: false,
    });

    squidgeToFit(replayer);
  }, []);

  return (
    <div ref={ref}>
      <div id='preview-wrapper' className='preview-container' style={{ transform: `scale(${zoom})` }} />
    </div>
  );
};
