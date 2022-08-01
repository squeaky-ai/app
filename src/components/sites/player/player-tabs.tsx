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
    name: PlayerTab.INFO,
  },
  {
    key: 'events',
    icon: 'flashlight-line',
    name: PlayerTab.EVENTS,
  },
  {
    key: 'pages',
    icon: 'pages-line',
    name: PlayerTab.PAGES,
  },
  {
    key: 'notes',
    icon: 'sticky-note-line',
    name: PlayerTab.NOTES,
  },
  {
    key: 'tags',
    icon: 'price-tag-3-line',
    name: PlayerTab.TAGS,
  },
  {
    key: 'feedback',
    icon: 'user-voice-line',
    name: PlayerTab.FEEDBACK,
  },
];

export const PlayerTabs: FC<Props> = ({ state, dispatch }) => {
  const handleSetActive = (value: PlayerTab) => {
    dispatch({ type: 'activeTab', value });
  };

  return (
    <div className='player-tabs'>
      {tabs.map(tab => (
        <Button key={tab.key} className={classnames('control', { active: state.activeTab === tab.name })} onClick={() => handleSetActive(tab.name)}>
          <Icon name={tab.icon} />
        </Button>
      ))}
    </div>
  );
};
