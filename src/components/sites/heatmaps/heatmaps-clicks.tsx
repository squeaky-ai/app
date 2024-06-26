import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import { Icon } from 'components/icon';
import { Tooltip } from 'components/tooltip';
import { Pill } from 'components/pill';
import { Card } from 'components/card';
import { Sort } from 'components/sort';
import { getClickMapData, getElement, selectorIncludesClickable } from 'lib/heatmaps';
import type { HeatmapClickTarget, Heatmaps, HeatmapsClickCount, ClickMapData } from 'types/heatmaps';

interface Props {
  heatmaps: Heatmaps;
  selected: string;
  clickTarget: HeatmapClickTarget;
  setSelected: (selected: string) => void;
}

export const HeatmapsClicks: FC<Props> = ({ heatmaps, selected, clickTarget, setSelected }) => {
  const [order, setOrder] = React.useState('clicks__desc');

  const clicks = getClickMapData(heatmaps.items as HeatmapsClickCount[])
    // We need a selector
    .filter(c => c.selector)
    // If we're only showing anchors then we should try and
    // find one. You can't just check that the last element
    // is an anchor as it could include a span or img or
    // something
    .filter(c => clickTarget === 'all' ? true : selectorIncludesClickable(c.selector))
    .sort((a, b) => order === 'clicks__asc'
      ? a.count - b.count
      : b.count - a.count
    );

  const getIframeDocument = (): Document => document
    .querySelector<HTMLIFrameElement>('#heatmaps-page-wrapper iframe')
    .contentDocument;

  const scrollToView = (click: ClickMapData) => {
    const doc = getIframeDocument();

    const element = getElement(doc, click.selector);

    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      handleSelected(click);
    }
  };

  const handleSelected = (click: ClickMapData) => {
    const unselect = click.selector === selected;

    setSelected(unselect ? null : click.selector);
  };

  return (
    <Card className='data'>
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
    </Card>
  );
};
