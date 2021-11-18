import React from 'react';
import type { FC } from 'react';
import { Toggle } from 'components/toggle';

export const SentimentSettings: FC = () => {
  return (
    <div className='sentiment-settings'>
      <Toggle>
        Use Sentiment Survey
      </Toggle>
    </div>
  );
};
