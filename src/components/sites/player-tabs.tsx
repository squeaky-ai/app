import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import { Button } from 'components/button';
import { PlayerTab } from 'data/sites/enums';

interface Props {
  active: PlayerTab;
  setActive: (active: PlayerTab) => void;
}

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
    icon: 'ri-time-line',
    name: PlayerTab.TAGS
  },
  {
    key: 'activity',
    icon: 'ri-information-line',
    name: PlayerTab.ACTIVITY
  },
  {
    key: 'pages',
    icon: 'ri-file-copy-line',
    name: PlayerTab.PAGES
  },
]

export const PlayerTabs: FC<Props> = ({ active, setActive }) => {
  const handleSetActive = (value: PlayerTab) => {
    setActive(value === active ? null : value);
  };

  return (
    <>
      {tabs.map(tab => (
        <Button key={tab.key} className={classnames('control', { active: active === tab.name })} onClick={() => handleSetActive(tab.name)}>
          <i className={tab.icon} />
        </Button>
      ))}
    </>
  );
};
