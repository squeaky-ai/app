import React from 'react';
import type { FC } from 'react';
import { groupBy } from 'lodash';
import { Replayer } from 'rrweb';
import { Spinner } from 'components/spinner';
import type { Event } from 'types/event';
import { useRecording } from 'hooks/use-heatmaps';
import { percentage } from 'lib/maths';
import { HEATMAP_COLOURS } from 'data/heatmaps/constants';
import type { HeatmapsItem } from 'types/heatmaps';

interface Props {
  page: string;
  recordingId: string;
  items: HeatmapsItem[];
}

let replayer: Replayer;

export const HeatmapsPage: FC<Props> = ({ page, recordingId, items }) => {
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
      inject(iframe);
    }, 500);
  };

  const inject = (iframe: HTMLIFrameElement) => {
    const doc = iframe.contentDocument;
    const counts = groupBy(items, 'selector');

    const total = items.length;
    const count = (selector: string) => counts[selector]?.length || 0;

    doc.documentElement.scrollTo(0, 0);
    doc.body.style.cssText += 'pointer-events: none; user-select: none;';

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
      const clickCount = count(item.selector);

      const percent = percentage(total, clickCount);
      const colors = HEATMAP_COLOURS.find(c => c.percentage >= percent);

      const tag = document.createElement('div');
      tag.classList.add('__squeaky-click-tag');
      tag.innerHTML = clickCount.toString();
      tag.style.cssText = `
        background: ${colors.background};
        border-color: ${colors.border};
        color: ${colors.foreground};
        left: ${left + width}px; 
        top: ${top}px;
      `;
      doc.body.appendChild(tag);
    });

    // Now that stuff isn't going to jump the spinner can be removed
    setLoading(false);
  };

  React.useEffect(() => {
    init();
  }, [recording?.id]);

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
      <div style={{ visibility: loading ? 'hidden' : 'visible' }} id='heatmaps-page-wrapper' />
    </div>
  );
};
