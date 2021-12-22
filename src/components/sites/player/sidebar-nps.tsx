import React from 'react';
import type { FC } from 'react';
import { npsColor } from 'lib/feedback';
import type { FeedbackNpsResponseItem } from 'types/graphql';

interface Props {
  nps: FeedbackNpsResponseItem;
}

export const SidebarNps: FC<Props> = ({ nps }) => (
  <div className='feedback nps'>
    <p className='heading'>NPS Score: <span className={npsColor(nps)}>{nps.score}</span></p>
    <p>
      {nps.comment 
        ? <>&quot;{nps.comment}&quot;</>
        : '-'
      }  
    </p>
    {nps.contact ? <p className='email'>{nps.email}</p> : null}
  </div>
);
