import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import { Button } from 'components/button';
import { usePlayerState } from 'hooks/player-state';
import { PlayerTab } from 'data/sites/enums';

const tabs = [
  {
    key: 'info',
    icon: 'ri-information-line',
    name: PlayerTab.INFO
  },
  {
    key: 'notes',
    icon: 'ri-sticky-note-line',
    name: PlayerTab.NOTES
  },
  {
    key: 'tags',
    icon: 'ri-price-tag-3-line',
    name: PlayerTab.TAGS
  },
  {
    key: 'activity',
    icon: 'ri-time-line',
    name: PlayerTab.ACTIVITY
  },
  {
    key: 'pages',
    icon: 'ri-file-copy-line',
    name: PlayerTab.PAGES
  },
]

export const PlayerTabs: FC = () => {
  const [state, dispatch] = usePlayerState();

  const handleSetActive = (value: PlayerTab) => {
    const activeTab = value === state.activeTab ? null : value;
    dispatch({ type: 'activeTab', value: activeTab });
  };

  return (
    <>
      {tabs.map(tab => (
        <Button key={tab.key} className={classnames('control', { active: state.activeTab === tab.name })} onClick={() => handleSetActive(tab.name)}>
          <i className={tab.icon} />
        </Button>
      ))}
    </>
  );
};
