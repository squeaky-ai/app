import React from 'react';
import type { FC } from 'react';
import { Card } from 'components/card';
import { NoData } from 'components/sites/feedback/no-data';
import { NoResponses } from 'components/sites/feedback/no-responses';

export const Sentiment: FC = () => {
  return (
    <div className='sentiment-grid'>
       <h4 className='heading-overview'>
        Overview
      </h4>

      <Card className='card-rating'>
        <h4>Sentiment Rating</h4>
        <NoData />
      </Card>

      <Card className='card-response'>
        <h4>Responses</h4>
        <NoData />
      </Card>

      <h4 className='heading-responses'>
        Responses
      </h4>

      <Card className='card-responses'>
        <NoResponses />
      </Card>
    </div>
  );
};
