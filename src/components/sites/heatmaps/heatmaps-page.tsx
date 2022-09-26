import React from 'react';
import type { FC } from 'react';
import { Replayer } from 'rrweb';
import { Spinner } from 'components/spinner';
import { ScrollIndicator } from 'components/sites/scroll-indicator';
import { DeviceWidths } from 'data/common/constants';
import { showClickCountsMaps, showClickGradientMaps, showScrollMaps, showCursorMaps, iframeStyles, getElements } from 'lib/heatmaps';
import { parseRecordingEvents } from 'lib/events';
import { Heatmaps, HeatmapsClick, HeatmapsDevice, HeatmapsScroll, HeatmapsCursor } from 'types/graphql';
import type { HeatmapClickDisplay, HeatmapClickTarget } from 'types/heatmaps';
import type { HeatmapsType } from 'types/graphql';

interface Props {
  type: HeatmapsType;
  device: HeatmapsDevice;
  clickTarget: HeatmapClickTarget;
  clickDisplay: HeatmapClickDisplay;
  page: string;
  heatmaps: Heatmaps;
}

let replayer: Replayer;

export const HeatmapsPage: FC<Props> = ({
  type,
  device,
  page,
  clickTarget,
  clickDisplay,
  heatmaps,
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [scale, setScale] = React.useState<number>(1);
  const [loading, setLoading] = React.useState<boolean>(true);

  const events = parseRecordingEvents(heatmaps.recording.events.items);

  const init = () => {
    if (!heatmaps.recording) return;

    if (replayer) {
      destroy();
    }

    const root = document.getElementById('heatmaps-page-wrapper');

    if (events.length === 0) return;

    // Find where exactly this page is in the list, and try and find
    // a timestamp that is just before the user navigates away. This
    // should ensure that we have the complete page
    const timestamp = heatmaps.recording.pages.find(p => p.url === page)?.exitedAt;
    const location = new Date(timestamp).valueOf() - events[0].timestamp - 50;

    if (!timestamp) {
      return destroy();
    }

    replayer = new Replayer(events, {
      root,
      skipInactive: true,
      mouseTail: false,
      pauseAnimation: false,
      UNSAFE_replayCanvas: true, // We have to do this to allow heatmaps to work
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
    getElements(doc, '.__squeaky_click_tag').forEach(d => d.remove());
    getElements(doc, '.__squeaky_scroll_overlay').forEach(d => d.remove());
    getElements(doc, '.__squeaky_click_overlay').forEach(d => d.remove());
    getElements(doc, '.__squeaky_cursor_overlay').forEach(d => d.remove());
    getElements(doc, '.__squeaky_outline').forEach(elem => elem.classList.remove('__squeaky_outline'));
    getElements(doc, '#__squeaky_scrolling_percentage_marker').forEach(d => d.remove());
    getElements(doc, '.__squeaky_fixed_percentage_marker').forEach(d => d.remove());
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

    doc.documentElement.style.overflowY = 'auto';
    doc.documentElement.scrollTo(0, 0);
    doc.body.style.cssText += 'pointer-events: none; user-select: none;';
    doc.head.innerHTML += iframeStyles;

    if (type === 'Click' && clickDisplay === 'counts') showClickCountsMaps(doc, heatmaps.items as HeatmapsClick[], clickTarget);
    if (type === 'Click' && clickDisplay === 'gradient') showClickGradientMaps(doc, heatmaps.items as HeatmapsClick[]);
    if (type === 'Scroll') showScrollMaps(doc, heatmaps.items as HeatmapsScroll[], scale);
    if (type === 'Cursor') showCursorMaps(doc, heatmaps.items as HeatmapsCursor[]);

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
  }, [heatmaps.recording?.id, page]);

  // Redraw the tags inside the iframe whenever the type,
  // display or items change 
  React.useEffect(() => {
    draw();
    shrink();
  }, [type, heatmaps.counts, heatmaps.items, clickTarget, clickDisplay]);

  React.useEffect(() => {
    return () => {
      replayer = null;
    };
  }, []);

  return (
    <div ref={ref} className='heatmaps-page'>
      {loading && <Spinner />}
      <div style={wrapperStyles} id='heatmaps-page-wrapper' />
      {!loading && type === 'Scroll' && <ScrollIndicator />}
    </div>
  );
};
