import { range, groupBy } from 'lodash';
import { percentage } from 'lib/maths';
import { HeatmapColor, HEATMAP_COLOURS } from 'data/heatmaps/constants';
import type { HeatmapsItem } from 'types/heatmaps';

interface ScrollMapData {
  increment: number;
  pixelsScrolled: number;
  percentThatMadeIt: number;
  amountThatMadeIt: number;
}

interface ClickMapData {
  selector: string;
  color: HeatmapColor;
  count: number;
  percentage: number;
}

export const getScrollMapData = (items: HeatmapsItem[]): ScrollMapData[] => {
  const total = items.length;

  const max = items.length === 0 
    ? 0 
    : Math.max(...items.map(i => i.y));

  return range(1, 21).map(i => {
    const pixelsScrolled = Math.floor(((i * 5) / 100) * max);
    const amountThatMadeIt = items.filter(i => i.y >= pixelsScrolled).length;
    const percentThatMadeIt = percentage(total, amountThatMadeIt);

    return {
      increment: i * 5,
      pixelsScrolled,
      percentThatMadeIt,
      amountThatMadeIt,
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

export const showScrollMaps = (doc: Document) => {
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
