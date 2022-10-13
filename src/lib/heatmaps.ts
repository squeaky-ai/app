import heatmap from 'vendor/heatmap';
import { range, orderBy, findLast, sumBy, countBy } from 'lodash';
import { percentage } from 'lib/maths';
import { HeatmapColor, HEATMAP_COLOURS } from 'data/heatmaps/constants';
import type { Heatmap } from 'vendor/heatmap';
import type { HeatmapClickTarget } from 'types/heatmaps';
import type { HeatmapsScroll, HeatmapsClickCount, HeatmapsClickPosition, HeatmapsCursor } from 'types/heatmaps';

interface ScrollMapData {
  increment: number;
  pixelsScrolled: number;
  percentThatMadeIt: number;
  amountThatMadeIt: number;
  color: HeatmapColor;
}

export interface ClickMapData {
  selector: string;
  color: HeatmapColor;
  count: number;
  percentage: number;
}

const createHeatmapsInstance = (container: HTMLElement): Heatmap<string, 'x', 'y'> => heatmap.create({
  container,
  gradient: {
    0.25: '#0046DC',
    0.55: "yellow",
    0.85: '#FFA800',
    1.00: "red",
  },
});

export const getElement = (doc: Document, selector: string) => {
  try {
    return doc.querySelector<HTMLElement>(selector);
  } catch {
    return null;
  }
};

export const getElements = (doc: Document, selector: string) => {
  try {
    return doc.querySelectorAll<HTMLElement>(selector);
  } catch {
    return null;
  }
};

