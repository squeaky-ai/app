import React from 'react';
import type { FC } from 'react';
import { Replayer } from 'rrweb';
import { Spinner } from 'components/spinner';
import { ScrollIndicator } from 'components/sites/scroll-indicator';
import { useRecording } from 'hooks/use-heatmaps';
import { showClickMaps, showScrollMaps } from 'lib/heatmaps';
import type { Event } from 'types/event';
import type { HeatmapsItem, HeatmapsType, HeatmapsDevice } from 'types/graphql';

interface Props {
  type: HeatmapsType;
  device: HeatmapsDevice;
  page: string;
  recordingId: string;
  items: HeatmapsItem[];
}

let replayer: Replayer;

export const HeatmapsPage: FC<Props> = ({ type, device, page, recordingId, items }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [loading, setLoading] = React.useState<boolean>(true);

  const { error, recording } = useRecording(recordingId);

  const init = () => {
    if (!recording) return;

    if (replayer) {
      destroy();
    }

    const items: Event[] = recording.events.items.map(e => JSON.parse(e));
    const root = document.getElementById('heatmaps-page-wrapper');

    if (items.length === 0) return;

    // Find where exactly this page is in the list, and try and find
    // a timestamp that is just before the user navigates away. This
    // should ensure that we have the complete page
    const offset = items[0].timestamp;
    const timestamp = recording.pages.find(p => p.url === page)?.exitedAt;
    const location = Number(timestamp) - offset - 50;

    if (!timestamp) {
      return destroy();
    }

    replayer = new Replayer(items, {
      root,
      skipInactive: true,
      mouseTail: false,
    });

    // They need to be able to scroll
    const iframe = root.querySelector('iframe');
    iframe.setAttribute('scrolling', 'true');

    // Pause at the location where we think the page is
    replayer.pause(location);

    // Inject all the crap into the iframe
    inject(iframe.contentDocument);
  };

  const cleanup = (doc: Document) => {
    const elems = doc.querySelectorAll('*[class^=__squeaky');
    elems.forEach(elem => elem.remove());
  };

  const deviceWidth = () => {
    switch(device) {
      case 'Desktop':
        return '1280px';
      case 'Tablet':
        return '800px';
      case 'Mobile':
        return '360px';
      default:
        return '100%';
    }
  };

  const inject = (doc: Document) => setTimeout(() => {
    cleanup(doc);

    doc.documentElement.scrollTo(0, 0);
    doc.body.style.cssText += 'pointer-events: none; user-select: none;';
    doc.head.innerHTML += `<style>.squeaky-hide { visibility: hidden; }</style>`;

    type === 'Click' 
      ? showClickMaps(doc, items)
      : showScrollMaps(doc, items);

    // Now that stuff isn't going to jump the spinner can be removed
    setLoading(false);
  }, 250);

  const draw = () => {
    const doc = document.querySelector('iframe')?.contentDocument;
    if (doc) inject(doc);
  };

  const destroy = () => {
    document.getElementById('heatmaps-page-wrapper').innerHTML = '';
    replayer = null;
  };

  // Rebuild the replayer whenever the recording id or page changes.
  // The loading state should start again as it can take some time
  // between pages if the recording itself needs to change
  React.useEffect(() => {
    setLoading(true);
    init();
  }, [recording?.id, page]);

  // Redraw the tags inside the iframe whenever the type or
  // items change 
  React.useEffect(() => {
    draw();
  }, [type, items]);

  React.useEffect(() => {
    return () => {
      replayer = null;
    };
  }, []);

  if (error) {
    return <p>There was an error</p>;
  }

  return (
    <div ref={ref} className='heatmaps-page'>
      {loading && <Spinner />}

      <div 
        style={{ visibility: loading ? 'hidden' : 'visible', width: deviceWidth() }} 
        id='heatmaps-page-wrapper'
      />

      {!loading && type === 'Scroll' && <ScrollIndicator />}
    </div>
  );
};
