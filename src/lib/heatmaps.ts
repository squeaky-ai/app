import { range, groupBy } from 'lodash';
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

interface ClickMapData {
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

  const style = document.createElement('style');
  style.classList.add('__squeaky-click-map-style');
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
      border: 1px solid ${click.color.border};
      border-radius: 2px;
      box-sizing: border-box;
      box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.25);
      color: ${click.color.foreground};
      font-family: 'Poppins', sans-serif;
      font-size: 12px;
      font-weight: 600;
      left: ${left + width}px; 
      padding: .15rem;
      position: absolute;
      top: ${top}px;
      transform: translateX(-100%);
      z-index: 99999999;
    `;
    doc.body.appendChild(tag);
  });
};

export const showScrollMaps = (doc: Document, items: HeatmapsItem[]) => {
  const scrollMapData = getScrollMapData(items);

  const overlay = document.createElement('div');
  overlay.classList.add('__squeaky-scroll-overlay');
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

  const indicator = document.createElement('div');
  indicator.classList.add('__squeaky-scroll-indicator');
  indicator.style.cssText = `
    background: black;
    height: 2px;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
  `;

  doc.body.appendChild(overlay);
  doc.body.appendChild(indicator);
};
