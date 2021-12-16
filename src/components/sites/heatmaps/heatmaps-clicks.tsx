import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import { Icon } from 'components/icon';
import { Tooltip } from 'components/tooltip';
import { Pill } from 'components/pill';
import { Sort } from 'components/sort';
import { ClickMapData, getClickMapData } from 'lib/heatmaps';
import type { HeatmapsItem } from 'types/graphql';

interface Props {
  items: HeatmapsItem[];
  selected: string;
  setSelected: (selected: string) => void;
}

export const HeatmapsClicks: FC<Props> = ({ items, selected, setSelected }) => {
  const [order, setOrder] = React.useState('clicks__desc');

  const clicks = getClickMapData(items).sort((a, b) => order === 'clicks__asc'
    ? a.count - b.count
    : b.count - a.count
  );

  const getIframeDocument = (): Document => document
    .querySelector<HTMLIFrameElement>('#heatmaps-page-wrapper iframe')
    .contentDocument;

  const scrollToView = (click: ClickMapData) => {
    const doc = getIframeDocument();

    const element = doc.querySelector(click.selector);

    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      handleSelected(click);
    }
  };

  const handleSelected = (click: ClickMapData) => {
    const unselect = click.selector === selected;

    setSelected(unselect ? null : click.selector);

    setScale('.__squeaky_click_tag', 1);

    if (!unselect) setScale(`${click.selector} .__squeaky_click_tag`, 2);
  };

  const setScale = (selector: string, scale: number) => {
    const doc = getIframeDocument();
    const element = doc.querySelectorAll<HTMLElement>(selector);

    element.forEach(elem => elem.style.transform = `scale(${scale})`);
  };

  return (
    <div className='clicks-table'>
      {clicks.length === 0 && (
        <div className='empty'>
          <Icon name='time-line' />
          <p>No data available</p>
        </div>
      )}

      {clicks.length > 0 && (
        <>
          <div className='head row'>
            <p>Element</p>
            <p>
              Clicks
              <Sort
                name='clicks'
                order={order}
                onAsc={() => setOrder('clicks__asc')}
                onDesc={() => setOrder('clicks__desc')}
              />
            </p>
          </div>
            <ul>
              {clicks.map(click => (
                <li key={click.selector} className={classnames('row', { selected: click.selector === selected })} onClick={() => scrollToView(click)}>
                  <Tooltip button={click.selector} portalClassName='element-tooltip'>
                    {click.selector}
                  </Tooltip>
                  <p>
                    <Pill small style={{ backgroundColor: click.color.background, color: click.color.foreground, borderColor: click.color.border }} squared>
                      {click.count}
                    </Pill>
                    {click.percentage}%
                  </p>
                </li>
              ))}
            </ul>
          </>
        )}
    </div>
  );
};
