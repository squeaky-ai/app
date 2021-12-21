import React from 'react';
import type { FC } from 'react';
import type { FeedbackNpsResponseItem } from 'types/graphql';

interface Props {
  nps: FeedbackNpsResponseItem;
}

export const SidebarNps: FC<Props> = ({ nps }) => {
  const color = (() => {
    switch(nps.score) {
      case 7:
      case 8:
        return 'purple';
      case 9:
      case 10:
        return 'blue';
      default:
        return 'rose';
    }
  })();

  return (
    <div className='feedback nps'>
      <p className='heading'>NPS Score: <span className={color}>{nps.score}</span></p>
      <p>
        {nps.comment 
          ? <>&quot;{nps.comment}&quot;</>
          : '-'
        }  
      </p>
      {nps.contact ? <p className='email'>{nps.email}</p> : null}
    </div>
  );
};
