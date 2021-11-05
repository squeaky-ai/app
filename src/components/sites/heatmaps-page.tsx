import React from 'react';
import type { FC } from 'react';
import { Replayer } from 'rrweb';
import { Spinner } from 'components/spinner';
import { ScrollIndicator } from 'components/sites/scroll-indicator';
import { useRecording } from 'hooks/use-heatmaps';
import type { Event } from 'types/event';
import type { HeatmapsItem } from 'types/heatmaps';
import { getClickMapData } from 'lib/heatmaps';

interface Props {
  type: 'Click' | 'Scroll';
  device: 'Desktop' | 'Mobile';
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
    if (replayer || !recording) return;

    const items: Event[] = recording.events.items.map(e => JSON.parse(e));
    const root = document.getElementById('heatmaps-page-wrapper');

    if (items.length === 0) return;

    replayer = new Replayer(items, {
      root,
      skipInactive: true,
      mouseTail: false,
    });

    // Find where exactly this page is in the list, and try and find
    // a timestamp that is just before the user navigates away. This
    // should ensure that we have the complete page
    const offset = items[0].timestamp;
    const timestamp = recording.pages.find(p => p.url === page)?.exitedAt;
    const location = Number(timestamp) - offset - 50;

    // They need to be able to scroll
    const iframe = root.querySelector('iframe');
    iframe.setAttribute('scrolling', 'true');

    // Pause at the location where we think the page is
    replayer.pause(location);

    setTimeout(() => {
      // Inject all the crap into the iframe
      inject(iframe.contentDocument);
    }, 500);
  };

  const cleanup = (doc: Document) => {
    const elems = doc.querySelectorAll('.__squeaky-click-tag, .__squeaky_scroll_overlay');
    elems.forEach(elem => elem.remove());
  };

  const inject = (doc: Document) => {
    doc.documentElement.scrollTo(0, 0);
    doc.body.style.cssText += 'pointer-events: none; user-select: none;';

    type === 'Click' 
      ? showClickMaps(doc)
      : showScrollMaps(doc);

    // Now that stuff isn't going to jump the spinner can be removed
    setLoading(false);
  };

  const showClickMaps = (doc: Document) => {
    const clickMapData = getClickMapData(items);

    const style = document.createElement('style');
    style.innerHTML = `
      .__squeaky-click-tag {
        background: white;
        border: 1px solid #BFBFBF;
        border-radius: 2px;
        box-sizing: border-box;
        box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.25);
        font-family: 'Poppins', sans-serif;
        font-size: 12px;
        font-weight: 600;
        padding: .15rem;
        position: absolute;
        transform: translateX(-100%);
        z-index: 99999999;
      }
    `;
    doc.head.appendChild(style);

    items.forEach(item => {
      const elem = doc.querySelector<HTMLElement>(item.selector);

      if (!elem || ['html', 'html > body'].includes(item.selector)) return;

      elem.style.cssText += 'outline: 1px dashed #707070; outline-offset: 2px;';

      const { left, width, top } = elem.getBoundingClientRect();

      const click = clickMapData.find(c => c.selector === item.selector);

      const tag = document.createElement('div');
      tag.classList.add('__squeaky-click-tag');
      tag.innerHTML = click.count.toString();
      tag.style.cssText = `
        background: ${click.color.background};
        border-color: ${click.color.border};
        color: ${click.color.foreground};
        left: ${left + width}px; 
        top: ${top}px;
      `;
      doc.body.appendChild(tag);
    });
  };

  const showScrollMaps = (doc: Document) => {
    const style = document.createElement('style');
    style.innerHTML = `
      .__squeaky_scroll_overlay {
        background: linear-gradient(180deg, #8249FB 4.17%, #F0438C 27.6%, #FF8A00 50.52%, #FDE50B 72.4%, #FFFFFF 94.79%);
        left: 0;
        mix-blend-mode: multiply;
        position: absolute;
        top: 0;
        width: 100%;
        z-index: 99999999;
      }
    `;
    doc.head.appendChild(style);

    const overlay = document.createElement('div');
    overlay.classList.add('__squeaky_scroll_overlay');
    overlay.style.height = `${doc.body.scrollHeight}px`;
    doc.body.appendChild(overlay);
  };

  React.useEffect(() => {
    init();
  }, [recording?.id]);

  React.useEffect(() => {
    const doc = document.querySelector('iframe')?.contentDocument;

    if (doc) {
      cleanup(doc);
      inject(doc);
    }
  }, [type, device]);

  React.useEffect(() => {
    return () => {
      replayer = null;
    };
  }, []);

  if (error) {
    return <p>There was an error</p>;
  }

  return (
    <div ref={ref} className='heatmaps-page' >
      {loading && <Spinner />}

      <div 
        style={{ visibility: loading ? 'hidden' : 'visible', width: device === 'Desktop' ? '100%' : '360px' }} 
        id='heatmaps-page-wrapper' 
      />

      {!loading && type === 'Scroll' && <ScrollIndicator />}
    </div>
  );
};
