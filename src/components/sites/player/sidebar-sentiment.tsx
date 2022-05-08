import React from 'react';
import type { FC } from 'react';
import { Emoji, EmojiType } from 'components/emoji';
import type { FeedbackSentimentResponseItem } from 'types/graphql';

interface Props {
  sentiment: FeedbackSentimentResponseItem;
}

export const SidebarSentiment: FC<Props> = ({ sentiment }) => (
  <div className='feedback sentiment'>
    <p className='heading'>
      Sentiment Rating: 
      <span className='emoji'>
        <Emoji height={16} width={16} emoji={`emoji-${sentiment.score + 1}` as EmojiType} />
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
