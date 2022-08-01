import React from 'react';
import type { FC } from 'react';
import { SidebarNps } from 'components/sites/player/sidebar-nps';
import { SidebarSentiment } from 'components/sites/player/sidebar-sentiment';
import type { Recording } from 'types/graphql';

interface Props {
  recording: Recording;
}

export const SidebarFeedback: FC<Props> = ({ recording }) => (
  <div className='recordings'>
    {!recording.nps && !recording.sentiment && (
      <p>There was no feedback left during this session recording</p>
    )}
    {!!recording.nps && <SidebarNps nps={recording.nps} />}
    {!!recording.sentiment && <SidebarSentiment sentiment={recording.sentiment} />}
  </div>
);
