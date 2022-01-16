import React from 'react';
import type { FC } from 'react';
import { Replayer } from 'rrweb';
import { Spinner } from 'components/spinner';
import { ScrollIndicator } from 'components/sites/scroll-indicator';
import { useRecording } from 'hooks/use-heatmaps';
import { DeviceWidths, showClickMaps, showScrollMaps, iframeStyles } from 'lib/heatmaps';
import { HeatmapsDevice } from 'types/graphql';
import type { Event } from 'types/event';
import type { HeatmapsItem, HeatmapsType } from 'types/graphql';

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
  const [scale, setScale] = React.useState<number>(1);
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
    const offset = new Date(items[0].timestamp).valueOf();
    const timestamp = recording.pages.find(p => p.url === page)?.exitedAt;
    const location = new Date(timestamp).valueOf() - offset - 50;

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
    doc.querySelectorAll('.__squeaky_click_tag').forEach(d => d.remove());
    doc.querySelectorAll('.__squeaky_scroll_overlay').forEach(d => d.remove());
    doc.querySelectorAll('.__squeaky_outline').forEach(elem => elem.classList.remove('__squeaky_outline'));
    doc.querySelectorAll('#__squeaky_scrolling_percentage_marker').forEach(d => d.remove());
    doc.querySelectorAll('.__squeaky_fixed_percentage_marker').forEach(d => d.remove());
  };

  const deviceWidth = (() => {
    switch(device) {
      case 'Desktop':
        return `${DeviceWidths.DESKTOP}px`;
      case 'Tablet':
        return `${DeviceWidths.TABLET}px`;
      case 'Mobile':
        return `${DeviceWidths.MOBILE}px`;
      default:
        return '100%';
    }
  })();

  const inject = (doc: Document) => setTimeout(() => {
    cleanup(doc);

    doc.documentElement.scrollTo(0, 0);
    doc.body.style.cssText += 'pointer-events: none; user-select: none;';
    doc.head.innerHTML += iframeStyles;

    type === 'Click' 
      ? showClickMaps(doc, items)
      : showScrollMaps(doc, items, scale);

    // Now that stuff isn't going to jump the spinner can be removed
    setLoading(false);
  }, 250);

  const draw = () => {
    const doc = document.querySelector('iframe')?.contentDocument;
    if (doc) inject(doc);
  };

  const shrink = () => {
    if (device === HeatmapsDevice.Desktop) {
      const { width } = ref.current.getBoundingClientRect();
      const value = Math.min(width / DeviceWidths.DESKTOP, 1);
      setScale(value);
    } else {
      setScale(1);
    }
  };

  // Has JS gone too far?
  const wrapperStyles = ((): React.CSSProperties => ({
    height: scale === 1 ? '100%' : `${(1 / scale) * 100}%`,
    transform: `scale(${scale})`,
    visibility: loading ? 'hidden' : 'visible', 
    width: deviceWidth,
  }))();

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
    shrink();
  }, [recording?.id, page]);

  // Redraw the tags inside the iframe whenever the type or
  // items change 
  React.useEffect(() => {
    draw();
    shrink();
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
      <div style={wrapperStyles} id='heatmaps-page-wrapper' />
      {!loading && type === 'Scroll' && <ScrollIndicator />}
    </div>
  );
};