export const selectorIncludesClickable = (selector: string) => {
  // Should match
  // a              button
  // a#foo          button#foo
  // a:nth-of-type  button:nth-of-type
  return !!selector.split(' > ').find(s => /^(a|button)($|:|#)/.test(s));
};

export const getScrollMapData = (items: HeatmapsScroll[]): ScrollMapData[] => {
  const total = items.length;

  const max = Math.max(...items.map(i => i.y));

  const getColor = (count: number) => {
    const percent = percentage(total, count);
    const potentials = HEATMAP_COLOURS.filter(c => percent >= c.percentage);
    return potentials[potentials.length - 1];
  };

  return range(0, 21).map(i => {
    const pixelsScrolled = Math.floor(((i * 5) / 100) * max);
    const amountThatMadeIt = items.filter(i => i.y >= pixelsScrolled).length;
    const percentThatMadeIt = percentage(total, amountThatMadeIt);

    const color = getColor(amountThatMadeIt);

    return {
      increment: i * 5,
      pixelsScrolled,
      percentThatMadeIt,
      amountThatMadeIt,
      color,
    };
  });
};

export const getClickMapData = (items: HeatmapsClickCount[]): ClickMapData[] => {
  const total = sumBy(items, 'count');

  const max = Math.max(...items.map(i => i.count));
  const clicks = orderBy(items, 'count', 'desc');

  const getColor = (count: number) => {
    const percent = percentage(max, count);
    const potentials = HEATMAP_COLOURS.filter(c => percent >= c.percentage);
    return potentials[potentials.length - 1];
  };

  return clicks.map(({ selector, count }) => {
    const color = getColor(count);

    return {
      selector,
      color,
      count,
      percentage: percentage(total, count),
    }
  });
};

export const showClickCountsMaps = (doc: Document, items: HeatmapsClickCount[], clickTarget: HeatmapClickTarget) => {
  const clickMapData = getClickMapData(items);

  items.forEach(item => {
    let elem = getElement(doc, item.selector);

    if (!elem) return;
    if (clickTarget === 'anchors' && !selectorIncludesClickable(item.selector)) return;

    // These things don't have a innerHTML so the next
    // best thing is to use the parent, even if it's
    // not that accurate
    if (['input', 'select', 'img', 'svg'].includes(elem.tagName.toLowerCase())) {
      elem = elem.parentElement;
    }

    const currentElementPosition = getComputedStyle(elem).position;

    // Add a an outline to the clicked element and set 
    // it's position to relative if it isn't absolute 
    // or fixed
    elem.style.cssText += `position: ${['absolute', 'fixed'].includes(currentElementPosition) ? currentElementPosition : 'relative'};`;
    elem.classList.add('__squeaky_outline');

    const click = clickMapData.find(c => c.selector === item.selector);

    // Create an insert a tag into the clicked
    // element that displays the click count
    const tag = document.createElement('div');

    tag.className = '__squeaky_click_tag';
    tag.innerText = click.count.toString();

    tag.style.cssText = `
      align-items: center;
      background: ${click.color.background};
      border: 1px solid #001A39;
      border-radius: 2px;
      box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.25);
      box-sizing: border-box;
      color: ${click.color.foreground};
      display: flex;
      font-size: 12px !important;
      font-weight: 600;
      flex-shrink: 0;
      height: 1rem;
      justify-content: center;
      padding: .15rem;
      position: absolute;
      right: 0;
      top: 0;
      transform-origin: center center;
    `;

    tag.style.zIndex = `${1000000 + click.count}`;

    elem.appendChild(tag);
  });
};

export const showScrollMaps = (doc: Document, items: HeatmapsScroll[], scale: number) => {
  const scrollMapData = getScrollMapData(items);
  const unscale = 1 / scale;

  const overlay = document.createElement('div');
  overlay.classList.add('__squeaky_scroll_overlay');
  overlay.style.cssText = `
    background: linear-gradient(180deg, ${scrollMapData.map(s => `${s.color.background} ${s.increment}%`).join(', ')});
    height: ${doc.body.scrollHeight}px;
    left: 0;
    opacity: .7;
    position: absolute;
    top: 0;
    width: 100%;
    z-index: 99999999;
  `;

  doc.body.appendChild(overlay);

  createScrollingScrollMarker(doc, scrollMapData, unscale);
  createFixedScrollMarker(doc, scrollMapData, 25, unscale);
  createFixedScrollMarker(doc, scrollMapData, 50, unscale);
  createFixedScrollMarker(doc, scrollMapData, 75, unscale);
};

export const showCursorMaps = (doc: Document, items: HeatmapsCursor[]) => {
  if (items.length === 0) return;

  const overlay = document.createElement('div');
  overlay.classList.add('__squeaky_cursor_overlay');
  overlay.style.cssText = `
    background: rgba(0, 70, 220, .15);
    height: ${doc.body.scrollHeight}px;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
    z-index: 99999999;
  `;

  const heatmapContainer = document.createElement('div');
  heatmapContainer.style.cssText = `
    height: 100%;
    width: 100%;
  `;
  overlay.appendChild(heatmapContainer);
  doc.body.appendChild(overlay);

  const map = createHeatmapsInstance(heatmapContainer);
  const max = Math.max(...items.map(i => i.count));

  map.setData({
    min: 0,
    max,
    data: items.map(i => ({ x: i.x, y: i.y, value: i.count })),
  });
};

export const showClickGradientMaps = (doc: Document, items: HeatmapsClickPosition[]) => {  
  const data = items
    .map(item => {
      const elem = getElement(doc, item.selector);

      if (!elem) return null;

      const { left, top } = elem.getBoundingClientRect();

      return {
        x: left + item.relative_to_element_x,
        y: top + item.relative_to_element_y,
        value: 1,
      };
    })
    .filter(d => !!d);

  if (data.length === 0) return;

  const overlay = document.createElement('div');
  overlay.classList.add('__squeaky_click_overlay');
  overlay.style.cssText = `
    background: rgba(0, 70, 220, .15);
    height: ${doc.body.scrollHeight}px;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
    z-index: 99999999;
  `;

  const heatmapContainer = document.createElement('div');
  heatmapContainer.style.cssText = `
    height: 100%;
    width: 100%;
  `;

  overlay.appendChild(heatmapContainer);
  doc.body.appendChild(overlay);

  // Group by the selector, as that should allow us to have
  // some idea of a local area of clicks
  const map = createHeatmapsInstance(heatmapContainer);
  const max = Math.max(...Object.values((countBy(data, data => `${data.x}-${data.y}`))));

  map.setData({ min: 0, max, data });
};

const createFixedScrollMarker = (doc: Document, scrollMapData: ScrollMapData[], percentage: number, scale: number) => {
  const scroll = findLast(scrollMapData, s => s.percentThatMadeIt >= percentage);

  if (!scroll) return;

  const marker = doc.createElement('div');
  marker.classList.add('__squeaky_fixed_percentage_marker');
  marker.style.top = `${scroll.pixelsScrolled}px`;
  marker.style.transform = `scale(${scale})`;

  const text = doc.createElement('p');
  text.innerText = `${percentage}%`;

  marker.appendChild(text);

  doc.body.appendChild(marker);
};

const createScrollingScrollMarker = (doc: Document, scrollMapData: ScrollMapData[], scale: number) => {
  const percentageMarker = doc.createElement('div');
  percentageMarker.id = '__squeaky_scrolling_percentage_marker';
  percentageMarker.style.transform = `scale(${scale})`;

  const percentangeText = doc.createElement('p');

  const percentageAmount = doc.createElement('b');
  percentageAmount.innerText = '0.00%';

  percentangeText.appendChild(percentageAmount);
  percentangeText.innerHTML += 'of visitors reached this point';

  percentageMarker.appendChild(percentangeText);

  doc.addEventListener('mousemove', onIframeScroll(doc, scrollMapData));

  doc.body.appendChild(percentageMarker);
};

const onIframeScroll = (doc: Document, data: ScrollMapData[]) => (event: MouseEvent) => {
  const marker = doc.getElementById('__squeaky_scrolling_percentage_marker');
  if (!marker) return;

  marker.style.top = `${event.clientY - 20}px`;

  const position = event.clientY + doc.scrollingElement.scrollTop;
  const match = findLast(data, s => position >= s.pixelsScrolled);

  const text = marker.querySelector<HTMLElement>('p b');
  if (text) text.innerText = `${match?.percentThatMadeIt || 0}%`;
};

export const iframeStyles = `
  <style>
    .squeaky-hide { 
      visibility: hidden;
    }

    .__squeaky_outline {  
      outline: 1px dashed #8249FB !important; 
      outline-offset: 2px !important;
    }

    #__squeaky_scrolling_percentage_marker {
      align-items: center;
      display: flex;
      justify-content: center;
      left: 0;
      position: fixed;
      top: 0;
      width: 100%;
      z-index: 99999999;
    }

    #__squeaky_scrolling_percentage_marker p {
      background: #001125;
      border-radius: .5rem;
      color: white;
      display: inline-block;
      font-size: 13px;
      font-family: Helvetica, sans-serif;
      line-height: 20px;
      margin: 0;
      padding: .5rem 1rem;
      z-index: 1;
    }

    #__squeaky_scrolling_percentage_marker b {
      margin-right: .25rem;
    }

    #__squeaky_scrolling_percentage_marker::after {
      border: 2px dashed #001A39;
      content: ' ';
      display: block;
      position: absolute;
      width: 100%;
    }

    .__squeaky_fixed_percentage_marker {
      align-items: center;
      display: flex;
      justify-content: flex-start;
      left: 0;
      position: absolute;
      top: 0;
      transform-origin: left top;
      width: 100%;
      z-index: 99999999;
    }

    .__squeaky_fixed_percentage_marker p {
      background: #001125;
      border-radius: .5rem;
      color: white;
      display: inline-block;
      font-size: 13px;
      font-family: Helvetica, sans-serif;
      font-weight: 600;
      line-height: 20px;
      margin: 0 0 0 1.5rem;
      padding: .5rem 1rem;
      z-index: 1;
    }

    .__squeaky_fixed_percentage_marker::after {
      border: 2px dashed #001A39;
      content: ' ';
      display: block;
      position: absolute;
      width: 100%;
    }
  </style>
`;
