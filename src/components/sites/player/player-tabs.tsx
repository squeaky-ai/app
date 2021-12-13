import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import { Icon } from 'components/icon';
import { Button } from 'components/button';
import { PlayerTab } from 'data/sites/enums';
import type { PlayerState, Action } from 'types/player';

interface Props {
  state: PlayerState;
  dispatch: React.Dispatch<Action>;
}

const tabs = [
  {
    key: 'info',
    icon: 'information-line',
    name: PlayerTab.INFO
  },
  {
    key: 'activity',
    icon: 'time-line',
    name: PlayerTab.ACTIVITY
  },
  {
    key: 'pages',
    icon: 'pages-line',
    name: PlayerTab.PAGES
  },
  {
    key: 'notes',
    icon: 'sticky-note-line',
    name: PlayerTab.NOTES
  },
  {
    key: 'tags',
    icon: 'price-tag-3-line',
    name: PlayerTab.TAGS
  },
];

export const PlayerTabs: FC<Props> = ({ state, dispatch }) => {
  const handleSetActive = (value: PlayerTab) => {
    const activeTab = value === state.activeTab ? null : value;
    dispatch({ type: 'activeTab', value: activeTab });
  };

  return (
    <>
      {tabs.map(tab => (
        <Button key={tab.key} className={classnames('control', { active: state.activeTab === tab.name })} onClick={() => handleSetActive(tab.name)}>
          <Icon name={tab.icon} />
        </Button>
      ))}
    </>
  );
};
