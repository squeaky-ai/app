import React from 'react';
import type { FC } from 'react';
import Image from 'next/image';
import { EMOJIS } from 'data/sentiment/constants';
import type { FeedbackSentimentResponseItem } from 'types/graphql';

interface Props {
  sentiment: FeedbackSentimentResponseItem;
}

export const SidebarSentiment: FC<Props> = ({ sentiment }) => {
  return (
    <div className='feedback sentiment'>
      <p className='heading'>
        Sentiment Rating: 
        <span className='emoji'>
          <Image height={16} width={16} src={EMOJIS[sentiment.score]} />
        </span>
      </p>
      <p>
        {sentiment.comment 
          ? <>&quot;{sentiment.comment}&quot;</>
          : '-'
        }
      </p>
    </div>
  );
};
