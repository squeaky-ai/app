import { range, groupBy, debounce, findLast } from 'lodash';
import { percentage } from 'lib/maths';
import { HeatmapColor, HEATMAP_COLOURS } from 'data/heatmaps/constants';
import type { HeatmapsItem } from 'types/graphql';

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

export const getScrollMapData = (items: HeatmapsItem[]): ScrollMapData[] => {
  const total = items.length;

  const max = Math.max(...items.map(i => i.y));

  const getColor = (count: number) => {
    const percent = percentage(total, count);
    const potentials = HEATMAP_COLOURS.filter(c => percent >= c.percentage);
    return potentials[potentials.length - 1];
  };

  return range(1, 21).map(i => {
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

export const getClickMapData = (items: HeatmapsItem[]): ClickMapData[] => {
  const results = groupBy(items, 'selector');

  const total = items.length;

  const max = Math.max(...Object.values(results).map(r => r.length));
  const clicks = Object.entries(results).sort((a, b) => b[1].length - a[1].length);

  const getColor = (count: number) => {
    const percent = percentage(max, count);
    const potentials = HEATMAP_COLOURS.filter(c => percent >= c.percentage);
    return potentials[potentials.length - 1];
  };

  return clicks.map(([selector, coords]) => {
    const color = getColor(coords.length);

    return {
      selector,
      color,
      count: coords.length,
      percentage: percentage(total, coords.length),
    }
  });
};

export const showClickMaps = (doc: Document, items: HeatmapsItem[]) => {
  const clickMapData = getClickMapData(items);

  items.forEach(item => {
    let elem = doc.querySelector<HTMLElement>(item.selector);

    if (!elem || ['html', 'html > body'].includes(item.selector)) return;

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
      z-index: 9999999;
    `;

    elem.appendChild(tag);
  });
};

export const showScrollMaps = (doc: Document, items: HeatmapsItem[]) => {
  const scrollMapData = getScrollMapData(items);

  const overlay = document.createElement('div');
  overlay.classList.add('__squeaky_scroll_overlay');
  overlay.style.cssText = `
    background: linear-gradient(180deg, ${scrollMapData.map(s => `${s.color.background} ${s.increment}%`).join(', ')});
    height: ${doc.body.scrollHeight}px;
    left: 0;
    mix-blend-mode: multiply;
    position: absolute;
    top: 0;
    width: 100%;
    z-index: 99999999;
  `;

  doc.body.appendChild(overlay);

  const percentageMarker = document.createElement('div');
  percentageMarker.classList.add('__squeaky_percentage_marker');

  const percentangeText = document.createElement('p');

  const percentageAmount = document.createElement('b');
  percentageAmount.innerText = '0.00%';

  percentangeText.appendChild(percentageAmount);
  percentangeText.innerHTML += 'Percentage of visitors who reached this';

  percentageMarker.appendChild(percentangeText);

  doc.addEventListener('mousemove', onIframeScroll(doc, scrollMapData));

  doc.body.appendChild(percentageMarker);
};

const onIframeScroll = (doc: Document, data: ScrollMapData[]) => debounce((event: MouseEvent) => {
  const marker = doc.querySelector<HTMLDivElement>('.__squeaky_percentage_marker');
  if (!marker) return;

  marker.style.top = `${event.clientY - 20}px`;

  const position = event.clientY + doc.scrollingElement.scrollTop;
  const match = findLast(data, s => position >= s.pixelsScrolled);

  const text = marker.querySelector<HTMLElement>('p b');
  if (text) text.innerText = `${match?.percentThatMadeIt || 0}%`;
}, 15);

export const iframeStyles = `
  <style>
    .squeaky-hide { 
      visibility: hidden; 
    }

    .__squeaky_outline {  
      outline: 1px dashed #8249FB !important; 
      outline-offset: 2px !important;
    }

    .__squeaky_percentage_marker {
      align-items: center;
      display: flex;
      justify-content: center;
      left: 0;
      position: fixed;
      top: 0;
      width: 100%;
      z-index: 99999999;
    }

    .__squeaky_percentage_marker p {
      background: #001125;
      border-radius: .5rem;
      color: white;
      display: inline-block;
      font-size: 13px;
      font-family: Helvetica, sans-serif;
      line-height: 16px;
      margin: 0;
      padding: .5rem 1rem;
      z-index: 1;
    }

    .__squeaky_percentage_marker b {
      margin-right: .5rem;
    }

    .__squeaky_percentage_marker::after {
      border: 2px dashed #001A39;
      content: ' ';
      display: block;
      position: absolute;
      width: 100%;
    }
  </style>
`;
